import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../assets/colors/colors'
import Header from '../components/general/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import Input from '../components/general/Input'
import { marginTop15 } from '../assets/commonStyles'
import Button from '../components/general/Button'

const QuoteAddScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [quote, setQuote] = useState();

    return (
        <View style={styles.container}>
            <Header
                text={(route.params ? 'Edit' : 'Add') + ' Quote'}
                handleGoBack={handleGoBack}
            />
            <View style={styles.formWrapper}>
                <View>
                    <Text style={styles.labelTextStyles}>Add your personal quotes below to keep yourself on track !</Text>
                    <Input
                        keyboardType={'default'}
                        onChangeText={(text) => setQuote(text)}
                        placeholder={'Enter Quote'}
                        multiline={true}
                        textArea={true}
                    />
                    <Input
                        keyboardType={'default'}
                        onChangeText={(text) => setQuote(text)}
                        placeholder={'Enter Author (optional)'}
                        wrapperStyles={marginTop15}
                    />
                </View>
                <Button
                    bgColor={colors. bgColorPriSec}
                    content={<Text style={styles.btnTextStyles}>{(route.params ? 'Edit' : 'Add')}</Text>}
                />
            </View>
        </View>
    )
}

export default QuoteAddScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColorPri,
        padding: 20,
    },
    formWrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    labelTextStyles: {
        fontFamily: 'ms-regular',
        fontSize: 16,
        color: colors.textColorPri,
        marginBottom: 20,
        marginLeft: 2,
        textAlign: 'justify',
    },
    btnTextStyles: {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textColorSec,
    },
})