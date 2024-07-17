import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'
import { flexRow, textLight12, textRegular12, textSemiBold14 } from '../../assets/commonStyles'

const VendorProductCard = ({ proData, handleCardPress }) => {
  return (
    <TouchableOpacity style={[styles.cardWrapper, flexRow]} onPress={() => handleCardPress(proData)}>
      <View style={[styles.cardImageWrapper]}>
        <Image style={styles.cardImageStyles} source={{uri: proData.pro_images[0].img}} />
      </View>
      <View style={styles.cardTextWrapper}>
        <View>
          <Text style={[textSemiBold14]} numberOfLines={1} >{proData.pro_name}</Text>
          <Text style={[textRegular12]} numberOfLines={1} >{proData.pro_sku}</Text>
        </View>
        <View style={[flexRow]}>
          <View>
            <Text style={[textLight12]}>LKR</Text>
            <View style={styles.cardPriceTextWrapper}>
              {proData.discount ? (
                <>
                  <Text style={styles.cardDiscountPriceTextStyles}>{proData.discount.dis_price}</Text>
                  <Text style={[styles.cardPriceTextStyles, {textDecorationLine: 'line-through'}]}>{proData.price}</Text>
                </>
              ) : (
                <Text style={styles.cardPriceTextStyles}>{proData.price}</Text>
              )}
            </View>
          </View>
          <View style={[styles.cardStockStatusTextWrapper, { backgroundColor : proData.stock_status == 'in' ? colors.success : colors.danger }]}>
            <Text style={styles.cardStockStatusTextStyles}>{proData.stock_status == 'in' ? 'In Stock' : 'Out of Stock'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default VendorProductCard

const styles = StyleSheet.create({
    cardWrapper: {
      backgroundColor: colors.bgColorTer,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginBottom: 10,
      borderWidth: 0.5,
      borderRadius: 10,
      borderColor: colors.border,
    },
    cardImageWrapper: {
      flex: 1,
    },
    cardImageStyles: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      borderRadius: 10,
      backgroundColor: colors.bgColor,
    },
    cardTextWrapper: {
      flex: 2,
      height: 90,
      marginLeft: 5,
      justifyContent: 'space-between',
    },
    cardPriceTextWrapper: {
      flexDirection: 'row',
    },
    cardDiscountPriceTextStyles: {
      fontSize: 16,
      fontFamily: 'ms-regular',
      color: colors.success,
      marginRight: 5,
    },
    cardPriceTextStyles: {
      fontSize: 16,
      fontFamily: 'ms-regular',
      color: colors.textColorPri,
    },
    cardStockStatusTextWrapper: {
      width: 60,
      justifyContent: 'center',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    cardStockStatusTextStyles: {
      fontSize: 10,
      fontFamily: 'ms-regular',
      color: colors.white,
      textAlign: 'center',
    },
})