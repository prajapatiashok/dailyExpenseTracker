import createDataContext from './createDataContext';
import dailyExpense from '../api/dailyExpense';
import {types} from '../constants/types';
import Toast from 'react-native-toast-message';
import {appTexts} from '../constants/appTexts';
import { navigate } from '../navigationRef';
import { routes } from '../constants/routes';

const expenseReducer = (state, action) => {
  switch (action.type) {
    case types.setAPIDate:
      return {...state, apiDateValue: action.payload};
    case types.loading_true:
      return {...state, loading: true};
    case types.loading_false:
      return {...state, loading: false};
    case types.createExpenseResponse:
      return {...state, createExpenseResponse: action.payload};
    case types.updateExpenseResponse:
      return {...state, updateExpenseResponse: action.payload};
    case types.DAY_EXPENSES:
      return {...state, dailyExpenses: action.payload};
    case types.MONTH_EXPENSES:
      return {...state, monthlyExpenses: action.payload }
    case types.IS_OPERATION_SUCCESS:
      return {...state, isOperationSuccess: !state.isOperationSuccess};
    default:
      return state;
  }
};

/**
 * 
 * @param {String} date set the selected date by user in state
 */

const apiDate = dispatch => async date => {
  try {
    dispatch({type: types.setAPIDate, payload: date});
  } catch (e) {
    console.log(e, '==> from api Date');
  }
};

/**
 * API call to create expense 
 * 
 * @param {Object} data Data of expense to create 
 * @param {String} token Authentication Token
 * 
 */
const createExpense = dispatch => async (data, token) => {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  try {
    dispatch({type: types.loading_true});
    const response = await dailyExpense.post('expenses', data, config);
    if (response.status === 201) {
      dispatch({type: types.createExpenseResponse, payload: response});
      dispatch({type: types.loading_false});
      dispatch({type: types.IS_OPERATION_SUCCESS});
      Toast.show({
        type: 'success',
        position: 'top',
        text1: appTexts.success,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  } catch (e) {
    console.log(e);
    dispatch({type: types.loading_false});
  }
};

/**
 * API call to retrieve expenses of a single day 
 * 
 * @param {String} date Date to get the expenses
 * @param {String} token Authentication Token
 * 
 */

const getExpenseOfDay = dispatch => async (date, token) => {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  try {
    dispatch({type: types.loading_true});
    const response = await dailyExpense.get(`expenses?date=${date}`, config);
    if (response.status === 200) {
      dispatch({type: types.DAY_EXPENSES, payload: response.data});
      dispatch({type: types.loading_false});
    }
  } catch (e) {
    navigate(routes.LOGINSCREEN, { screen: routes.LOGINSCREEN})
    console.log(e);
  }
};

/**
 * API call to retrieve expenses of a month 
 * 
 * @param {String} date Date to get the expenses stat of the month
 * @param {String} token Authentication Token
 * 
 */
const getExpenseStat = dispatch => async (date, token) => {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  try {
    dispatch({type: types.loading_true});
    const response = await dailyExpense.get(`expenses/stat?year_month=${date}`, config);

    if (response.status === 200) {
      dispatch({type: types.MONTH_EXPENSES, payload: response.data});
      dispatch({type: types.loading_false});
    }
    console.log(response.data)
  } catch (e) {
    console.log(e);
  }
};

/**
 * API call to update expense by its id
 * 
 * @param {String} id  object id of the expense
 * @param {String} data data to update
 * @param {String} token Authentication Token
 * 
 */
const updateExpense = dispatch => async (id, data, token) => {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  try {
    dispatch({type: types.loading_true});
    const response = await dailyExpense.patch(`expenses/${id}`, data, config);
    if (response.status === 200) {
      dispatch({type: types.updateExpenseResponse, payload: response});
      dispatch({type: types.loading_false});
      dispatch({type: types.IS_OPERATION_SUCCESS});
      Toast.show({
        type: 'success',
        position: 'top',
        text1: appTexts.update,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  } catch (e) {
    console.log(e);
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Something went wrong!!!',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }
};


/**
 * API call to delete expense by its id
 * 
 * @param {String} id  object id of the expense
 * @param {String} token Authentication Token
 * 
 */
const deleteExpense = dispatch => async (id, token) => {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  try {
    const response = await dailyExpense.delete(`expenses/${id}`, config);
    if (response.status === 200) {
      dispatch({type: types.IS_OPERATION_SUCCESS});
      Toast.show({
        type: 'info',
        position: 'top',
        text1: appTexts.delete,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  } catch (e) {
    console.log(e);
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Something went wrong!!!',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }
};

export const {Provider, Context} = createDataContext(
  expenseReducer,
  {apiDate, createExpense, getExpenseOfDay, deleteExpense, updateExpense, getExpenseStat},
  {
    apiDateValue: '',
    loading: false,
    isOperationSuccess: false,
    createExpenseResponse: {},
    updateExpenseResponse:{},
    dailyExpenses: {},
    monthlyExpenses: {}
  },
);
