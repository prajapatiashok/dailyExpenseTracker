import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {setNavigator} from './navigationRef';

import {Home, Authentication} from './routes';
import {routes} from '../src/constants/routes';

import {Provider as AuthProvider} from './context/AuthContext';
import {Provider as ExpenseProvider} from './context/ExpenseContext';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer
      ref={navigator => {
        setNavigator(navigator);
      }}>
      <Stack.Navigator initialRouteName={routes.AUTHSTACK}>
        <Stack.Screen
          name={routes.AUTHSTACK}
          component={Authentication}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.HOMESTACK}
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <ExpenseProvider>
      <AuthProvider>
        <App />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </AuthProvider>
    </ExpenseProvider>
  );
};
