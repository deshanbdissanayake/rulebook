import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../assets/colors/colors'
import Input from '../components/general/Input'
import { marginTop15 } from '../assets/commonStyles'
import Button from '../components/general/Button'

const WelcomeScreen = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={require('../assets/images/book.png')}
          style={styles.imgStyles}
        />
        <Text style={styles.welcomeTextStyles}>Welcome!</Text>
      </View>
      <View style={styles.loginWrapper}>
        <Input
          keyboardType={'default'}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder={'Enter Your Username'}
        />
        <Input
          keyboardType={'default'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder={'Enter Your Password'}
          secureTextEntry={true}
          wrapperStyles={marginTop15}
        />
        <Button
          bgColor={colors.bgColorSec}
          content={<Text style={styles.loginBtnTextStyles}>Login</Text>}
          wrapperStyles={marginTop15}
        />
      </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextStyles: {
    fontFamily: 'ms-regular',
    fontSize: 18,
    color: colors.textColorPri,
    marginTop: 20,
  },
  loginWrapper:{
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginBtnTextStyles: {
    fontFamily: 'ms-regular',
    fontSize: 14,
    color: colors.textColorSec,
  },
})
