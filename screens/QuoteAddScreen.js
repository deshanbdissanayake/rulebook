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
import { getTableDataById } from '../assets/data/database'

const QuoteAddScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [id, setId] = useState(null);
    const [quote, setQuote] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(()=>{
        getQuoteById();
    },[])

    const handleGoBack = () => {
        navigation.goBack();
    }

    const resetFunc = () => {
        setQuote(null);
        setAuthor(null);
    }

    const addNewQuote = async () => {
        if (!quote) {
            Alert.alert('Error', 'Please add a quote.');
            return;
        }
    
        try {
            setBtnLoading(true);
            const res = await addQuote(id, quote, author);
    
            if (res.stt === 'success') {
                const successAction = route.params 
                    ? () => navigation.goBack() 
                    : resetFunc;
    
                Alert.alert('Success', res.msg, [{ text: 'OK', onPress: successAction }]);
            } else {
                Alert.alert('Error', res.msg);
            }
        } catch (error) {
            console.error('Error adding new quote:', error);
            Alert.alert('Error', 'An unexpected error occurred.');
        } finally {
            setBtnLoading(false);
        }
    };      

    const getQuoteById = async () => {
        try {
            if(route.params){
                let res = await getTableDataById('quote', route.params.q_id);
                setId(route.params.q_id);
                setQuote(res.quote);
                setAuthor(res.author);
            }
        } catch (error) {
            console.error('error at QuoteAddScreen.js: ', error);
        } finally {
            setLoading(false);
        }
    }
    
    /*
    const [loading, setLoading] = useState(true);
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
    */

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Header
                text={(route.params ? 'Edit' : 'Add') + ' Rule'}
                handleGoBack={handleGoBack}
            />
            <View style={styles.formWrapper}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.labelTextStyles}>Add your personal rules below to keep yourself on track !</Text>
                    <Input
                        keyboardType={'default'}
                        onChangeText={(text) => setQuote(text)}
                        placeholder={'Enter Rule'}
                        multiline={true}
                        textArea={true}
                        value={quote}
                    />
                    <Input
                        keyboardType={'default'}
                        onChangeText={(text) => setAuthor(text)}
                        placeholder={'Enter Author (optional)'}
                        wrapperStyles={marginTop15}
                        value={author}
                    />
                    {
                    /*(cols && cols.length) > 0 && (
                        <MultiSelect
                            options={cols}
                            wrapperStyles={marginTop15}
                            onSelect={(values) => setSelectedCols(values)}
                            placeholder={'Select Collections (optional)'}
                            itemName={'collections'}
                        />
                    )*/
                    }
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