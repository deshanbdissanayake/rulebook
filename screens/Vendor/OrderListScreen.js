import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { colors } from '../../assets/colors/colors'
import Header from '../../components/general/Header'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { getOrdersByUserId } from '../../assets/data/orders'
import LoadingScreen from '../LoadingScreen'
import NoData from '../../components/general/NoData'
import VendorOrderCard from '../../components/app/VendorOrderCard'
import { bottomSheetContainer, bottomSheetContentWrapper, bottomSheetTitleTextStyles, container, flex1, flexRow, marginBottom10, marginBottom5, marginHorizontal2, marginLeft2, paddingBottom5, textLight12, textRegular14 } from '../../assets/commonStyles'
import { Ionicons } from '@expo/vector-icons'
import MiniButton from '../../components/general/MiniButton'
import BottomSheet from '@gorhom/bottom-sheet';
import Select from '../../components/general/Select'
import Button from '../../components/general/Button'

const OrderListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const params = route.params;

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [1, '55%', '75%'], []);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalOrders, setOriginalOrders] = useState([]);
  const [orders, setOrders] = useState([]);

  const [filters, setFilters] = useState({
    ord_stts: ['all'],
    pay_stts: ['all'],
    dates: ['all'],
  });

  const getOrders = async () => {
    try {
      let res = await getOrdersByUserId();
      setOriginalOrders(res);
    } catch (error) {
      console.error('error at OrderListScreen.js -> getOrders: ', error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getOrders();

      if(params){
        setFilters({
          ord_stts: params.ord_stts,
          pay_stts: params.pay_stts,
          dates: params.dates,
        })
      }
    }, [params])
  );
  
  useEffect(() => {
    filterOrdersFunc();
  }, [originalOrders, filters]);

  const filterOrdersFunc = async () => {
    setLoading(true);
    try {
      let ordersData = originalOrders;
  
      // Filter by order status
      ordersData = ordersData.filter((ord) =>
        filters.ord_stts.some((ord_stt) => ord_stt === 'all' || ord_stt === ord.ord_status)
      );
  
      // Filter by payment status
      ordersData = ordersData.filter((ord) =>
        filters.pay_stts.some((pay_stt) => pay_stt === 'all' || pay_stt === ord.pay_status)
      );
  
      const today = new Date().toISOString().split('T')[0];
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Monday as the start of the week
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
  
      // Filter by date
      ordersData = ordersData.filter((ord) => {
        const ordDate = new Date(ord.ord_date);
        return filters.dates.some((date) => {
          if (date === 'all') {
            return true;
          } else if (date === 'today') {
            return ord.ord_date === today;
          } else if (date === 'this_week') {
            return ordDate >= startOfWeek;
          } else if (date === 'this_month') {
            return ordDate >= startOfMonth;
          } else {
            return true;
          }
        });
      });
  
      setOrders(ordersData);
    } catch (error) {
      console.error('Error at OrderListScreen.js -> filterOrders', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  
  const onRefresh = () => {
    setRefreshing(true);
    getOrders();
  }

  const handleOrderClick = (ord_id) => {
    navigation.navigate('Order Single Screen', { ord_id })
  }

  const handleFilterClick = () => {
    bottomSheetRef.current.snapToIndex(1);
    bottomSheetRef.current.collapse();
  }

  const handleResetFilters = () => {
    setFilters({
      ord_stts: ['all'],
      pay_stts: ['all'],
      dates: ['all'],
    })
  }

  const handleFilter = () => {
    bottomSheetRef.current.collapse();
  }


  if(loading){
    return <LoadingScreen/>
  }

  return (
    <View style={[container]}>
      <Header
        text={'My Orders'}
        component={
          <MiniButton
            bgColor={colors.bgColorTer}
            content={<Ionicons name="filter" size={24} color={colors.textColorPri} />}
            func={handleFilterClick}
          />
        }
      />
      <View style={flex1}>
        {orders && orders.length > 0 ? (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.ord_id.toString()}
            renderItem={({item}) => <VendorOrderCard cardData={item} handleOrderClick={handleOrderClick} />}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh} 
              />
            }
          />
        ) : (
          <ScrollView 
            contentContainerStyle={styles.noDataWrapper} 
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh} 
              />
            }
          >
            <NoData text={'No Orders Yet!'} />
          </ScrollView>
        )}
      </View>
      <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: colors.bgColorSec }}
          handleIndicatorStyle={{ backgroundColor: colors.textColorSec }}
        >
            <ScrollView contentContainerStyle={bottomSheetContainer}>
                <Text style={bottomSheetTitleTextStyles}>Filters</Text>
                <View style={bottomSheetContentWrapper}>
                  <View style={marginBottom10}>
                    <Text style={[textLight12, marginLeft2, marginBottom5]}>Select Order Status</Text>
                    <Select
                      value={filters.ord_stts[0]}
                      onSelect={(text)=> setFilters(prevData => ({...prevData, ord_stts:[text]}))}
                      options={[
                        {label: 'All', value: 'all'},
                        {label: 'Pending', value: 'pending'},
                        {label: 'Processing', value: 'processing'},
                        {label: 'Delivering', value: 'delivering'}
                      ]}
                      placeholder={'Select Order Status'}
                    />
                  </View>
                  <View style={marginBottom10}>
                    <Text style={[textLight12, marginLeft2, marginBottom5]}>Select Payment Status</Text>
                    <Select
                      value={filters.pay_stts[0]}
                      onSelect={(text)=> setFilters(prevData => ({...prevData, pay_stts:[text]}))}
                      options={[
                        {label: 'All', value: 'all'},
                        {label: 'Pending', value: 'pending'},
                        {label: 'Completed', value: 'completed'}
                      ]}
                      placeholder={'Select Payment Status'}
                    />
                  </View>
                  <View style={marginBottom10}>
                    <Text style={[textLight12, marginLeft2, marginBottom5]}>Select Date Filter</Text>
                    <Select
                      value={filters.dates[0]}
                      onSelect={(text)=> setFilters(prevData => ({...prevData, dates:[text]}))}
                      options={[
                        {label: 'All', value: 'all'},
                        {label: 'Today', value: 'today'},
                        {label: 'This Week', value: 'this_week'},
                        {label: 'This Month', value: 'this_month'}
                      ]}
                      placeholder={'Select Date Filter'}
                    />
                  </View>
                  <View style={flexRow}>
                      <View style={[marginHorizontal2, {flex: 1}]}>
                        <Button
                          bgColor={colors.bgColor}
                          bdr={colors.textColorPri}
                          content={<Text style={[textRegular14, {color: colors.textColorPri}]}>Reset</Text>}
                          func={handleResetFilters}
                        />
                      </View>
                      <View style={[marginHorizontal2, {flex: 1}]}>
                        <Button
                          bgColor={colors.bgColorSec}
                          bdr={colors.textColorSec}
                          content={<Text style={[textRegular14, {color: colors.textColorSec}]}>Filter</Text>}
                          func={handleFilter}
                        />
                      </View>
                  </View>
                </View>
            </ScrollView>
        </BottomSheet>
    </View>
  )
}

export default OrderListScreen

const styles = StyleSheet.create({
  noDataWrapper: {
    flexGrow: 1,
  },
})