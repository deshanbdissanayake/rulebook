import React from 'react';
import { Text, View, Image, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../assets/colors/colors';
import MiniButton from '../general/MiniButton';
import { textRegular14 } from '../../assets/commonStyles';

const BottomTabHeader = ({text = null}) => {
  const navigation = useNavigation();

  

  const handleNotificationClick = () => {
    navigation.navigate('Notification Screen')
  }

  return (
    <View>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <Image source={require('../../assets/images/logo_full_white.png')} style={styles.logoStyles} />
          <Text style={[textRegular14, {color: colors.textColorSec}]}>{text ? text : 'Home'}</Text>
        </View>
        <View style={styles.rightContainer}>
          <MiniButton
            content={<Ionicons name="notifications" size={24} color={colors.textColorSec} />}
            func={handleNotificationClick}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.bgColorSec,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 5,
  },
  logoStyles: {
    width: 150,
    height: 40,
    marginRight: 8,
    resizeMode: 'contain',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default BottomTabHeader;