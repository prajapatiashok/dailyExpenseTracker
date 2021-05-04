import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Context as AuthContext} from '../context/AuthContext';
import {Context as ExpenseContext} from '../context/ExpenseContext';

import BottomSheet from '../components/BottomSheet';
import ModalComponent from '../components/Modal';
import {colors} from '../constants/colors';
import HomeData from '../components/HomeData';
import {routes} from '../constants/routes';

const Home = ({navigation}) => {
  const {state, signOut} = useContext(AuthContext);
  const {
    state: {
      loading,
      apiDateValue,
      createExpenseResponse,
      updateExpenseResponse,
      dailyExpenses,
      isOperationSuccess,
    },
    apiDate,
    createExpense,
    getExpenseOfDay,
    deleteExpense,
    updateExpense,
  } = useContext(ExpenseContext);

  const [todayDate, setTodayDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate === undefined) {
      setShow(false);
      return null;
    }
    const currentDate = selectedDate || todayDate;
    setTodayDate(currentDate);
    setShow(false);
    apiDate(moment(selectedDate).format('YYYY-MM-DD'));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      apiDate(moment().format('YYYY-MM-DD'));
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getExpenseOfDay(apiDateValue, state.dispatchedUserData.token);
  }, [isOperationSuccess, apiDateValue]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <BottomSheet userState={state} signOut={signOut} />
        <Entypo
          name="line-graph"
          size={12}
          color={colors.ORANGE}
          style={styles.graphIcon}
          onPress={() => navigation.navigate(routes.REPORTSCREEN)}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.dateWrapper}>
          <View>
            <Text style={styles.dateText}>
              {moment(todayDate).format('YYYY MMM-DD')}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setShow(true)}>
            <AntDesign
              name="calendar"
              size={18}
              color={colors.WHITE}
              style={styles.calenderIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 10, marginBottom: 80}}>
          <HomeData
            dailyExpenses={dailyExpenses}
            isloading={loading}
            deleteExpense={deleteExpense}
            updateExpense={updateExpense}
            userState={state}
            updateExpenseResponse={updateExpenseResponse}
            apiDateValue={apiDateValue}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.plusIcon}
        onPress={() => setModalVisible(true)}>
        <AntDesign name="pluscircle" size={34} color={colors.GOOGLE} />
      </TouchableOpacity>
      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        createExpense={createExpense}
        isLoading={loading}
        apiDateValue={apiDateValue}
        userState={state}
        createExpenseResponse={createExpenseResponse}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={todayDate}
          mode="date"
          display="spinner"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 18,
    flex: 1,
    backgroundColor: colors.LIGHT_ORANGE,
  },
  container: {
    paddingVertical: 20,
    flex: 20,
  },
  headerWrapper: {
    flex: 1.5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dateText: {
    color: colors.TAB_COLOR,
    fontSize: 25,
    fontWeight: 'bold',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 20,
    right: 18,
  },
  calenderIcon: {
    backgroundColor: colors.ORANGE,
    padding: 10,
    borderRadius: 10,
    elevation: 8,
  },
  graphIcon: {
    backgroundColor: colors.WHITE,
    padding: 10,
    borderRadius: 40,
    borderColor: colors.DARK_GREEN,
    borderWidth: 1,
    elevation: 8,
  },
});

export default Home;
