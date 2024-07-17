import { Image, ScrollView, StyleSheet, Text, View, Linking, Alert } from 'react-native'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { colors } from '../../assets/colors/colors'
import Header from '../../components/general/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { confirmDelivery, confirmOrder, confirmPayment, getOrderByOrderId } from '../../assets/data/orders'
import LoadingScreen from '../LoadingScreen'
import BottomSheet from '@gorhom/bottom-sheet';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import MiniButton from '../../components/general/MiniButton'
import Button from '../../components/general/Button'
import { bottomSheetContainer, bottomSheetTitleTextStyles, container, flex1, flex2, flex3, marginBottom5, marginTop10, marginTop5, marginVertical10, textAlignLeft, textAlignRight, textLight10, textLight12, textRegular12, textRegular14, textSemiBold10 } from '../../assets/commonStyles'

const OrderSingleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { ord_id } = route.params;

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [1, '40%', '75%'], []);

  const handleGoBack = () => {
    navigation.goBack();
  }

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);

  const [btnStt, setBtnStt] = useState({
    orderBtn: false,
    paymentBtn: false,
    deliveryBtn: false
  });

  const buttonData = [
    { label: 'Confirm Order', key: 'order', loading: btnStt.orderBtn },
    { label: 'Confirm Payment', key: 'payment', loading: btnStt.paymentBtn },
    { label: 'Confirm Delivery', key: 'delivery', loading: btnStt.deliveryBtn }
  ];

  const getOrder = async () => {
    try {
      let res = await getOrderByOrderId(ord_id);
      setOrder(res)
    } catch (error) {
      console.error('error at OrderSingleScreen.js -> getOrder: ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    getOrder();
  },[])

  const handleOrderHistoryClick = () => {
    bottomSheetRef.current.snapToIndex(1);
    bottomSheetRef.current.collapse();
  }

  const handleCallClick = () => {
    Linking.openURL(`tel:${order.ord_shipping.contact}`);
  }

  const handleConfirmClick = (type) => {
    const confirmMessages = {
      order: 'Are you sure to confirm order?',
      payment: 'Are you sure to confirm payment?',
      delivery: 'Are you sure to confirm delivery?',
    };
  
    const confirmFunctions = {
      order: () => confirmFunc('order', confirmOrder),
      payment: () => confirmFunc('payment', confirmPayment),
      delivery: () => confirmFunc('delivery', confirmDelivery),
    };
  
    Alert.alert('Confirm', confirmMessages[type], [
      { text: 'Cancel', onPress: () => null, style: 'cancel' },
      { text: 'OK', onPress: confirmFunctions[type] },
    ]);
  };
  
  const confirmFunc = async (type, confirmAction) => {
    setBtnStt((prevData) => ({ ...prevData, [`${type}Btn`]: true }));
    try {
      let res = await confirmAction(ord_id);
      Alert.alert(res.stt === 'success' ? 'Success' : 'Error', res.msg);
    } catch (error) {
      console.error(`error at OrderSingleScreen.js => ${type}ConfirmFunc: `, error);
    } finally {
      setBtnStt((prevData) => ({ ...prevData, [`${type}Btn`]: false }));
    }
  };
  
  if(loading){
    return <LoadingScreen/>
  }

  return (
    <View style={container}>
      <Header
        text={`Order #${order.ord_num}`}
        handleGoBack={handleGoBack}
        component={
            <MiniButton
                content={<AntDesign name="infocirlce" size={24} color={colors.textColorPri} />}
                func={handleOrderHistoryClick}
            />
        }
      />
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.proDataCardWrapper}>
            <View style={[{flex: 2}]}></View>
            <View style={[{flex: 3}]}></View>
            <Text style={[flex2, textAlignRight, textSemiBold10]}>Unit Price</Text>
            <Text style={[flex1, textAlignRight, textSemiBold10]}>Qty</Text>
            <Text style={[flex2, textAlignRight, textSemiBold10]}>Total</Text>
          </View>
          {order.ord_items && order.ord_items.map((ord_item, i) => (
            <View style={styles.proDataCardWrapper} key={i}>
              <View style={[flex2]}>
                <Image style={styles.proImageStyles} source={{uri : ord_item.pro_image}} />
              </View>
              <View style={[flex3]}>
                <Text style={textRegular14}>{ord_item.pro_name}</Text>
                <Text style={textLight10}>( SKU - {ord_item.pro_sku} )</Text>
              </View>
              <Text style={[flex2, textAlignRight, textRegular14]}>{parseFloat(ord_item.unit_price).toFixed(2)}</Text>
              <Text style={[flex1, textAlignRight, textRegular14]}>{ord_item.qty}</Text>
              <Text style={[flex2, textAlignRight, textRegular14]}>{(parseFloat(ord_item.unit_price) * parseInt(ord_item.qty)).toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.paymentWrapper}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 2}}>
              <View style={styles.rowWrapper}>
                <Text style={[textRegular14, textAlignRight]}>Item Total</Text>
                <Text style={[textRegular14, textAlignRight]}>{parseFloat(order.ord_payment.total).toFixed(2)}</Text>
              </View>
              <View style={styles.rowWrapper}>
                <Text style={[textRegular14, textAlignRight]}>Shipping</Text>
                <Text style={[textRegular14, textAlignRight]}>{parseFloat(order.ord_payment.shipphing).toFixed(2)}</Text>
              </View>
              <View style={styles.rowWrapper}>
                <Text style={[textRegular14, textAlignRight]}>Discount</Text>
                <Text style={[textRegular14, textAlignRight]}>{parseFloat(order.ord_payment.discount).toFixed(2)}</Text>
              </View>
              <View style={styles.rowWrapper}>
                <Text style={[textRegular14, textAlignRight, {fontFamily: 'ms-semibold'}]}>Grand Total</Text>
                <Text style={[textRegular14, textAlignRight, {fontFamily: 'ms-semibold'}]}>{(parseFloat(order.ord_payment.total) + parseFloat(order.ord_payment.shipphing) - parseFloat(order.ord_payment.discount)).toFixed(2)}</Text>
              </View>
            </View>
          </View>

          <View style={[marginVertical10]}>
            <Text style={[marginBottom5, textRegular12]}>{order.ord_datetime}</Text>
            <Text style={[textRegular14]}>{order.ord_notes}</Text>
            <View style={styles.methodWrapper}>
              <Text style={[styles.deliveryMethodTextStyles, textLight12]}>{order.ord_shipping.method}</Text>
              <Text style={textLight12}>{order.ord_payment.method}</Text>
            </View>
          </View>

          <View style={styles.customerTextWrapper}>
            <View>
              <Text style={textRegular14}>{order.ord_shipping.name}</Text>
              <Text style={textRegular14}>{order.ord_shipping.contact}</Text>
              <Text style={textRegular14}>{order.ord_shipping.email}</Text>
            </View>
            <MiniButton
              bgColor={colors.border}
              content={<Ionicons name="call-outline" size={24} color={colors.textColorPri} />}
              func={handleCallClick}
            />
          </View>

          <View style={marginTop10}>
            {buttonData.map(({ label, key, loading }) => (
              <Button
                key={key}
                bgColor={colors.bgColorSec}
                bdr={colors.bgColorSec}
                content={<Text style={{ color: colors.white, fontFamily: 'ms-regular' }}>{label}</Text>}
                func={() => handleConfirmClick(key)}
                loading={loading}
                loaderIconColor={colors.white}
              />
            ))}
          </View>

        </View>
      </ScrollView>

      {(order && order.ord_history && order.ord_history.length > 0) && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: colors.bgColorSec }}
          handleIndicatorStyle={{ backgroundColor: colors.textColorSec }}
        >
            <ScrollView contentContainerStyle={bottomSheetContainer}>
                <Text style={bottomSheetTitleTextStyles}>Order History</Text>
                {order.ord_history.map((historyItem, i)=>(
                  <View style={styles.historyItemWrapper} key={i}>
                    <Text style={[flex2, textAlignLeft, textRegular14]}>{historyItem.text}</Text>
                    <Text style={[flex1, textAlignRight, textRegular12]}>{historyItem.cdate}</Text>
                  </View>
                ))}
            </ScrollView>
        </BottomSheet>
       )}

    </View>
  )
}

export default OrderSingleScreen

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  historyItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  proDataCardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: 5,
  },
  proImageStyles: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  paymentWrapper: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    marginTop: 10,
    paddingVertical: 10,
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  methodWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  deliveryMethodTextStyles: {
    paddingRight: 5,
    marginRight: 5,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  customerTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
  },
  
})