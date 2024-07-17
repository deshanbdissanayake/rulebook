import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'

const SummaryCard = ({name, value, bgColor, filter, type}) => {
    const navigation = useNavigation();

    let pay_stts = ['all'];
    let ord_stts = ['all'];
    
    if (name === 'Pending Orders') {
      ord_stts = ['pending'];
    } else if (name === 'Processing Orders') {
      ord_stts = ['processing'];
    } else if (name === 'Pending Payments') {
      pay_stts = ['pending'];
    } else if (name === 'Confirmed Payments') {
      pay_stts = ['completed'];
    } else if (name === 'Pending Pickup') {
      ord_stts = ['pending', 'processing'];
    } else if (name === 'Confirmed Pickup') {
      ord_stts = ['delivering'];
    }
    
    const handleCardClick = () => {
      if(type == 'order'){
        navigation.navigate('Orders', { 
          screen: 'Order List Screen', 
          params: { ord_stts, pay_stts, dates: [filter] }
        });
      }else{
        navigation.navigate('Products', { 
          screen: 'Product List Screen', 
          params: { filter }
        });
      }
    };
    
    return (
        <TouchableOpacity onPress={handleCardClick} style={[styles.cardWrapper]}>
            <Text style={styles.cardNameStyles}>{name}</Text>
            <Text style={styles.cardValueStyles}>{value}</Text>
        </TouchableOpacity>
    )
}

export default SummaryCard

const styles = StyleSheet.create({
    cardWrapper: {
        marginBottom: 10,
        marginHorizontal: 2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: Dimensions.get('screen').width/2 - 30,
        backgroundColor: colors.white,
    },
    cardNameStyles: {
        fontSize: 12,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
        marginBottom: 5,
    },
    cardValueStyles: {
        fontSize: 14,
        fontFamily: 'ms-semibold',
        color: colors.textColorPri,
    },
})