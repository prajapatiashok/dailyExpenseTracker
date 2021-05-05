import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import createDataContext from './createDataContext';
import {navigate} from '../navigationRef';
import {storage} from '../utils/storage';
import dailyExpense from '../api/dailyExpense';
import {routes} from '../constants/routes';
import {storageConstants} from '../constants/storageConstants';
import {types} from '../constants/types';

const authReducer = (state, action) => {
  switch (action.type) {
    case types.loading_true:
      return { ...state, loading: true };
    case types.loading_false:
      return { ...state, loading: false };
    case types.responseGoogleData:
      return {...state, dispatchedGoogleData: action.payload};
    case types.responseUserData:
      return {...state, dispatchedUserData: action.payload};
    case types.signout:
      return {...state, dispatchedGoogleData: {}, dispatchedUserData: {}};
    default:
      return state;
  }
};

//if the googleData and userData from the database is 
//exist in the system, this will redirect to the homepage
const tryLocalSignIn = dispatch => async () => {

  const googleLoginData = await storage.getData(
    storageConstants.GOOGLE_USER_DATA,
  );
  if (googleLoginData) {
    const userData = await storage.getData(storageConstants.USER_DATA);
    if (!userData) {
      navigate(routes.LOGINSCREEN);
    }
    const userInfo = JSON.parse(googleLoginData);
    dispatch({type: types.responseGoogleData, payload: userInfo});

    const parsedUserData = JSON.parse(userData);
    dispatch({type: types.responseUserData, payload: parsedUserData});
    navigate(routes.HOMESTACK, {screen: routes.HOMESCREEN});
  } else {
    navigate(routes.LOGINSCREEN);
  }
};

/** 
 *  API call to sign in 
 * 
 * @param {string} email userInfo.user.email (gmail of user)
 * @param {string} gmail_id userInfo.user.id (gmail_id of user)
 */
const signIn = async (dispatch, userInfo) => {
  try {
    const data = {
      email: userInfo.user.email,
      gmail_id: userInfo.user.id,
    };
    const response = await dailyExpense.post('users/login', data);
    if (response.status === 200) {
      await storage.storeData(
        storageConstants.USER_DATA,
        JSON.stringify(response.data),
      );
      dispatch({type: types.responseUserData, payload: response.data});
      navigate(routes.HOMESTACK, {screen: routes.HOMESCREEN});
      dispatch({type: types.loading_false});
    }
  } catch (e) {
    navigate(routes.AUTHSTACK, {screen: routes.LOGINSCREEN});
    console.log(e, 'from sign in');
  }
};

//sign up user to database if the user is not exist
const signUp = async (dispatch, userInfo) => {
  try {
    const data = {
      name: userInfo.user.name,
      email: userInfo.user.email,
      gmail_id: userInfo.user.id,
    };
    const response = await dailyExpense.post('users', data);
    if (response.status === 201) {
      const data = response.data;
      dispatch({type: types.responseUserData, payload: data});
      await storage.storeData(storageConstants.USER_DATA, JSON.stringify(data));
      navigate(routes.HOMESTACK, {screen: routes.HOMESCREEN});
      dispatch({type: types.loading_false});
    }
  } catch (e) {
    signIn(dispatch, userInfo);
  }
};

// Login with google
const googleSignIn = dispatch => async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    dispatch({type: types.loading_true});

    await storage.storeData(
      storageConstants.GOOGLE_USER_DATA,
      JSON.stringify(userInfo),
    );
    dispatch({type: types.responseGoogleData, payload: userInfo});
    signUp(dispatch, userInfo);
  } catch (error) {
    console.log('Message', error.message);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User Cancelled the Login Flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Signing In');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play Services Not Available or Outdated');
    } else {
      console.log('Some Other Error Happened');
    }
  }
};

//sign out the google login removing stored data
const signOut = dispatch => async () => {
  try {
    dispatch({type: types.loading_true});
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await storage.removeData(storageConstants.GOOGLE_USER_DATA);
    await storage.removeData(storageConstants.USER_DATA);
    dispatch({type: types.signout});
    navigate(routes.AUTHSTACK, { screen: routes.LOGINSCREEN})
    dispatch({type: types.loading_false});

  } catch (error) {
    console.error(error);
  }
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {tryLocalSignIn, googleSignIn, signOut},
  {dispatchedGoogleData: {}, dispatchedUserData: {}, loading: false},
);
