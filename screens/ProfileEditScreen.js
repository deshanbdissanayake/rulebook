import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../components/general/Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import LoadingScreen from './LoadingScreen'
import { getProfileData, updateProfileData } from '../assets/data/user'
import { AntDesign } from '@expo/vector-icons'
import Input from '../components/general/Input'
import { colors } from '../assets/colors/colors'
import { borderTop, container, labelTextStyles, marginBottom10, marginBottom5, marginTop15, marginVertical15, paddingTop10, paddingTop15, textRegular14 } from '../assets/commonStyles';
import Subtitle from '../components/general/Subtitle';
import Button from '../components/general/Button';

const ProfileEditScreen = () => {
    const navigation = useNavigation();

    const [btnLoading, setBtnLoading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        pro_pic: null,
        fullname: null,
        username: null,
        email: null,
        contact: null,
        shop_address: null,
        shop_city: null,
        shop_name: null,
        shop_url: null,
        shop_contact: null,
        shop_email: null,
        shop_desc: null,
    })

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleImageSelect = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setFormData(prevData => ({
                ...prevData,
                pro_pic: result.assets[0].uri
            }));
        }
    };

    const getData = async () => {
        try {
            let res = await getProfileData();
            setFormData({
                pro_pic: res.pro_pic,
                fullname: res.fullname,
                username: res.username,
                email: res.email,
                contact: res.contact,
                shop_address: res.shop_address,
                shop_city: res.shop_city,
                shop_name: res.shop_name,
                shop_url: res.shop_url,
                shop_contact: res.shop_contact,
                shop_email: res.shop_email,
                shop_desc: res.shop_desc,
            });
        } catch (error) {
            console.error('error at ProfileEditScreen.js -> getData')
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getData();
        }, [])
    )

    const resetFunc = () => {
        setFormData({
            pro_pic: null,
            fullname: null,
            username: null,
            email: null,
            contact: null,
            shop_address: null,
            shop_city: null,
            shop_name: null,
            shop_url: null,
            shop_contact: null,
            shop_email: null,
            shop_desc: null,
        });
    }

    const handleSubmitForm = async () => {
        setBtnLoading(true)

        try {
            const profileFormData = new FormData();

            profileFormData.append('pro_pic', formData.pro_pic)
            profileFormData.append('fullname', formData.fullname)
            profileFormData.append('username', formData.username)
            profileFormData.append('email', formData.email)
            profileFormData.append('contact', formData.contact)
            profileFormData.append('shop_address', formData.shop_address)
            profileFormData.append('shop_city', formData.shop_city)
            profileFormData.append('shop_name', formData.shop_name)
            profileFormData.append('shop_url', formData.shop_url)
            profileFormData.append('shop_contact', formData.shop_contact)
            profileFormData.append('shop_email', formData.shop_email)
            profileFormData.append('shop_desc', formData.shop_desc)

            let res = await updateProfileData(profileFormData);
            if(res.stt === 'success'){
                Alert.alert('Successful', res.msg)
            }else{
                Alert.alert('Error', res.msg)
            }
        } catch (error) {
            console.error('error at ProfileEditScreeen.js -> handleSubmitForm')
        } finally {
            setBtnLoading(false)
            resetFunc()
        }
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <View style={container}>
            <Header text='Edit My Profile' handleGoBack={handleGoBack} />
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <View>
                    <View style={[marginTop15, marginBottom5]}>
                        <Subtitle text={'Shop Information'} />
                    </View>
                    <View style={marginBottom10}>
                        <Text style={labelTextStyles}>Shop Logo</Text>
                        <TouchableOpacity onPress={handleImageSelect} style={styles.addImageWrapper}>
                            {formData.pro_pic ? (
                                <Image style={styles.imageStyles} source={{ uri: formData.pro_pic }} />
                            ) : (
                                <AntDesign name="plus" size={24} color={colors.textColorPri} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={marginBottom10}>
                        <Text style={labelTextStyles}>Shop Name</Text>
                        <Input
                            keyboardType='default'
                            value={formData.shop_name ?? ''}
                            onChangeText={text => setFormData(prevData => ({ ...prevData, shop_name: text }))}
                            placeholder='Enter Shop Name'
                        />
                    </View>
                    <View style={marginBottom10}>
                        <Text style={labelTextStyles}>Shop Contact</Text>
                        <Input
                            keyboardType='default'
                            value={formData.shop_contact ?? ''}
                            onChangeText={text => setFormData(prevData => ({ ...prevData, shop_contact: text }))}
                            placeholder='Enter Shop Contact'
                        />
                    </View>
                    <View style={marginBottom10}>
                        <Text style={labelTextStyles}>Shop Email</Text>
                        <Input
                            keyboardType='default'
                            value={formData.shop_email ?? ''}
                            onChangeText={text => setFormData(prevData => ({ ...prevData, shop_email: text }))}
                            placeholder='Enter Shop Email'
                        />
                    </View>
                    <View style={marginBottom10}>
                        <Text style={labelTextStyles}>Shop Address</Text>
                        <Input
                            keyboardType='default'
                            value={formData.shop_address ?? ''}
                            onChangeText={text => setFormData(prevData => ({ ...prevData, shop_address: text }))}
                            placeholder='Enter Shop Address'
                            multiline={true}
                            textArea={true}
                        />
                    </View>
                    <View style={marginBottom10}>
                        <Text style={labelTextStyles}>Shop City</Text>
                        <Input
                            keyboardType='default'
                            value={formData.shop_city ?? ''}
                            onChangeText={text => setFormData(prevData => ({ ...prevData, shop_city: text }))}
                            placeholder='Enter Shop City'
                        />
                    </View>
                    <View style={marginBottom10}>
                        <Text style={labelTextStyles}>Shop URL</Text>
                        <Input
                            keyboardType='default'
                            value={formData.shop_url ?? ''}
                            onChangeText={text => setFormData(prevData => ({ ...prevData, shop_url: text }))}
                            placeholder='Enter Shop URL'
                        />
                    </View>
                    <View style={marginBottom10}>
                        <Text style={labelTextStyles}>Shop Description</Text>
                        <Input
                            keyboardType='default'
                            value={formData.shop_desc ?? ''}
                            onChangeText={text => setFormData(prevData => ({ ...prevData, shop_desc: text }))}
                            placeholder='Enter Shop Description'
                            multiline={true}
                            textArea={true}
                        />
                    </View>

                    <View style={[marginTop15, marginBottom5, borderTop, paddingTop15]}>
                        <Subtitle text={'User Information'} />
                    </View>
                    <View style={marginBottom10}>
                        <Text style={labelTextStyles}>User Full Name</Text>
                        <Input
                            keyboardType='default'
                            value={formData.fullname ?? ''}
                            onChangeText={text => setFormData(prevData => ({ ...prevData, fullname: text }))}
                            placeholder='Enter User Full Name'
                        />
                    </View>
                    <View style={marginBottom10}>
                        <Text style={labelTextStyles}>User Email</Text>
                        <Input
                            keyboardType='default'
                            value={formData.email ?? ''}
                            onChangeText={text => setFormData(prevData => ({ ...prevData, email: text }))}
                            placeholder='Enter User Email'
                        />
                    </View>
                    <View style={marginBottom10}>
                        <Text style={labelTextStyles}>User Contact</Text>
                        <Input
                            keyboardType='default'
                            value={formData.contact ?? ''}
                            onChangeText={text => setFormData(prevData => ({ ...prevData, contact: text }))}
                            placeholder='Enter User Contact'
                        />
                    </View>
                </View>
                <View>
                    <View style={marginBottom5}>
                        <Button
                            bgColor={colors.bgColorSec}
                            content={<Text style={[textRegular14, {color: colors.textColorSec}]}>Update</Text>}
                            bdr={colors.bgColorSec}
                            func={handleSubmitForm}
                            loading={btnLoading}
                            loaderIconColor={colors.textColorSec}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileEditScreen

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    addImageWrapper: {
        width: 150,
        height: 150,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyles: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
})
