import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Modal, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { colors } from '../../assets/colors/colors';
import { textRegular14 } from '../../assets/commonStyles';

const MultiSelect = ({ value, onSelect, placeholder, icon, options }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(null);

    useEffect(() => {
        if(value && value.length > 0 && options){
            setSelectedOptions(value);
        }
    }, []);

    const handleOptionSelect = (value) => {
        let selArr = Array.isArray(selectedOptions) ? [...selectedOptions] : [];
      
        const isSelected = selArr.includes(value);
      
        if (isSelected) {
          selArr = selArr.filter(option => option !== value);
        } else {
          selArr.push(value);
        }
      
        setSelectedOptions(selArr);
        onSelect(selArr);
      };
      
      
    const RenderDropdownItem = ({ item, index }) => {
        let selArr = Array.isArray(selectedOptions) ? [...selectedOptions] : [];
      
        const isSelected = selArr.includes(item.value);

        const itemStyles = [
            styles.optionStyles,
            isSelected && styles.selectedOptions
        ];

        return (
            <TouchableOpacity onPress={() => handleOptionSelect(item.value)} style={itemStyles}>
                <Text style={styles.optionTextStyles} numberOfLines={1}>
                    {item.label}
                </Text>
                {isSelected && (
                    <View style={styles.selectedCheckWrapper}>
                        <AntDesign name="checkcircle" size={24} color={colors.success} />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const closeModal = () => {
        setShowDropdown(false);
    };

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => setShowDropdown(true)}>
                <View style={styles.selectWrapper}>
                    <View style={styles.selectLeftWrapper}>
                        {icon}
                        <Text style={styles.selectText} numberOfLines={1}>
                            {selectedOptions ? `${selectedOptions.length} options selected` : placeholder}
                        </Text>
                    </View>
                    <View style={styles.selectRightWrapper}>
                        <Entypo name={showDropdown ? "chevron-up" : "chevron-down"} size={24} color={colors.border} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <Modal 
                visible={showDropdown} 
                transparent={true} 
                animationType="fade" 
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <ScrollView>
                                    {(options !== null && options.length > 0) ?
                                        options.map((option, index)=>(
                                            <RenderDropdownItem item={option} index={index} key={index} closeModal={closeModal}/>
                                        ))
                                    : (
                                        <RenderDropdownItem item={{value: 0, label: 'No Data'}} index={0} key={0} closeModal={closeModal}/>
                                    )}
                                </ScrollView>
                                <TouchableOpacity style={styles.doneBtnWrapper} onPress={closeModal}>
                                    <Text style={[textRegular14, {color: colors.textColorSec}]}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string
};

MultiSelect.defaultProps = {
  placeholder: 'Select options',
};

const styles = StyleSheet.create({
    selectWrapper: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectLeftWrapper: {
        flex: 11,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectRightWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectText: {
        fontSize: 14,
        fontFamily: 'ms-light',
        color: colors.textColorPri,
        width: '100%',
    },
    dropdownContainer: {
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 5,
    },
    optionStyles: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    selectedCheckWrapper: {
        marginLeft: 15,
    },
    optionTextStyles: {
        fontSize: 14,
        fontFamily: 'ms-light',
        color: colors.textColorPri,
    },
    selectedOptions: {
        borderRadius: 5,
        backgroundColor: colors.gray,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        maxHeight: 400,
        backgroundColor: colors.white,
        borderRadius: 5,
    },
    doneBtnWrapper: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgColorSec,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
});

export default MultiSelect;