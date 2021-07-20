import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const AudioBottomBar = ({ item, onPress }) => {
  const { title, artist, id } = item;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{artist}</Text>
        <View style={styles.progress}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    backgroundColor: 'tomato',
    justifyContent: 'center',
    position: 'relative',
  },
  progress: {
    height: 5,
    width: '100%',
    backgroundColor: 'orange',
    position: 'absolute',
    top: 0,
  },
});

export default AudioBottomBar;
