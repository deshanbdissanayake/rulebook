import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { container, justifyCenter } from '../assets/commonStyles'

const SplashScreen = () => {
  return (
    <View style={[container, justifyCenter]}>
      <Image style={styles.imageStyles} source={require('../assets/images/logo_mini.png')} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  imageStyles: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
})