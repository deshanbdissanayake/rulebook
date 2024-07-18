import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../components/general/Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { alignCenter, borderBottom, borderTop, borderVertical, container, flex1, flex2, flex4, flexRow, justifyBetween, marginBottom10, marginBottom15, marginBottom5, marginHorizontal15, marginTop10, marginTop15, marginVertical10, marginVertical15, paddingBottom15, paddingHorizontal10, paddingHorizontal15, paddingVertical10, textAlignLeft, textLight12, textLight14, textRegular14, textSemiBold14, w100 } from '../assets/commonStyles'
import { getProfileData } from '../assets/data/user'
import LoadingScreen from './LoadingScreen'
import { colors } from '../assets/colors/colors'
import Subtitle from '../components/general/Subtitle'
import Button from '../components/general/Button'

const ProfileScreen = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true)
    const [profileData, setProfileData] = useState(null)
    const [showDesc, setShowDesc] = useState(false)

    const getData = async () => {
        try {
            let res = await getProfileData();
            setProfileData(res);
        } catch (error) {
            console.error('error at ProfileScreen.js -> getData')
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(()=>{
            getData()
        },[])
    )

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleEditClick = () => {
        navigation.navigate('Profile Edit Screen')
    }

    const handleChangePasswordClick = () => {
        navigation.navigate('Password Change Screen')
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={container}>
            <Header text={'My Profile'} handleGoBack={handleGoBack} />
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <View style={[paddingBottom15, w100, alignCenter]}>
                    <Image style={styles.imageStyles} source={{uri: profileData.pro_pic}} />
                </View>
                <View style={[w100, marginHorizontal15, borderBottom]}>
                    <View style={[marginTop15, marginBottom5]}>
                        <Subtitle text={'Shop Details'} />
                    </View>
                    <View style={[flexRow, justifyBetween, paddingVertical10, paddingHorizontal10, borderTop]}>
                        <Text style={[textRegular14, flex1]}>Shop Name</Text>
                        <Text style={[textLight14, flex2]}>{profileData.shop_name}</Text>
                    </View>
                    <View style={[flexRow, justifyBetween, paddingVertical10, paddingHorizontal10, borderTop]}>
                        <Text style={[textRegular14, flex1]}>Shop Contact</Text>
                        <Text style={[textLight14, flex2]}>{profileData.shop_contact}</Text>
                    </View>
                    <View style={[flexRow, justifyBetween, paddingVertical10, paddingHorizontal10, borderTop]}>
                        <Text style={[textRegular14, flex1]}>Shop Email</Text>
                        <Text style={[textLight14, flex2]}>{profileData.shop_email}</Text>
                    </View>
                    <View style={[flexRow, justifyBetween, paddingVertical10, paddingHorizontal10, borderTop]}>
                        <Text style={[textRegular14, flex1]}>Shop Address</Text>
                        <Text style={[textLight14, flex2]}>{profileData.shop_address}</Text>
                    </View>
                    <View style={[flexRow, justifyBetween, paddingVertical10, paddingHorizontal10, borderTop]}>
                        <Text style={[textRegular14, flex1]}>City</Text>
                        <Text style={[textLight14, flex2]}>{profileData.shop_city}</Text>
                    </View>
                    <View style={[flexRow, justifyBetween, paddingVertical10, paddingHorizontal10, borderTop]}>
                        <Text style={[textRegular14, flex1]}>Shop URL</Text>
                        <Text style={[textLight14, flex2]}>{profileData.shop_url}</Text>
                    </View>
                    <View style={[flexRow, justifyBetween, paddingVertical10, paddingHorizontal10, borderTop, borderBottom]}>
                        <Text style={[textRegular14, flex1]}>Shop Description</Text>
                        <Pressable style={[flex2]} onPress={()=> setShowDesc((val)=> !val)}>
                            <Text style={[textLight14]} numberOfLines={showDesc ? null : 3}>{profileData.shop_desc}</Text>
                        </Pressable>
                    </View>

                    <View style={[marginTop15, marginBottom5]}>
                        <Subtitle text={'Vendor Details'} />
                    </View>
                    <View style={[flexRow, justifyBetween, paddingVertical10, paddingHorizontal10, borderTop]}>
                        <Text style={[textRegular14, flex1]}>Name</Text>
                        <Text style={[textLight14, flex2]}>{profileData.fullname}</Text>
                    </View>
                    <View style={[flexRow, justifyBetween, paddingVertical10, paddingHorizontal10, borderTop]}>
                        <Text style={[textRegular14, flex1]}>Contact</Text>
                        <Text style={[textLight14, flex2]}>{profileData.contact}</Text>
                    </View>
                    <View style={[flexRow, justifyBetween, paddingVertical10, paddingHorizontal10, borderTop]}>
                        <Text style={[textRegular14, flex1]}>Email</Text>
                        <Text style={[textLight14, flex2]}>{profileData.email}</Text>
                    </View>
                </View>

                <View style={[marginTop15, marginBottom10, w100]}>
                    <View style={[marginBottom5]}>
                        <Button
                            bgColor={colors.bgColor}
                            content={<Text style={[textRegular14, {color: colors.textColorPri}]}>Change Password</Text>}
                            func={handleChangePasswordClick}
                            bdr={colors.textColorPri}
                        />
                    </View>
                    <View style={[marginBottom5]}>
                        <Button
                            bgColor={colors.bgColorSec}
                            content={<Text style={[textRegular14, {color: colors.textColorSec}]}>Edit My Profile</Text>}
                            func={handleEditClick}
                            bdr={colors.bgColorSec}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    imageStyles: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 150,
        borderWidth: 2,
        borderColor: colors.textColorPri,
        backgroundColor: colors.textColorTer,
        marginTop: 10,
    },
})