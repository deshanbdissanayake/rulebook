import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import colors from '../../assets/colors/colors';
import Button from './Button';

const InputModal = ({
    title,
    subTitle,
    buttonText,
    buttonFunc,
    cancelText = null,
    setShowModal,
    inputFields,
    visible,
}) => {
    
    return (
        <Modal 
            transparent={true} 
            animationType="fade" 
            statusBarTranslucent={false} 
            visible={visible}
        >
            <KeyboardAvoidingView 
                style={styles.modalWrapper} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.modalContentWrapper}>
                    <ScrollView style={{ width: '100%' }}>
                        <Text style={styles.titleStyles}>{title}</Text>
                        <Text style={styles.subTitleStyles}>{subTitle}</Text>
                        <View style={styles.inputWrapper}>{inputFields}</View>
                        <View style={styles.buttonsWrapper}>
                            {cancelText && (
                                <View style={styles.buttonWrapper}>
                                    <Button
                                        bgColor={colors.danger}
                                        txtColor={colors.textLight}
                                        text={cancelText}
                                        func={() => setShowModal(false)}
                                    />
                                </View>
                            )}
                            <View style={styles.buttonWrapper}>
                                <Button
                                    bgColor={colors.primary}
                                    txtColor={colors.textLight}
                                    text={buttonText}
                                    func={buttonFunc}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default InputModal;

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentWrapper: {
        width: '80%',
        maxHeight: 350,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    titleStyles: {
        fontSize: 16,
        color: colors.textDark,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    subTitleStyles: {
        fontSize: 14,
        color: colors.textDark,
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    inputWrapper: {
        width: '100%',
        paddingHorizontal: 5,
    },
    buttonsWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
});