import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { routes } from '../constants/routes';
import HomeScreen from '../screens/Home';
import ReportScreen from '../screens/Report';

const Stack = createStackNavigator();

export const Home = () => (
  <Stack.Navigator initialRouteName={routes.HOMESCREEN}>
    <Stack.Screen
      name={routes.HOMESCREEN}
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.REPORTSCREEN}
      component={ReportScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
