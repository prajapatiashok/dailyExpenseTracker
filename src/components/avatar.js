import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const Avatar = ({style, ...props}) => (
  <View style={styles.wrapper}>
    <Image style={{...styles.image, ...style}} {...props} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden'
  },
  image: {
    resizeMode: 'contain',
  },
});

export default Avatar
