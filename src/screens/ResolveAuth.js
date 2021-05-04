import {useEffect, useContext} from 'react';
import {
    GoogleSignin,
  } from '@react-native-community/google-signin';
import {Context as AuthContext} from '../context/AuthContext';

//Renders at first on app starts up
const ResolveAuthScreen = () => {
  const {tryLocalSignIn} = useContext(AuthContext);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        'XXXXXXXXXxxxXXXX.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, []);

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return null;
};

export default ResolveAuthScreen;
