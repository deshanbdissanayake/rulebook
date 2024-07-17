import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { FontAwesome5, Ionicons } from 'react-native-vector-icons'; 

// Import your screens or components
import { colors } from '../assets/colors/colors';
import HomeNav from './HomeNav';
import { useAppContext } from '../context/AppContext';
import { logOut } from '../assets/data/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsNav from './SettingsNav';

const Drawer = createDrawerNavigator();

// Custom drawer content component
const CustomDrawerContent = ({ navigation, state, descriptors }) => {

  const { setIsLoggedIn } = useAppContext();

  const closeDrawer = () => {
    navigation.closeDrawer();
  };

  const handleLogoutClick = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from the app ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => handleLogoutFunc(),
        },
      ]
    );
  };

  const handleLogoutFunc = async () => {
    AsyncStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.drawerWrapper}
    >
      {/* Profile Section */}
      <View style={styles.drawerTopWrapper}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageWrapper}>
            <FontAwesome5 name="user" size={50} color={colors.textColorPri} />
          </View>
          <View style={styles.profileTextWrapper}>
            <Text style={styles.profileText}>Hi Guest</Text>
            <Text style={styles.profilePhone}>0711500200</Text>
          </View>
          <TouchableOpacity style={styles.drawerClose} onPress={closeDrawer} >
            <Ionicons name="close" size={24} color={colors.textColorSec} />
          </TouchableOpacity>
        </View>

        {/* Drawer Items */}
        <DrawerItemList
          state={state}
          navigation={navigation}
          descriptors={descriptors}
        />
      </View>
      <View style={styles.drawerBottomWrapper}>
        <DrawerItem
          label="Logout"
          labelStyle={{color: colors.textColorSec, fontFamily: 'ms-regular'}}
          onPress={handleLogoutClick}
          icon={({ size }) => (
            <Ionicons name="log-out-outline" size={size} color={colors.textColorSec} />
          )}
        />
        <View style={styles.devInfoTextWrapper}>
          <Text style={styles.devInfoTextStyles}>Developed by Introps IT</Text>
          <Text style={styles.versionTextStyles}>V.1.0</Text>
        </View>
      </View>

    </DrawerContentScrollView>
  );
};

const DraverNav = () => {

  return (
    <Drawer.Navigator
      initialRouteName="Dash"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: colors.textColorTer,
        drawerInactiveTintColor: colors.textColorSec,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeNav}
        options={{
          drawerLabel: 'Home',
          drawerLabelStyle: { fontFamily: 'ms-regular' },
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsNav}
        options={{
          drawerLabel: 'Settings',
          drawerLabelStyle: { fontFamily: 'ms-regular' },
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'cog' : 'cog-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DraverNav;

const styles = StyleSheet.create({
  drawerWrapper:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.bgColorSec,
    color: colors.textColorSec,
  },
  drawerTopWrapper:{
    flex: 11,
  },
  drawerBottomWrapper:{
    flex: 2,
    borderTopWidth: 1,
    borderTopColor: colors.textColorTer,
    margin: 10,
  },
  profileSection:{
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.textColorTer,
    paddingVertical: 5,
    margin: 10,
  },
  profileImageWrapper:{
    backgroundColor: colors.bgColor,
    padding: 25,
    borderRadius: 50,
    margin: 10,
  },
  profileTextWrapper:{
    marginBottom: 5,
  },
  profileText:{
    fontFamily: 'ms-bold',
    fontSize: 18,
    color: colors.textColorSec,
    textAlign: 'center',
  },
  profilePhone:{
    fontSize: 12,
    color: colors.textColorSec,
    textAlign: 'center',
    fontFamily: 'ms-regular',
  },
  drawerClose:{
    position: 'absolute',
    top: 0,
    right: 0,
  },
  devInfoTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'white',
    paddingTop: 15,
  },
  devInfoTextStyles: {
    fontFamily: 'ms-light',
    fontSize: 10,
    color: colors.textColorSec,
  },
  versionTextStyles: {
    marginTop: 5,
    fontFamily: 'ms-light',
    fontSize: 8,
    color: colors.textColorSec,
  },
})