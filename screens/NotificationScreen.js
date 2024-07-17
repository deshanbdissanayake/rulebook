import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../components/general/Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { colors } from '../assets/colors/colors'
import { Foundation, FontAwesome6, Ionicons } from '@expo/vector-icons';
import MiniButton from '../components/general/MiniButton'
import { getAllNotificationsByUserId, markAsRead } from '../assets/data/notifications'
import LoadingScreen from './LoadingScreen'
import NoData from '../components/general/NoData'
import { container, marginTop5, textAlignJustify, textLight12, textRegular12, textSemiBold12 } from '../assets/commonStyles'

const NotificationCard = ({cardData}) => {
    const [showAll, setShowAll] = useState(false);

    const { type, title, desc, dateTime, readStatus } = cardData;

    let bgColor;
    if(!readStatus){
        bgColor = colors.bgColorTer;
    }

    let icon = <Ionicons name="notifications-circle-outline" size={24} color={colors.textColorPri} />
    if(type == 'alert'){
        icon = <Foundation name="alert" size={24} color={colors.textColorPri} />
    }else if(type == 'order'){
        icon = <FontAwesome6 name="cart-shopping" size={18} color={colors.textColorPri} />
    }

    return (
        <View style={[styles.cardWrapper, {backgroundColor: bgColor}]}>
            <View style={styles.cardLeftWrapper}>
                {icon}
            </View>
            <View style={styles.cardRightWrapper}>
                <Pressable onPress={() => setShowAll(!showAll)}>
                    <Text style={[textSemiBold12]}>{title}</Text>
                    <Text style={[textRegular12, marginTop5, textAlignJustify]} numberOfLines={showAll ? null : 2}>{desc}</Text>
                    <Text style={[textLight12, marginTop5]}>{dateTime}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const NotificationScreen = () => {
    const navigation = useNavigation();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleGoBack = () => {
        navigation.goBack();
    }

    const getData = async () => {
        try {
            let res = await getAllNotificationsByUserId()
            setNotifications(res);
        } catch (error) {
            console.error('error at notification screen getting notifications: ', error)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(()=> {
            getData();
        },[])
    )

    const handleMarkAllRead = ({n_id}) => {
        Alert.alert('Confirm', 'Do you want to mark all notification as Read ?', [
            {text: 'Cancel', onPress: () => null, style: 'cancel'},
            {text: 'Mark as Read', onPress: () => markAsReadFunc(n_id)}
        ])
    }

    const markAsReadFunc = async (n_id) => {
        try {
            let res = await markAsRead(n_id);
            if(res.stt == 'success'){
                Alert.alert('Successful', res.msg)
            }else{
                Alert.alert('Error', res.msg)
            }
        } catch (error) {
            console.error('error at notification screen marking as read: ', error)
        }
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={container}>
            <Header 
                text={'Notifications'} 
                handleGoBack={handleGoBack} 
                component={
                    <MiniButton
                        content={<FontAwesome6 name="list-check" size={20} color={colors.textColorPri} />}
                        func={() => handleMarkAllRead('all')}
                    /> 
                } 
            />
            {notifications && notifications.length > 0 ? (
                <FlatList
                    data={notifications}
                    renderItem={({item}) => <NotificationCard cardData={item} />}
                    keyExtractor={(item) => item.n_id}
                />
            ) : (
                <NoData/>
            )}
            
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingRight: 15,
        borderRadius: 10,
        marginBottom: 2,
    },
    cardLeftWrapper: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardRightWrapper: {
        flex: 10,
    },
})