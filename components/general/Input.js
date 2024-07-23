import { StyleSheet, TextInput, View, Pressable } from "react-native";
import React, { useRef } from "react";
import { colors } from "../../assets/colors/colors";

const Input = ({keyboardType, value, onChangeText, placeholder, secureTextEntry, icon, editable, multiline, textArea, maxLength, disabled, borderColor = colors.border, capitalize='sentences', center = false, wrapperStyles = []}) => {
    const inputRef = useRef(null);

    const handleInputWrapperClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    
    return (
        <Pressable onPress={handleInputWrapperClick} style={wrapperStyles}>
            <View 
                style={[
                    styles.inputWrapper, 
                    textArea ? { height: 120, alignItems: 'flex-start' } : {alignItems:'center'},
                    disabled && { backgroundColor: colors.disabled} ,
                    {borderColor: borderColor}
                ]}
            >
                {icon}
                <TextInput
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    style={[
                        styles.inputTextStyles, 
                        disabled && { color: colors.textColorPri, fontFamily: 'ms-light' },
                        center ? { textAlign: 'center' } : { marginLeft: 10 }
                    ]}
                    placeholderTextColor={colors.textColorPri}
                    editable={editable}
                    multiline={multiline}
                    maxLength={maxLength}
                    ref={inputRef}
                    autoCapitalize={capitalize}
                    autoCorrect={false}
                />
            </View>
        </Pressable>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputWrapper: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        overflow: 'scroll',
    },
    inputTextStyles: {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textColorPri,
        width: '100%',
    },
});