import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'
import MiniButton from '../general/MiniButton'
import { FontAwesome } from '@expo/vector-icons'
import { flexRowEnd } from '../../assets/commonStyles'
import { useNavigation } from '@react-navigation/native'

const QuoteListItem = ({ itemData, deleteFunc }) => {
    const navigation = useNavigation();

    const handleEditClick = () => {
        navigation.navigate('Add Quote', { q_id : itemData.id})
    }

    const handleDeleteClick = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this rule?', [
            {text: 'Cancel', style: 'cancel', onPress: () => null},
            {text: 'OK', onPress: () => {deleteFunc(itemData.id)}}
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.quoteTextStyle}>{itemData.quote}</Text>
            {(itemData.author) ? (
                <Text style={styles.authorTextStyle}>~ {itemData.author} ~</Text>
            ) : null}
            
            <View style={[flexRowEnd]}>
                <MiniButton
                    func={handleEditClick}
                    content={<FontAwesome name="pencil-square" size={24} color={colors.textColorPri} />}
                />
                <MiniButton
                    func={handleDeleteClick}
                    content={<FontAwesome name="trash" size={24} color={colors.danger} />}
                />
            </View>
        </View>
    )
}

export default QuoteListItem

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 0.25,
        borderColor: colors.border,
        borderRadius: 5,
        marginBottom: 10,
    },
    quoteTextStyle: {
        color: colors.textColorPri,
        fontFamily: 'ms-regular',
        fontSize: 16,
        textAlign: 'justify',
    },
    authorTextStyle: {
        color: colors.textColorPri,
        fontFamily: 'ms-regular',
        fontSize: 12,
        marginTop: 5,
    },
})