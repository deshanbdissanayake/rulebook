import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'

const QuoteComponent = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.quoteTextStyles}>{data.quote}</Text>
      {
        (data.author && data.author != '') && (
          <Text style={styles.quoteAuthorTextStyles}>~ {data.author} ~</Text>
        )
      }
    </View>
  )
}

export default QuoteComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColorPri,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    quoteTextStyles: {
        fontSize: 24,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
        textAlign: 'center',
    },
    quoteAuthorTextStyles: {
        fontSize: 14,
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
        textAlign: 'center',
        marginTop: 10,
    },
})