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
  Alert,
  Image
} from 'react-native';
import { FontAwesome5, Ionicons } from 'react-native-vector-icons'; 

// Import your screens or components
import { colors } from '../assets/colors/colors';
import HomeNav from './HomeNav';
import { useAppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsNav from './SettingsNav';
import QuoteNav from './QuoteNav';
import CollectionNav from './CollectionNav';
import FavouritesNav from './FavouritesNav';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
            <Image
              source={require('../assets/images/logo_full_white.png')}
              style={styles.profileImageStyles}
            />
          </View>
          <View style={styles.profileTextWrapper}>
            <Text style={styles.profileText}>Hello Desh</Text>
          </View>
          <TouchableOpacity style={styles.drawerClose} onPress={closeDrawer} >
            <Ionicons name="close" size={24} color={colors.textColorPri} />
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
          labelStyle={{color: colors.textColorPri, fontFamily: 'ms-regular'}}
          onPress={handleLogoutClick}
          icon={({ size }) => (
            <Ionicons name="log-out-outline" size={size} color={colors.textColorPri} />
          )}
        />
        <View style={styles.devInfoTextWrapper}>
          <Text style={styles.devInfoTextStyles}>Developed by Desh</Text>
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
        drawerActiveTintColor: colors.textColorPri,
        drawerInactiveTintColor: colors.textColorPri,
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
        name="Quotes"
        component={QuoteNav}
        options={{
          drawerLabel: 'Quotes',
          drawerLabelStyle: { fontFamily: 'ms-regular' },
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      {/* <Drawer.Screen
        name="Collections"
        component={CollectionNav}
        options={{
          drawerLabel: 'Collections',
          drawerLabelStyle: { fontFamily: 'ms-regular' },
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'copy' : 'copy-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Favourites"
        component={FavouritesNav}
        options={{
          drawerLabel: 'Favourites',
          drawerLabelStyle: { fontFamily: 'ms-regular' },
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
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
      /> */}
    </Drawer.Navigator>
  );
};

export default DraverNav;

const styles = StyleSheet.create({
  drawerWrapper:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.bgColorPri,
    color: colors.textColorPri,
  },
  drawerTopWrapper:{
    flex: 11,
  },
  drawerBottomWrapper:{
    flex: 2,
    borderTopWidth: 1,
    borderTopColor: colors.textColorPri,
    margin: 10,
  },
  profileSection:{
    alignItems: 'center',
    paddingVertical: 5,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.textColorPri,
  },
  profileImageWrapper:{
    backgroundColor: colors.bgColor,
    paddingTop: 35,
    paddingBottom: 10,
    borderRadius: 50,
  },
  profileImageStyles: {
    width: 180,
    height: 40,
    resizeMode: 'contain',
  },
  profileTextWrapper:{
    marginBottom: 15,
  },
  profileText:{
    fontFamily: 'ms-semibold',
    fontSize: 18,
    color: colors.textColorPri,
    textAlign: 'center',
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
    color: colors.textColorPri,
  },
  versionTextStyles: {
    marginTop: 5,
    fontFamily: 'ms-light',
    fontSize: 8,
    color: colors.textColorPri,
  },
})