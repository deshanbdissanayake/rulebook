import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'

const RuleComponent = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.ruleTextStyles}>{data.quote}</Text>
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
})