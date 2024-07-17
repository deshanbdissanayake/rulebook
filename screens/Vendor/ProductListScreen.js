import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../components/general/Header'
import { colors } from '../../assets/colors/colors'
import MiniButton from '../../components/general/MiniButton'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { getProductsByUserId } from '../../assets/data/products'
import LoadingScreen from '../LoadingScreen'
import VendorProductCard from '../../components/app/VendorProductCard'
import NoData from '../../components/general/NoData'
import { container, flex1, flexRow, justifyCenter, marginBottom10, marginHorizontal2, marginLeft10, marginVertical5, paddingBottom5, paddingVertical10, textRegular12 } from '../../assets/commonStyles'
import Input from '../../components/general/Input'

const ProductListScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const params = route.params;

    const handleAddProduct = () => {
        navigation.navigate('Product Add Screen')
    }

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [products, setProducts] = useState([]);

    const [showFilter, setShowFilter] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('all');

    const getProductsFunc = async () => {
        try {
            let res = await getProductsByUserId();
            setOriginalProducts(res);
        } catch (error) {
            console.error('error at ProductListScreen->getProducts: ', error)
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getProductsFunc();

            if(params){
                setFilter(params.filter)
            }
        }, [params])
    );

    useEffect(() => {
        if (originalProducts && originalProducts.length > 0) {
            let filteredProducts = originalProducts.filter(pro => 
                filter === 'all' || filter === pro.stock_status
            );
    
            const lowerCaseSearchText = searchText.toLowerCase();
    
            let searchedProducts = filteredProducts.filter(pro => 
                pro.pro_name.toLowerCase().includes(lowerCaseSearchText) || 
                pro.pro_sku.toLowerCase().includes(lowerCaseSearchText)
            );
    
            setProducts(searchedProducts);
        } else {
            setProducts([]);
        }
    }, [originalProducts, filter, searchText]);
    
    

    const handleCardPress = async (proData) => {
        navigation.navigate('Product Single Screen', { proData } )
    }

    const onRefresh = () => {
        setRefreshing(true);
        getProductsFunc();
    }

    const handleFilterClick = () => {
        setShowFilter((prevData) => !prevData)
    }
    
    const FilterButton = ({ label, value }) => (
        <TouchableOpacity 
            onPress={() => setFilter(value)} 
            style={[
                marginHorizontal2, 
                paddingVertical10, 
                justifyCenter, 
                styles.filterBtnWrapper, 
                { backgroundColor: filter === value ? colors.bgSilver : colors.bgColorTer }
            ]}
        >
            <Text style={[textRegular12]}>{label}</Text>
        </TouchableOpacity>
    );

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={container}>
            <Header 
                text={'My Products'} 
                component={
                    <View style={[flexRow]}>
                        <View>
                            <MiniButton
                                bgColor={colors.bgColorTer}
                                content={<Ionicons name="filter" size={24} color={colors.textColorPri} />}
                                func={handleFilterClick}
                            />
                        </View>
                        <View style={[marginLeft10]}>    
                            <MiniButton
                                bgColor={colors.bgColorTer}
                                content={<Entypo name="plus" size={28} color={colors.textColorPri} />}
                                func={handleAddProduct}
                            />
                        </View>
                    </View>
                }
            />
            <View style={flex1}>
                {showFilter && (
                    <View style={[marginBottom10, paddingBottom5, {borderBottomWidth: 1, borderBottomColor: colors.border}]}>
                        <View style={[marginVertical5, flexRow, marginHorizontal2]}>
                            <View style={[justifyCenter, {flex: 10}]}>
                                <Input
                                    keyboardType={'default'}
                                    value={searchText}
                                    onChangeText={(text) => setSearchText(text)}
                                    placeholder={'Search Product Name / Code'}
                                />
                            </View>
                        </View>
                        <View style={[marginVertical5, flexRow, marginHorizontal2]}>
                            <FilterButton label="All" value="all" />
                            <FilterButton label="In Stock" value="in" />
                            <FilterButton label="Out of Stock" value="out" />
                        </View>
                    </View>
                )}
                {products && products.length > 0 ? (
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.pro_id.toString()}
                        renderItem={({item}) => (
                            <VendorProductCard proData={item} handleCardPress={handleCardPress} />
                        )}
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
                        contentContainerStyle={flex1} 
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}   
                            />
                        }
                    >
                        <NoData/>
                    </ScrollView>
                )}

                

            </View>
        </View>
    )
}

export default ProductListScreen

const styles = StyleSheet.create({
    filterBtnWrapper: {
        flex: 1, 
        borderRadius: 5, 
        borderWidth: 0.5, 
        borderColor: colors.border
    },
})