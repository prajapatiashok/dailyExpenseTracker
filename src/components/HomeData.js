import React, { useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {colors} from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalComponent from './Modal';

const HomeData = ({
  userState,
  dailyExpenses,
  isloading,
  deleteExpense,
  updateExpense,
  updateExpenseResponse,
}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState({
    desc: '',
    amount: '',
    id: '',
  });

  const onPressDelete = id =>
    Alert.alert('', 'Are you sure?', [
      {
        text: 'NO',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => deleteExpense(id, userState.dispatchedUserData.token),
      },
    ]);

  const onPressEdit = (desc, amount, id) => {
    setValue({
      desc,
      amount,
      id,
    });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertext}>Expenses</Text>
        <Text style={styles.totalExpenseText}>Rs {dailyExpenses.totalDayExpense}</Text>
      </View>
      {isloading ? (
        <ActivityIndicator
          size="large"
          color={colors.DARK_GREEN}
          style={{marginTop: 150}}
        />
      ) : (
        <View style={{marginTop: 12}}>
          {dailyExpenses?.overallData?.length === 0 ? (
            <Text style={styles.noRecord}>No records found!!!</Text>
          ) : (
            <FlatList
              data={dailyExpenses.overallData}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item._id}
              renderItem={({item}) => {
                return (
                  <View style={styles.expenseContainer}>
                    <View>
                      <Text style={styles.desc}>{item.description}</Text>
                      <Text style={styles.amount}>Rs {item.amount}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      <AntDesign
                        name="edit"
                        size={16}
                        color={colors.WHITE}
                        style={styles.icon}
                        onPress={() =>
                          onPressEdit(item.description, item.amount, item._id)
                        }
                      />
                      <AntDesign
                        name="delete"
                        size={16}
                        color={colors.LIGHT_ORANGE}
                        style={styles.icon}
                        onPress={() => onPressDelete(item._id)}
                      />
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      )}

      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        dataToEdit={value}
        isFromUpdate={true}
        updateExpense={updateExpense}
        updateExpenseResponse={updateExpenseResponse}
        isLoading={isloading}
        userState={userState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headertext: {
    fontSize: 20,
    color: colors.DARK_GREEN,
    fontStyle: 'normal'
  },
  totalExpenseText: {
    fontSize: 20,
    color: colors.GOOGLE,
    fontWeight: 'bold',
  },
  header: {
    borderBottomColor: colors.DARK_GREEN,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10
  },
  expenseContainer: {
    backgroundColor: colors.WHITE,
    margin: 5,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: colors.ORANGE,
    borderRadius: 50,
  },
  desc: {
    fontSize: 17,
    color: colors.BOLDBLACK,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 15,
    color: colors.DARK_GREY,
  },
  noRecord: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.GOOGLE,
    marginTop: 150
  }
});

export default HomeData;
