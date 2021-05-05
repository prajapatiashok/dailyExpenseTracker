import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';

const StatData = ({monthlyExpenses}) => {
  const sortedData = monthlyExpenses?.data?.sort((a,b)=>new Date(a.date) - new Date(b.date));

  return (
    <View style={styles.mainContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sortedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            const amount = item.amount;
            return (
              <View
                style={[
                  styles.statContainer,
                  amount > 5000
                    ? {backgroundColor: colors.GOOGLE}
                    : {backgroundColor: colors.LIGHT_GREEN},
                ]}>
                <Text
                  style={[
                    styles.date,
                    amount > 5000
                      ? {color: colors.WHITE}
                      : {color: colors.TAB_COLOR},
                  ]}>
                  Date: {item.date}
                </Text>
                <Text
                  style={[
                    styles.amountText,
                    amount > 5000
                      ? {color: colors.WHITE}
                      : {color: colors.TAB_COLOR},
                  ]}>
                  Rs. {item.amount}
                </Text>
              </View>
            );
          }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  statContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 10,
    justifyContent: 'space-between',
    elevation: 2
  },
  date: {
    fontSize: 15,
    color: colors.TAB_COLOR,
  },
  amountText: {
    fontSize: 15,
    color: colors.BOLDBLACK,
  }
});

export default StatData;
