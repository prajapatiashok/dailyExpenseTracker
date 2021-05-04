import moment from 'moment';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {colors} from '../constants/colors';

const Chart = ({lineData}) => {

  let months = ["00"];
  let finalData = [0];

  const sortedData = lineData?.sort((a,b)=>new Date(a.date) - new Date(b.date));
  sortedData?.map(e => {
    const utc = new Date(e.date).toUTCString();
    months.push(moment(utc).format('DD'));
    finalData.push(parseInt(e.amount));
  });
  const data = {
    labels: months,
    datasets: [
      {
        data: finalData,
      },
    ],
    legend: ['Expenses'],
  };

  const chartConfig = {
    backgroundColor: colors.BOLDBLACK,
    backgroundGradientFrom: colors.DARK_GREEN,
    backgroundGradientTo: colors.ORANGE,
    color: (opacity = 1) => colors.LIGHT_ORANGE,
    labelColor: (opacity = 1) => colors.WHITE,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      strokeWidth: '2',
      stroke: colors.TAB_COLOR,
    },
  };
  return (
    <View>
      {lineData?.length === 0 ? (
        null
      ) : (
        <LineChart
          data={data || []}
          width={Dimensions.get('window').width - 45}
          height={200}
          chartConfig={chartConfig}
          bezier
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Chart;
