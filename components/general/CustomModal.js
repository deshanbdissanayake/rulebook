import { Modal, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../assets/colors/colors';

const CustomModal = ({modalVisible, setModalVisible, children, wrapperStyles={}}) => {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!showMenu);
        }}
        statusBarTranslucent={false} 
    >
        <View style={styles.centeredView}>
            <View style={[styles.modalView, wrapperStyles]}>
                <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.closeBtnStyles}>
                    <MaterialIcons name="close" color={colors.textColorSec} size={22} />
                </Pressable>
                {children}
            </View>
        </View>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalView: {
        backgroundColor: colors.bgColorSec,
        borderRadius: 10,
        alignItems: 'center',
        width: 250, 
        height: 200,
      },
      closeBtnStyles: {
        backgroundColor: colors.bgColorSec,
        padding: 6,
        borderRadius: 50,
        position: 'absolute',
        right: -10,
        top: -10,
        zIndex: 2,
      },
})