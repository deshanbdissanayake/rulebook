import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { container, flexGrow1, justifyBetween, marginBottom10, marginBottom5, marginLeft2, textLight12, textRegular14, w100 } from '../../assets/commonStyles'
import Header from '../../components/general/Header'
import { useNavigation } from '@react-navigation/native'
import Input from '../../components/general/Input'
import Button from '../../components/general/Button'
import { colors } from '../../assets/colors/colors'
import { changePassword } from '../../assets/data/user'

const PasswordChange = () => {
    const navigation = useNavigation();

    const [btnLoading, setBtnLoading] = useState(false)
    const [password, setPassword] = useState({
        old_pw: '',
        new_pw: '',
        new_conf_pw: ''
    });

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleResetClick = () => {
        resetFunc()
    }

    const resetFunc = () => {
        setPassword({
            old_pw: '',
            new_pw: '',
            new_conf_pw: ''
        })
    }

    const handleUpdateClick = async () => {
        setBtnLoading(false)
        if(!password.old_pw || !password.new_pw || !password.new_conf_pw){
            Alert.alert('Error', 'All fields are required!')
            return;
        }

        if(password.new_pw === password.new_conf_pw){
            Alert.alert('Error', 'New Password and Confirm Password mismatch!')
            return;
        }

        let formData = new FormData();

        formData.append('old_pw', old_pw)
        formData.append('new_pw', new_pw)

        try {
            let res = await changePassword(formData);
            if(res.stt == 'success'){
                Alert.alert('Successful', res.msg)
            }else{
                Alert.alert('Error', res.msg)
            }
        } catch (error) {
            console.error('Error at PasswordChang.js -> handleUpdateClick')
        } finally {
            setBtnLoading(false)
        }
    }

    return (
        <View style={[container]}>
            <Header text={'Change Password'} handleGoBack={handleGoBack} />
            <View style={[justifyBetween, flexGrow1]}>
                <View>
                    <View style={[marginBottom10]}>
                        <Text style={[marginLeft2, textLight12]}>Old Password</Text>
                        <Input
                            keyboardType={'default'}
                            value={password.old_pw}
                            onChangeText={(text) => setPassword((prevData) => ({...prevData, old_pw: text}))}
                            placeholder={'Enter Your Old Password'}
                            capitalize={'none'}
                        />
                    </View>
                    <View style={[marginBottom10]}>
                        <Text style={[marginLeft2, textLight12]}>New Password</Text>
                        <Input
                            keyboardType={'default'}
                            value={password.new_pw}
                            onChangeText={(text) => setPassword((prevData) => ({...prevData, new_pw: text}))}
                            placeholder={'Enter Your New Password'}
                            capitalize={'none'}
                        />
                    </View>
                    <View style={[marginBottom10]}>
                        <Text style={[marginLeft2, textLight12]}>Confirm Password</Text>
                        <Input
                            keyboardType={'default'}
                            value={password.new_conf_pw}
                            onChangeText={(text) => setPassword((prevData) => ({...prevData, new_conf_pw: text}))}
                            placeholder={'Enter Your Confirm New Password'}
                            capitalize={'none'}
                        />
                    </View>
                </View>
                <View style={w100}>
                    <View style={marginBottom5}>
                        <Button
                            bgColor={colors.bgColor}
                            bdr={colors.textColorPri}
                            content={<Text style={[textRegular14, {color: colors.textColorPri}]}>Reset</Text>}
                            func={handleResetClick}
                            loading={btnLoading}
                            loaderIconColor={colors.textColorPri}
                        />
                    </View>
                    <View style={marginBottom5}>
                        <Button
                            bgColor={colors.bgColorSec}
                            bdr={colors.bgColorSec}
                            content={<Text style={[textRegular14, {color: colors.textColorSec}]}>Update</Text>}
                            func={handleUpdateClick}
                            loading={btnLoading}
                            loaderIconColor={colors.textColorSec}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PasswordChange

const styles = StyleSheet.create({})