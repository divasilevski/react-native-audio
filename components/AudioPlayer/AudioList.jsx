import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { songs } from './mocks';
import AudioItem from './AudioItem';
import AudioBottomBar from './AudioBottomBar';
import AudioModal from './AudioModal';

import { Audio } from 'expo-av';

const AudioList = () => {
  const [sound, setSound] = React.useState();

  async function playSound(index) {
    const { sound } = await Audio.Sound.createAsync({
      uri: songs[index].url,
    });
    setSound(sound);
    const status = await sound.getStatusAsync();
    console.log(status);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  ////////////////////////////////////////////////

  const [selected, setSelected] = React.useState(null);
  const [modal, setModal] = React.useState(false);

  const onSelect = (index) => {
    sound && sound.pauseAsync();
    if (index === selected) index = null;
    setSelected(() => {
      playSound(index);
      return index;
    });
  };

  return (
    <>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <AudioItem
            item={item}
            isPlay={index === selected}
            onSelect={() => onSelect(index)}
          />
        )}
      />
      {selected !== null && (
        <AudioBottomBar
          item={songs[selected]}
          onPress={() => setModal(!modal)}
        />
      )}
      {selected !== null && (
        <AudioModal
          item={songs[selected]}
          visible={modal}
          close={() => setModal(!modal)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default AudioList;
