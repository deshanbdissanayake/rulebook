import { StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../assets/colors/colors';

export default function Checkbox( { size = 30, borderRadius = 5, iconSize = 15, pressFunc, pressed = false } ) {
  //to calculate minimum size according to icon size
  const minSize = iconSize*2;

  if(!pressed){
    return (
      <Pressable style={[styles.checkboxContainer, { backgroundColor: colors.bgColor, borderColor: colors.border, 
          width: size, height: size, minHeight: minSize, minWidth: minSize, borderRadius: borderRadius }]} 
        onPress={pressFunc}>
        <FontAwesome5 style={styles.iconStyles} name="times" size={iconSize} color={colors.textColorPri} />
      </Pressable>
    )
  }else{
    return (
      <Pressable style={[ styles.checkboxContainer, { backgroundColor: colors.bgColorSec, borderColor: colors.bgColorSec, 
        width: size, height: size, minHeight: minSize, minWidth: minSize, borderRadius: borderRadius }]} 
        onPress={pressFunc}>
          <FontAwesome5 style={styles.iconStyles} name="check" size={iconSize} color={colors.white} />
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  checkboxContainer: {
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})