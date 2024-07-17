import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'

const MiniButton = ({bgColor, func, content, paddingStt = true, btnStyles = false}) => {
  return (
    <TouchableOpacity onPress={func}>
        <View style={[styles.miniButtonStyles, btnStyles ? styles.borderStyles : paddingStt ? styles.paddingStyles : null, {backgroundColor: bgColor}]}>
            {content}
        </View>
    </TouchableOpacity>
  )
}

export default MiniButton

const styles = StyleSheet.create({
    miniButtonStyles: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
    paddingStyles: {
      padding: 5,
      width: 40,
      height: 40,
    },
    borderStyles: {
      borderWidth: 1, 
      borderColor: colors.border, 
      borderRadius: 10, 
      height: 50,
      width: 50,
    },
})