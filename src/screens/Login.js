import React, {useContext} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';

import {Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../constants/colors';
import {appTexts} from '../constants/appTexts';

const Login = () => {
  const {googleSignIn, state} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Daily</Text>
        <Text style={styles.welcomeText2}>Expense</Text>
        <Text style={styles.welcomeText3}>Tracker</Text>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.loginText}>{appTexts.loginText}</Text>
        <Button
          icon={<AntDesign name="google" size={24} color={colors.GOOGLE} />}
          title={
            state.loading ? (
              <View>
                <ActivityIndicator
                  size="small"
                  color={colors.DARK_GREEN}
                  style={{paddingLeft: 20}}
                />
              </View>
            ) : (
              'Sign in with Google'
            )
          }
          disabled={state.loading}
          type="outline"
          onPress={() => googleSignIn()}
          titleStyle={{
            color: colors.TAB_COLOR,
            paddingLeft: 8,
          }}
          buttonStyle={{
            borderColor: colors.ORANGE,
            marginTop: 10,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT_ORANGE,
    paddingHorizontal: 18,
  },
  headerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.LIGHT_ORANGE,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 20,
    color: colors.TAB_TEXT_DIM,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  welcomeText2: {
    fontSize: 25,
    color: colors.DIMMED_TEXT,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  welcomeText3: {
    paddingTop: 5,
    fontSize: 35,
    color: colors.BOLDBLACK,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 14,
    color: colors.ORANGE,
    fontWeight: 'bold',
  },
  icon: {
    marginBottom: 30,
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Login;
