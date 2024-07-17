import { StyleSheet, Pressable, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../assets/colors/colors';

export default function Switch( { switchStatus, setSwitchStatus } ) {
    return (
        <Pressable style={[styles.checkboxContainer, switchStatus ? styles.onWrapper : styles.offWrapper]} 
            onPress={() => setSwitchStatus(!switchStatus)}>
            <View style={[styles.switchStyles, switchStatus ? styles.onStyles : styles.offStyles]}></View>
        </Pressable>
    )
    
}

const styles = StyleSheet.create({
  checkboxContainer: {
    borderWidth: 1,
    width: 60,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    paddingHorizontal: 2,
  }, 
  switchStyles: {
    width: 25,
    height: 25,
    
    borderRadius: 50,
  },
  offWrapper: {
    alignItems: 'flex-start',
    borderColor: colors.border,
  },
  offStyles: {
    backgroundColor: colors.border,
  },
  onWrapper: {
    alignItems: 'flex-end',
    borderColor: colors.info,
  },
  onStyles: {
    backgroundColor: colors.info,
  },
})