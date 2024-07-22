import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { colors } from '../assets/colors/colors'
import LoadingScreen from './LoadingScreen'
import RuleSlider from '../components/app/RuleSlider'
import MiniButton from '../components/general/MiniButton'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { marginRight10 } from '../assets/commonStyles'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const hanldeDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  const hanldeNewQuote = () => {
    console.log('new quote');
  }

  const hanldeAddToFav = () => {
    console.log('fav');
  }

  if(loading){
    return <LoadingScreen />
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.menuBtnWrapper}>
        <MiniButton
          func={hanldeDrawer}
          content={<Entypo name="menu" size={24} color={colors.textColorPri} />}
          bgColor={colors.bgColorPri}
          btnStyles={true}
        />
      </View>
      <RuleSlider />
      <View style={styles.favBtnWrapper}>
        <MiniButton
          func={hanldeNewQuote}
          content={<Entypo name="plus" size={24} color={colors.textColorPri} />}
          bgColor={colors.bgColorPri}
          btnStyles={true}
          wrapperStyles={[marginRight10]}
        />
        <MiniButton
          func={hanldeAddToFav}
          content={<Entypo name="heart" size={24} color={colors.textColorPri} />}
          bgColor={colors.bgColorPri}
          btnStyles={true}
        />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.bgColorPri,
  },
  menuBtnWrapper:{
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
  },
  favBtnWrapper:{
    position: 'absolute',
    flexDirection: 'row',
    bottom: 15,
    right: 15,
    zIndex: 1,
  },
})