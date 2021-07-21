import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';

import Slider from '@react-native-community/slider';

const arrowIcon = require('../../assets/icons/arrow.png');
const closeIcon = require('../../assets/icons/close.png');
const blackPauseIcon = require('../../assets/icons/black-pause.png');
const blackPlayIcon = require('../../assets/icons/black-play.png');

const { width } = Dimensions.get('window');

const AudioModal = (props) => {
  const {
    item,
    visible,
    close,
    duration,
    progress,
    position,
    isPlay,
    pause,
    play,
    next,
    prev,
    playFromPosition,

    index,
    images,
  } = props;

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef(null);
  const [scrollIndex, setScrollIndex] = React.useState(index);

  React.useEffect(() => {
    scrollX.addListener(({ value }) => {
      const newIndex = Math.round(value / width);
      setScrollIndex(newIndex);
    });
    return () => scrollX.removeAllListeners();
  }, [scrollX]);

  React.useEffect(() => {
    if (scrollIndex > index) {
      next();
    } else if (scrollIndex < index) {
      prev();
    }
  }, [scrollIndex]);

  React.useEffect(() => {
    if (ref.current && index) {
      ref.current.scrollToIndex({ index });
    }
  }, [index]);

  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.header}>
        <TouchableOpacity onPress={close}>
          <View style={styles.button}>
            <Image style={styles.icon} source={closeIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          ref={ref}
          data={images}
          horizontal
          pagingEnabled
          initialScrollIndex={index}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={(_, index) => 'player-' + index}
          renderItem={({ item }) => (
            <View style={{ width: width, alignItems: 'center' }}>
              <Image style={{ width: 300, height: 300 }} source={item} />
            </View>
          )}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
      </View>

      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.artist}</Text>
        </View>

        <Slider
          style={styles.progress}
          minimumTrackTintColor="orange"
          maximumTrackTintColor="lightgray"
          onSlidingComplete={playFromPosition}
          thumbTintColor="black"
          value={progress}
        />

        <View style={styles.timing}>
          <Text style={styles.timingText}>{position}</Text>
          <Text style={styles.timingText}>{duration}</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={prev}>
            <View style={styles.button}>
              <Image style={styles.icon} source={arrowIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => (isPlay ? pause() : play())}>
            <View style={styles.button}>
              {isPlay ? (
                <Image style={styles.iconPlay} source={blackPauseIcon} />
              ) : (
                <Image style={styles.iconPlay} source={blackPlayIcon} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={next}>
            <View style={styles.button}>
              <Image style={[styles.icon, styles.next]} source={arrowIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    marginBottom: 20,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  container: {
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  title: {
    fontSize: 20,
  },
  progress: {
    marginHorizontal: -15,
    marginTop: 50,
  },
  timing: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timingText: {
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-evenly',
  },
  iconPlay: {
    width: 40,
    height: 40,
  },
  next: {
    transform: [{ rotate: '180deg' }],
  },
});

export default AudioModal;
