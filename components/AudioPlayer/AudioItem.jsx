import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';

const AudioItem = ({ item, isPlay, onSelect }) => {
  const { title, artist } = item;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onSelect}>
      <View style={styles.item}>
        <View style={styles.play}>
          <Text>{isPlay ? 'Stop' : 'Play'}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 20 }}>{title}</Text>
          <Text>{artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  play: {
    width: 50,
  },
});

export default AudioItem;
