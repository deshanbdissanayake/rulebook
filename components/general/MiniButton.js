import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'

const MiniButton = ({bgColor, func, content, paddingStt = true, btnStyles = false, wrapperStyles = []}) => {
  return (
    <TouchableOpacity onPress={func} style={wrapperStyles}>
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
      borderWidth: 0.3, 
      borderColor: colors.border, 
      borderRadius: 5, 
      height: 45,
      width: 45,
    },
})