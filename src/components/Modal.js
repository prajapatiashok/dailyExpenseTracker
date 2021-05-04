import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-elements';
import {colors} from '../constants/colors';
import {appTexts} from '../constants/appTexts';

const ModalComponent = ({
  modalVisible,
  setModalVisible,
  createExpense,
  isLoading,
  apiDateValue,
  userState,
  createExpenseResponse,
  updateExpenseResponse,
  dataToEdit,
  isFromUpdate,
  updateExpense
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const onSubmitForm = async () => {
    const data = {
      description,
      amount,
      date: apiDateValue,
    };

    const updateData = {
      description,
      amount,
    }
    if (description === '') {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: appTexts.desc,
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else if (amount === '') {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: appTexts.amount,
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else {
      if(isFromUpdate){
        await updateExpense(dataToEdit.id, updateData, userState.dispatchedUserData.token);
      }else {
        await createExpense(data, userState.dispatchedUserData.token);
      }
    }
  };


  useEffect(() => {
    if(dataToEdit) {
      setDescription(dataToEdit.desc)
      setAmount(dataToEdit.amount)
    }
  },[dataToEdit])

  useEffect(() => {
    if (createExpenseResponse?.status === 201 || updateExpenseResponse?.status === 200 ) {
      setModalVisible(false);
      setDescription("")
      setAmount("")
    }
  }, [createExpenseResponse, updateExpenseResponse]);

  const onClosePress= () => {
    setModalVisible(false);
    setDescription("")
    setAmount("")
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={() => onClosePress()}
          style={styles.closeIcon}>
          <AntDesign name="closecircle" size={28} color={colors.WHITE} />
        </TouchableOpacity>
        <View style={styles.body}>
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
            placeholder=" Expense description"
          />
          <View style={{marginVertical: 10}} />
          <TextInput
            style={styles.input}
            onChangeText={setAmount}
            value={amount}
            placeholder="Amount"
            keyboardType="numeric"
          />
          <View style={{marginVertical: 30}} />

          <Button
            icon={
              <AntDesign name="doubleright" size={10} color={colors.WHITE} />
            }
            title={
              isLoading ? (
                <View>
                  <ActivityIndicator
                    size="small"
                    color={colors.WHITE}
                    style={{paddingLeft: 20}}
                  />
                </View>
              ) : isFromUpdate ? (
                'Update'
              ) : (
                'Submit'
              )
            }
            disabled={isLoading}
            type="solid"
            onPress={() => onSubmitForm()}
            titleStyle={{
              color: colors.WHITE,
              paddingLeft: 8,
            }}
            buttonStyle={{
              backgroundColor: colors.DARK_GREEN,
              marginHorizontal: 100,
              elevation: 1,
              borderRadius: 10,
              marginBottom: 10,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.ORANGE,
    marginHorizontal: 15,
    marginVertical: 80,
    flex: 1,
    borderRadius: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  body: {
    marginTop: 80,
  },
  input: {
    backgroundColor: colors.WHITE,
    marginHorizontal: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default ModalComponent;
