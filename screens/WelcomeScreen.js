import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../assets/colors/colors'
import Input from '../components/general/Input'
import { marginTop15 } from '../assets/commonStyles'
import Button from '../components/general/Button'
import { loginFunc } from '../assets/data/auth'
import { useAppContext } from '../context/AppContext';

const WelcomeScreen = () => {
  const { setIsLoggedIn } = useAppContext();


  const [btnLoading, setBtnLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    try {
      setBtnLoading(true);

      if (!username || username.length < 4) {
        Alert.alert('Error', 'Enter a username longer than 4 characters.');
        setBtnLoading(false); // Ensure button loading state is reset if validation fails
        return;
      }

      // If validation passes, call the login function
      let res = await loginFunc(username, password);
      console.log(res)
      setIsLoggedIn(res);
    } catch (error) {
      console.error('Error at WelcomeScreen.js -> handleLogin: ', error);
      Alert.alert('Login Error', 'An error occurred during login.');
    } finally {
      setBtnLoading(false); // Always reset the button loading state
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={require('../assets/images/book.png')}
          style={styles.imgStyles}
        />
        <Text style={styles.welcomeTextStyles}>Welcome!</Text>
        <Text style={styles.welcomeSubTextStyles}>Let's Achieve Greatness Together!</Text>
      </View>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.loginWrapper} >
        <Input
          keyboardType={'default'}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder={'Enter Your Username'}
          maxLength={10}
        />
        {/* <Input
          keyboardType={'default'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder={'Enter Your Password'}
          secureTextEntry={true}
          wrapperStyles={marginTop15}
          maxLength={8}
        /> */}
        <Button
          bgColor={colors.bgColorSec}
          content={<Text style={styles.loginBtnTextStyles}>Login</Text>}
          wrapperStyles={marginTop15}
          func={handleLogin}
          loading={btnLoading}
          loaderIconColor={colors.textColorSec}
        />
      </ScrollView>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColorPri,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imgStyles: {
    width: 130,
    height: 130,
    resizeMode: 'cover',
  },
  imgWrapper:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextStyles: {
    fontFamily: 'ms-semibold',
    fontSize: 24,
    color: colors.textColorPri,
    marginTop: 20,
    textAlign: 'center',
  },
  welcomeSubTextStyles: {
    fontFamily: 'ms-regular',
    fontSize: 18,
    color: colors.textColorPri,
    marginTop: 20,
    textAlign: 'center',
    width: 250,
  },
  loginWrapper:{
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  loginBtnTextStyles: {
    fontFamily: 'ms-regular',
    fontSize: 14,
    color: colors.textColorSec,
  },
})
