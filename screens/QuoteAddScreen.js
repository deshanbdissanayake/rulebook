import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../assets/colors/colors'
import Header from '../components/general/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import Input from '../components/general/Input'
import { marginTop15 } from '../assets/commonStyles'
import Button from '../components/general/Button'
import MultiSelect from '../components/general/MultiSelect'
import { getAllCollections } from '../assets/data/collections'
import { addQuote } from '../assets/data/quotes'
import LoadingScreen from './LoadingScreen'

const QuoteAddScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [quote, setQuote] = useState(null);
    const [author, setAuthor] = useState(null);
    const [cols, setCols] = useState([]); //collections
    const [selectedCols, setSelectedCols] = useState([]); //collections

    useEffect(()=>{
        getData();
    },[])

    const getData = async () => {
        try {
            let data = await getAllCollections();
            setCols(data);
        } catch (error) {
            console.error('error at QuoteAddScreen.js: ', error);
        } finally {
            setLoading(false);
        }
    }

    const addNewQuote = async () => {
        try {
            setBtnLoading(true);
            const res = await addQuote(quote, author);
            if(res.stt == 'success'){
                Alert.alert('Success', res.msg)
                resetFunc(); //later redirect to quote list
            }else{
                Alert.alert('Error', res.msg)
            }
        } catch (error) {
            console.error('Error adding new quote:', error);
        } finally {
            setBtnLoading(false);
        }
    };

    const resetFunc = () => {
        setQuote(null);
        setAuthor(null);
        setSelectedCols([]);
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Header
                text={(route.params ? 'Edit' : 'Add') + ' Quote'}
                handleGoBack={handleGoBack}
            />
            <View style={styles.formWrapper}>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                        onChangeText={(text) => setAuthor(text)}
                        placeholder={'Enter Author (optional)'}
                        wrapperStyles={marginTop15}
                    />
                    {(cols && cols.length) > 0 && (
                        <MultiSelect
                            options={cols}
                            wrapperStyles={marginTop15}
                            onSelect={(values) => setSelectedCols(values)}
                            placeholder={'Select Collections (optional)'}
                            itemName={'collections'}
                        />
                    )}
                </ScrollView>
                <Button
                    bgColor={colors. bgColorSec}
                    content={<Text style={styles.btnTextStyles}>{(route.params ? 'Edit' : 'Add')}</Text>}
                    func={addNewQuote}
                    loading={btnLoading}
                    loaderIconColor={colors.textColorSec}
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