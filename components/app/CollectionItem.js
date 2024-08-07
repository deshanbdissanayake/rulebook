import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors/colors'
import Button from '../general/Button'
import MiniButton from '../general/MiniButton'
import { Entypo, MaterialIcons } from '@expo/vector-icons'

const CollectionItem = ({itemData, handleFollowBtnPress}) => {
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
                        <Text style={[styles.followTextStyles, {color: colors.textColorPri}]}>following</Text>
                    ) : (
                        <Text style={[styles.followTextStyles, {color: colors.textColorSec}]}>follow</Text>
                    )
                }
                paddingStt={false}
                wrapperStyles={{paddingHorizontal: 10, paddingVertical: 5}}
                func={() => handleFollowBtnPress(itemData.id, !itemData.follow)}
            />
            <MiniButton
                content={<Entypo name="dots-three-vertical" size={24} color={colors.textColorPri} />}
            />
        </View>
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
})