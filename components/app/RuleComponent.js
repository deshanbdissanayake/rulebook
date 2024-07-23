import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'
import MiniButton from '../general/MiniButton'
import { marginRight10 } from '../../assets/commonStyles'
import { Entypo, Ionicons } from '@expo/vector-icons'

const RuleComponent = ({data}) => {
  
  const hanldeNewQuote = () => {
    console.log('new quote');
  }

  const hanldeAddToCollection = () => {
    console.log('new quote');
  }

  const hanldeAddToFavourites = () => {
    console.log('fav');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.ruleTextStyles}>{data.quote}</Text>
      <View style={styles.addBtnWrapper}>
        <MiniButton
          func={hanldeNewQuote}
          content={<Entypo name="plus" size={24} color={colors.textColorPri} />}
          bgColor={colors.bgColorPri}
          btnStyles={true}
        />
      </View>
      <View style={styles.favBtnWrapper}>
        <MiniButton
          func={hanldeAddToCollection}
          content={<Ionicons name="copy" size={24} color={colors.textColorPri} />}
          bgColor={colors.bgColorPri}
          btnStyles={true}
          wrapperStyles={[marginRight10]}
        />
        <MiniButton
          func={hanldeAddToFavourites}
          content={<Entypo name="heart" size={24} color={colors.textColorPri} />}
          bgColor={colors.bgColorPri}
          btnStyles={true}
        />
      </View>
    </View>
  )
}

export default RuleComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColorPri,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    ruleTextStyles: {
        fontSize: 24,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
        textAlign: 'center',
    },
    addBtnWrapper: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      zIndex: 1,
    },
    favBtnWrapper:{
      position: 'absolute',
      flexDirection: 'row',
      bottom: 20,
      right: 20,
      zIndex: 1,
    },
})