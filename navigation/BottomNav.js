import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { colors } from '../assets/colors/colors';
import { TabBarProvider, useTabBarVisibility } from '../context/TabBarContext';
import HomeNav from './HomeNav';
import LoadingScreen from '../screens/LoadingScreen';
import SettingsNav from './SettingsNav';
import ProductNav from './ProductNav';
import OrderNav from './OrderNav';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarWrapper}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let icon;

        if (route.name === 'Home') {
            icon = <Entypo name="home" size={24} />;
        } else if (route.name === 'Products') {
            icon = <FontAwesome6 name="boxes-packing" size={24} />;
        } else if (route.name === 'Orders') {
            icon = <FontAwesome6 name="clipboard-list" size={24} />;
        } else if (route.name === 'Settings') {
            icon = <FontAwesome5 name="cog" size={24} />;
        }
        
        return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabBtnStyles]}
            >
              <View style={[{backgroundColor: isFocused ? colors.bgColorSec: null}, styles.tabItemWrapper]}>
                  <Text style={[{color: isFocused ? colors.textColorSec : colors.textColorPri}]}>{icon} </Text>
              </View>
            </TouchableOpacity>
          );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNav = () => {
  
  const { tabBarVisible } = useTabBarVisibility();

  return (
    <Tab.Navigator tabBar={tabBarVisible ? props => <MyTabBar {...props} /> : () => null}>
       <Tab.Screen 
          name="Home" 
          component={HomeNav} 
          options={{ headerShown: false }} 
        />
       <Tab.Screen 
          name="Products" 
          component={ProductNav} 
          options={{ headerShown: false }} 
        />
       <Tab.Screen 
          name="Orders" 
          component={OrderNav} 
          options={{ headerShown: false }} 
        />
       <Tab.Screen 
          name="Settings" 
          component={SettingsNav} 
          options={{ headerShown: false }} 
        />
      </Tab.Navigator>
  )
}

export default function BottomNav() {

  setTimeout(() => {
    return <LoadingScreen/>
  }, 3000);

  return (
    <TabBarProvider>
      <TabNav/>
    </TabBarProvider>
  );
}

const styles = StyleSheet.create({
    tabBarWrapper: { 
        flexDirection: 'row', 
        backgroundColor: colors.bgColorTer, 
    },
    tabItemWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
    },
    tabItemText: {
        textTransform: 'capitalize',
        fontSize: 10,
    }, 
    tabBtnStyles: { 
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        height: 60, 
    },
      
})