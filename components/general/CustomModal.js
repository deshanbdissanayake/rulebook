import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Modal, BackHandler, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import MiniButton from './MiniButton';
import { colors } from '../../assets/colors/colors';

const CustomModal = ({
  title,
  content,
  cancelButtonText = null,
  okButtonText,
  pressCancel = '',
  pressOk,
  pressClose,
  refresh
}) => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (pressClose !== '') {
        pressClose();
        return true;
      }
      return false;
    });
  
    return () => backHandler.remove();
  }, [pressClose]);

  return (
    <Modal
        visible={true}
        transparent={true}
    >
        <View style={styles.container}>
        {!refresh ? (
            <ScrollView contentContainerStyle={styles.contentWrapper}>
              <View style={styles.alertWrapper}>
                  <View style={styles.headerWrapper}>
                    <Text style={styles.titleStyles}>{title}</Text>
                    <MiniButton
                      content={<AntDesign name="close" size={18} color={colors.textDark} />}
                      func={pressClose}
                    />
                  </View>
                  <View style={styles.bodyWrapper}>
                    {content}
                  </View>
              </View>
              <View style={styles.footerWrapper}>
                  {pressCancel !== '' && (
                      <TouchableOpacity onPress={pressCancel} style={styles.cancelBtnStyles}>
                          <Text style={styles.cancelTextStyles}>{cancelButtonText}</Text>
                      </TouchableOpacity>
                  )}
                      <TouchableOpacity onPress={pressOk} style={[styles.okBtnStyles, !cancelButtonText && {borderBottomLeftRadius: 10}]}>
                      <Text style={styles.okTextStyles}>{okButtonText}</Text>
                      </TouchableOpacity>
              </View>
            </ScrollView>
        ) : (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator size={'large'} color={colors.primaryDark} />
            </View>
        )}
        

        </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    width: 300,
    zIndex: 2,
    alignSelf: 'center',
    top: '30%',
    overflow: 'scroll',
    maxHeight: 400,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  alertWrapper: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 5,
  },
  titleStyles: {
    fontFamily: 'ms-semibold',
    fontSize: 18,
    color: colors.textColorPri,
  },
  bodyWrapper: {
    marginTop: 5,
  },
  contentStyles: {
    fontFamily: 'ms-regular',
    fontSize: 14,
    color: colors.textColorPri,
  },
  footerWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.transparentDark,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cancelBtnStyles : {
    flex: 1,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelTextStyles: {
    fontFamily: 'ms-regular',
    fontSize: 12,
    color: colors.textColorPri,
    padding: 10,
  },
  okBtnStyles : {
    flex: 1,
    borderBottomRightRadius: 10,
    backgroundColor: colors.bgColorSec,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okTextStyles: {
    fontFamily: 'ms-regular',
    fontSize: 12,
    color: colors.textColorSec,
    padding: 10,
  },
  loadingWrapper:{
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});