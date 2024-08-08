import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../assets/colors/colors'
import Button from '../general/Button'
import MiniButton from '../general/MiniButton'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import CustomModal from '../general/CustomModal'
import { borderBottomDark, flex1, justifyCenter, padding10 } from '../../assets/commonStyles'

const CollectionItem = ({itemData, handleFollowBtnPress, handleEditBtnPress, handleDeleteBtnPress}) => {

    const [showMenu, setShowMenu] = useState(false); 

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.leftWrapper}>
                <MaterialIcons name={itemData.icon} size={20} color={colors.textColorPri} />
                <Text style={styles.nameTextStyles} numberOfLines={2}>{itemData.name}</Text>
            </View>
            <View style={styles.rightWrapper}>
                <Button
                    bgColor={itemData.follow ? colors.bgColorTer : colors.bgColorSec}
                    content={
                        itemData.follow ? (
                            <Text style={[styles.followTextStyles, {color: colors.textColorPri}]}>Following</Text>
                        ) : (
                            <Text style={[styles.followTextStyles, {color: colors.textColorSec}]}>Follow</Text>
                        )
                    }
                    paddingStt={false}
                    wrapperStyles={{paddingHorizontal: 10, paddingVertical: 5}}
                    func={() => handleFollowBtnPress(itemData.id, !itemData.follow)}
                />
                <MiniButton
                    content={<Entypo name="dots-three-vertical" size={24} color={colors.textColorPri} />}
                    func={() => setShowMenu(true)}
                />
            </View>
            <CustomModal
                modalVisible={showMenu}
                setModalVisible={setShowMenu}
                wrapperStyles={{height: 150}}
            >
                <Text style={styles.menuTitleTextStyles} numberOfLines={2}>{itemData.name}</Text>
                <View style={[flex1, justifyCenter]}>
                    <TouchableOpacity 
                        style={[padding10, borderBottomDark]} 
                        onPress={() => {
                            setShowMenu(false);
                            handleEditBtnPress(itemData.id);
                        }}
                    >
                        <Text style={styles.menuTextStyles}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[padding10]} 
                        onPress={() => {
                            setShowMenu(false);
                            handleDeleteBtnPress(itemData.id);
                        }}
                    >
                        <Text style={styles.menuTextStyles}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        </TouchableOpacity>
    )
}

export default CollectionItem

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        marginBottom: 10,
        borderWidth: 0.2,
        borderColor: colors.border,
        borderRadius: 5,
        flexDirection: 'row',
    },
    leftWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
    },
    rightWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    nameTextStyles: {
        color: colors.textColorPri,
        fontFamily: 'ms-regular',
        fontSize: 14,
        paddingLeft: 10,
    },
    followTextStyles: {
        fontFamily: 'ms-regular',
        fontSize: 12,
    },
    menuTitleTextStyles: {
        backgroundColor: colors.gray,
        color: colors.textColorSec,
        fontFamily: 'ms-semibold',
        fontSize: 14,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        textAlign: 'center',
    },
    menuTextStyles: {
        color: colors.textColorSec,
        fontFamily: 'ms-regular',
        fontSize: 14,
        textAlign: 'center',
    },
    
})