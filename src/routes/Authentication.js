import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { routes } from '../constants/routes';
import LoginScreen from '../screens/Login';
import ResolveAuthScreen from '../screens/ResolveAuth';

const Stack = createStackNavigator();

export const Authentication = () => (
  <Stack.Navigator initialRouteName={routes.RESOLVEAUTH}>
    <Stack.Screen
      name={routes.RESOLVEAUTH}
      component={ResolveAuthScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.LOGINSCREEN}
      component={LoginScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
