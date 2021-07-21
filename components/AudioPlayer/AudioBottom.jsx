import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Animated,
} from 'react-native';

const pauseIcon = require('../../assets/icons/pause.png');
const playIcon = require('../../assets/icons/play.png');

const AudioBottomBar = (props) => {
  const { item, onPress, progress, isPlay, play, pause } = props;
  const translateY = React.useRef(new Animated.Value(200)).current;

  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.block}>
            <Image style={styles.image} source={item.preview} />
          </View>
          <View style={styles.center}>
            <Text style={{ fontSize: 20, color: 'white' }}>{item.title}</Text>
            <Text style={{ color: 'white' }}>{item.artist}</Text>
          </View>
          <View style={styles.block}>
            <TouchableOpacity onPress={() => (isPlay ? pause() : play())}>
              <View style={styles.circle}>
                {isPlay ? (
                  <Image style={styles.icon} source={pauseIcon} />
                ) : (
                  <Image style={styles.icon} source={playIcon} />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ ...styles.progress, backgroundColor: 'gray' }}></View>
          <View
            style={{ ...styles.progress, width: `${progress * 100}%` }}
          ></View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(0.8,0.8,0.8)',
    width: '100%',
    height: 65,
  },
  center: {
    alignItems: 'center',
  },
  block: {
    width: 60,
  },
  progress: {
    height: 5,
    width: '100%',
    backgroundColor: 'orange',
    position: 'absolute',
    top: 0,
  },
  duration: {
    color: 'white',
  },
  circle: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  icon: {
    height: 20,
    width: 20,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 20,
    borderRadius: 100,
  },
});

export default AudioBottomBar;
