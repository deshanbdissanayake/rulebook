import { Image, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { container, flex1, hidePwStyles, justifyCenter, marginBottom10, marginBottom5, marginLeft2, marginTop10, marginTop5, textLight12, textRegular12, textRegular14, textSemiBold14, w100 } from '../assets/commonStyles'
import Button from '../components/general/Button'
import { colors } from '../assets/colors/colors'
import Input from '../components/general/Input'
import MiniButton from '../components/general/MiniButton'
import { Feather } from '@expo/vector-icons'
import { signIn } from '../assets/data/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppContext } from '../context/AppContext'
import LoadingScreen from './LoadingScreen'

const WelcomeScreen = () => {
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  
  const [loading, setLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)
  const [hidePw, setHidePw] = useState(true);
  const [loginData, setLoginData] = useState({
    username: null,
    password: null,
  })

  useEffect(()=>{
    getData();

  },[])
  
  const getData = async () => {
    try {
      let userdata = await AsyncStorage.getItem('userdata');
      if (userdata !== null) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error at WelcomeScreen.js -> getData:', error);
    } finally {
      setLoading(false)
    }
  }

  const handleLoginClick = async () => {

    if(!loginData.username || !loginData.password){
      Alert.alert('Error', 'Both username and password fields are required!');
      return;
    }

    setBtnLoading(true);
    try {
      let res = await signIn(loginData.username, loginData.password);
      if(res){
        let userdata = JSON.stringify({ username: loginData.username, login_stt: true});
        await AsyncStorage.setItem('userdata', userdata)
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('error at WelcomeScreen.js -> handleLoginClick', error)
    } finally {
      setBtnLoading(false)
    }
  }

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <KeyboardAvoidingView
      style={[container, {padding: 20}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={[flex1, { justifyContent: 'space-around'}]}>
        <View style={[justifyCenter, { marginBottom: 30 }]}>
          <Text style={[textSemiBold14, marginBottom10, {fontSize: 36}]}>Welcome</Text>
          <Text style={[textSemiBold14, {fontSize: 24}]}>to</Text>
          <Image style={styles.imageStyles} source={require('../assets/images/logo_full_black.png')} />
          <View style={[marginTop10, justifyCenter]}>
            <Text style={[textSemiBold14, marginBottom5]}>Everything you need</Text>
            <Text style={[textSemiBold14]}>at your fingertips</Text>
          </View>
        </View>

        <View style={{zIndex: 2, backgroundColor: colors.bgColor}}>
          <View style={[marginBottom10]}>
            <Input
              keyboardType={'default'}
              value={loginData.username}
              onChangeText={(text) => setLoginData((prevData) => ({...prevData, username: text}))}
              placeholder={'Enter your username'}
              center={ true }
              capitalize={'none'}
            />
          </View>
          <View style={[marginBottom10, marginTop5]}>
            <Input
              keyboardType={'default'}
              value={loginData.password}
              onChangeText={(text) => setLoginData((prevData) => ({...prevData, password: text}))}
              placeholder={'Enter your password'}
              secureTextEntry={hidePw}
              center={ true }
              capitalize={'none'}
            />
            <View style={hidePwStyles}>
              <MiniButton
                content={<Feather name={hidePw ? "eye" : "eye-off"} size={24} color={colors.gray} />}
                func={() => setHidePw((prevData) => !prevData)}
                paddingStt={false}
              />
            </View>
          </View>
          <View style={[w100, marginTop10]}>
            <Button
              bgColor={colors.bgColorSec}
              content={<Text style={[textRegular14, {color: colors.textColorSec}]}>Sign in</Text>}
              func={handleLoginClick}
              loading={btnLoading}
              loaderIconColor={colors.textColorSec}
            />
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  imageStyles: {
    width: 300,
    height: 80,
    resizeMode: 'contain',
  },
})
