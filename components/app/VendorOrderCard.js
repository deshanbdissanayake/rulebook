import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'
import { flexRow, marginTop10, textLight12, textRegular10, textRegular12, textRegular14, textSemiBold14 } from '../../assets/commonStyles'

const VendorOrderCard = ({cardData, handleOrderClick}) => {
    
    const sttFunc = (stt) => {
        let sttBgColor = colors.info , sttText = 'Default';

        if(stt == 'pending'){
            sttBgColor = colors.warning
            sttText = 'Pending'
        }else if(stt == 'processing'){
            sttBgColor = colors.info
            sttText = 'Processing'
        }else if(stt == 'delivering'){
            sttBgColor = colors.success
            sttText = 'Delivering'
        }else if(stt == 'completed'){
            sttBgColor = colors.success
            sttText = 'Completed'
        }

        return (
            <View style={[styles.statusTextWrapper, { backgroundColor: sttBgColor}]}>
                <Text style={styles.statusTextStyles}>{sttText}</Text>
            </View>
        )
    }

    return (
        <TouchableOpacity style={styles.cardWrapper} onPress={() => handleOrderClick(cardData.ord_id)}>
            <View style={flexRow}>
                <Text style={[textSemiBold14]}>#{cardData.ord_num}</Text>
                <Text style={[textLight12]}>{cardData.ord_date}</Text>
            </View>

            <Text style={styles.ordTotalTextStyles}>LKR {cardData.ord_total}</Text>
            <Text style={[textRegular14]}>{cardData.cus_name}</Text>

            <View style={styles.methodWrapper}>
                <Text style={[styles.shippingMethodTextStyles, textRegular12]}>{cardData.shipping_method}</Text>
                <Text style={[styles.payMethodTextStyles, textRegular12]}>{cardData.payment_method}</Text>
            </View>

            <View style={[flexRow, marginTop10]}>
                <View>
                    <Text style={[textRegular10, styles.statusTitleTextStyles]}>Order Status</Text>
                    {sttFunc(cardData.ord_status)}
                </View>
                <View>
                    <Text style={[textRegular10, styles.statusTitleTextStyles, {textAlign: 'right', marginRight: 1}]}>Pay Status</Text>
                    {sttFunc(cardData.pay_status)}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default VendorOrderCard

const styles = StyleSheet.create({
    cardWrapper: {
        backgroundColor: colors.bgColorTer,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: colors.border,
    },
    ordTotalTextStyles: {
        fontSize: 20,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
        marginTop: 5,
    },
    methodWrapper: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 5,
        marginTop: 5,
    },
    shippingMethodTextStyles: {
        borderRightWidth: 1,
        borderColor: colors.border,
        paddingRight: 5,
        marginRight: 5,
    },
    statusTitleTextStyles: {
        marginLeft: 1,
        marginBottom: 2,
    },
    statusTextWrapper:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    statusTextStyles: {
        fontSize: 12,
        fontFamily: 'ms-light',
        color: colors.white,
    },
})