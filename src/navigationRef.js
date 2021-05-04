import { CommonActions } from '@react-navigation/native';
let navigator;

// This function needs to pass to the main component by ref in-order to 
//use the below navigate()
export const setNavigator = nav => {
    navigator = nav;
}

//This function can be used to navigate to any screen
export const navigate = ( routeName, params ) => {
    navigator.dispatch(
        CommonActions.navigate({
            name: routeName,
            params: params
        })
    );
};