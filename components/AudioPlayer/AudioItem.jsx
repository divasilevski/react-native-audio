import React, { useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

const AudioItem = ({ item, isPlay, selected, onSelect }) => {
  const { title, artist, preview } = item;
  const animValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [isPlay, animValue]);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onSelect}>
      <View style={[styles.item, selected && styles.play]}>
        <Image style={styles.image} source={preview} />
        {selected && isPlay && (
          <View style={styles.animation}>
            <View style={styles.animationContainer}>
              <Animated.View
                style={{
                  ...styles.box,
                  height: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 10],
                  }),
                }}
              ></Animated.View>
              <Animated.View
                style={{
                  ...styles.box,
                  height: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [5, 25],
                  }),
                }}
              ></Animated.View>
              <Animated.View
                style={{
                  ...styles.box,
                  height: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [25, 16],
                  }),
                }}
              ></Animated.View>
            </View>
          </View>
        )}
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
  },
  play: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
  },
  animation: {
    position: 'absolute',
    left: 22,
  },
  animationContainer: {
    flexDirection: 'row',
    height: 25,
    alignItems: 'flex-end',
  },
  box: {
    width: 6,
    backgroundColor: 'orange',
    marginHorizontal: 1,
  },
  image: {
    width: 50,
    height: 50,
    margin: 10,
  },
});

export default AudioItem;
