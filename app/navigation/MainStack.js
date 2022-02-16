/** @format */

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import AboutUs from '@screens/AboutUs';
import ResetScreen from '../screens/ResetPassword';
import ChangeLanguage from '@screens/ChangeLanguage';
import ChangePassword from '@screens/ChangePassword';
import Setting from '@screens/Setting';
import ContactUs from '@screens/ContactUs';
import ThemeSetting from '@screens/ThemeSetting';
import ProfileEdit from '@screens/ProfileEdit';
import Package from '../screens/Package';

import { BottomTabNavigatorMazi, tabBarIcon } from './components';

const Stack = createStackNavigator();

export const WalletTabScreens = {
  HomeScreen: {
    component: HomeScreen,
    options: {
      title: 'home',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'home' }),
    },
  },
  ProfileScreen: {
    component: ProfileScreen,
    options: {
      title: 'account',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'cog' }),
    },
  },
};

export const WalletMenu = () => (
  <BottomTabNavigatorMazi tabScreens={WalletTabScreens} />
);

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={WalletMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AboutUs'
        component={AboutUs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ headerShown: false }}
        creenOptions={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name='ContactUs'
        component={ContactUs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ChangeLanguage'
        component={ChangeLanguage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ChangePassword'
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Setting'
        component={Setting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ProfileEdit'
        component={ProfileEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ThemeSetting'
        component={ThemeSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Package'
        component={Package}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
