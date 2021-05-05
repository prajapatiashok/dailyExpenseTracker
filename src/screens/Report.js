import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {colors} from '../constants/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import {months} from '../constants/months';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Context as ExpenseContext} from '../context/ExpenseContext';
import {Context as AuthContext} from '../context/AuthContext';
import StatData from '../components/StatData';
import {navigate} from '../navigationRef';
import {routes} from '../constants/routes';
import LineChart from '../components/LineChart';

const Report = () => {
  const {
    state: {dispatchedUserData},
  } = useContext(AuthContext);
  const {
    state: {monthlyExpenses, loading},
    getExpenseStat,
  } = useContext(ExpenseContext);
  const initialDate = moment(new Date()).format('MM');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialDate);

  //called at first and on each value change
  useEffect(() => {
    getExpenseStat(`2021-${value}`, dispatchedUserData.token);
  }, [value]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <AntDesign
          name="arrowleft"
          color="green"
          size={25}
          onPress={() => navigate(routes.HOMESCREEN)}
        />
        <Text style={styles.header}>Statistics</Text>
        <View />
      </View>
      <View style={styles.statWrapper}>
        <View>
          <DropDownPicker
            open={open}
            value={value}
            items={months}
            setValue={setValue}
            setOpen={setOpen}
            containerStyle={styles.dropDownContainerStyles}
            style={styles.dropDownStyles}
          />
        </View>
        <View>
          <Text style={styles.totaltext}>
            Total: Rs. {monthlyExpenses.totalMonthExpense}
          </Text>
        </View>
      </View>
      <View style={styles.statDataWrapper}>
        {monthlyExpenses?.data?.length === 0 ? (
          <Text style={styles.noRecord}>No records found!!!</Text>
        ) : (
          <>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={colors.DARK_GREEN}
                style={{marginTop: 150}}
              />
            ) : (
              <>
                <View style={styles.chartContainer}>
                  <LineChart lineData={monthlyExpenses.data} />
                </View>
                <View style={styles.listContainer}>
                  <StatData monthlyExpenses={monthlyExpenses} />
                </View>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 22,
    flex: 1,
    backgroundColor: colors.LIGHT_ORANGE,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  statWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 8,
    flex: 1,
  },
  statDataWrapper:{
    flex: 15
  },
  chartContainer: {
    flex: 2.5,
  },
  listContainer: {
    flex: 6,
    marginTop: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.WHITE,
    alignSelf: 'center',
    backgroundColor: colors.ORANGE,
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 10,
  },
  totaltext: {
    fontSize: 18,
    color: colors.GOOGLE,
    fontWeight: 'bold',
  },
  dropDownStyles: {
    height: 35,
    width: 140,
    borderColor: colors.LIGHT_ORANGE,
    elevation: 2,
  },
  dropDownContainerStyles: {
    height: 35,
    width: 140,
  },
  noRecord: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.GOOGLE,
    marginTop: 150,
  },
});

export default Report;
