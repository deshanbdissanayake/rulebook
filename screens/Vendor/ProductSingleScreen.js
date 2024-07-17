import { Image, ScrollView, StyleSheet, Text, View, Dimensions  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../assets/colors/colors'
import Header from '../../components/general/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getAllCategories } from '../../assets/data/categories'
import { getAllTags } from '../../assets/data/tags'
import LoadingScreen from '../LoadingScreen'
import { container, flexGrow1, flexRow, marginBottom10, textAlignCenter, textAlignJustify, textLight12, textRegular12, textRegular14 } from '../../assets/commonStyles'

const ProductSingleScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { proData } = route.params;

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [loading, setLoading] = useState(true);
    const [cats, setCats] = useState(null);
    const [tags, setTags] = useState(null);

    const getData = async () => {
        try {
            let cats = await getAllCategories();
            let tags = await getAllTags();
    
            let proCatData = proData.categories.map(catId => cats.find(cat => cat.cat_id === catId));
            let proTagData = proData.tags.map(tagId => tags.find(tag => tag.tag_id === tagId));

            setCats(proCatData);
            setTags(proTagData);
        } catch (error) {
            console.error('Error at ProductSingleScreen getData: ', error);
        } finally {
            setLoading(false);
        }
    };
      

    useEffect(() => {
        getData();
    },[])

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={container}>
            <Header
                text={'Single Product'}
                handleGoBack={handleGoBack}
            />
            <ScrollView contentContainerStyle={[flexGrow1]} showsVerticalScrollIndicator={false}>
                <View > 
                    <Image style={styles.mainImageStyles} source={{uri: proData.pro_images[0].img}} />
                    <View style={[styles.imageWrapper]}>
                        {proData.pro_images.map((imgData, i) => {
                            if (i !== 0) {
                            return <Image key={i} style={styles.subImageStyles} source={{ uri: imgData.img }} />;
                            }
                            return null;
                        })}
                    </View>
                </View>
                <View style={styles.productDetailsWrapper}>
                    <Text style={styles.nameTextStyles}>{proData.pro_name}</Text>
                    <View style={styles.stockSkuWrapper}>
                        <Text style={[textRegular14]}>{proData.pro_sku}</Text>
                        <View style={[styles.stockStatusWrapper]}>
                            <Text style={[textRegular14, textAlignCenter]}>({proData.stock_status == 'in' ? 'In Stock' : 'Out of Stock'})</Text>
                        </View>
                    </View>
                    <View style={styles.priceWrapper}>
                        {proData.discount ? (
                            <>
                                <Text style={styles.priceTextStyles}>LKR </Text>
                                <Text style={styles.discountPriceTextStyles}>{proData.discount.dis_price}</Text>
                                <Text style={[styles.priceTextStyles, {textDecorationLine: 'line-through'}]}>{proData.price}</Text>
                            </>
                        ) : (
                            <Text style={styles.priceTextStyles}>LKR {proData.price}</Text>
                        )}
                    </View>
                    {proData.discount &&
                        <View style={[marginBottom10]}>
                            <Text style={[textRegular12]}>{`(Discount From ${proData.discount.dis_start} To ${proData.discount.dis_end})`}</Text>
                        </View>
                    }
                    <View style={styles.categoriesWrapper}>
                        {(cats && cats.length > 0) && cats.map((cat, index)=>(
                            <View style={styles.categoryWrapper} key={index}>
                                <Text style={[textRegular14]}>{cat.cat_name}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={[textRegular14, marginBottom10, textAlignJustify]}>{proData.pro_desc}</Text>
                    <View style={styles.tagsWrapper}>
                        {(tags && tags.length > 0) && tags.map((tag, index)=>(
                            <View style={styles.tagWrapper} key={index}>
                                <Text style={[textLight12, textAlignCenter]}>{tag.tag_name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProductSingleScreen

const styles = StyleSheet.create({
    mainImageStyles: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
        marginBottom: 7,
        borderRadius: 10,
    },
    imageWrapper: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    subImageStyles: {
        width: Dimensions.get('window').width/3 - 20,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10,
        marginRight: 10,
    },
    productDetailsWrapper: {
        marginTop: 15,
    },
    nameTextStyles: {
        fontSize: 18,
        fontFamily: 'ms-semibold',
        color: colors.textColorPri,
    },
    priceWrapper: {
        flexDirection: 'row',
        marginTop: 5,
    },
    discountPriceTextStyles: {
        fontSize: 20,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
        marginRight: 10,
    },
    priceTextStyles: {
        fontSize: 20,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
    },
    categoriesWrapper: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 10,
    },
    categoryWrapper: {
        marginRight: 5,
        paddingRight: 5,
        borderRightWidth: 1,
        borderRightColor: colors.border,
    },
    tagsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagWrapper: {
        backgroundColor: colors.bgColorTer,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginRight: 5,
    },
    stockSkuWrapper: {
        flexDirection: 'row',
    },
    stockStatusWrapper: {
        borderRadius:5,
        marginLeft: 5,
    },
})