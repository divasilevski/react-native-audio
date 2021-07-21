import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { songs } from './mocks';
import AudioItem from './AudioItem';
import AudioBottom from './AudioBottom';
import AudioModal from './AudioModal';

import useSound from '../../hooks/useSound';

const AudioList = () => {
  const { duration, setSource, play, pause, position, progress, isPlay } =
    useSound();

  const [selected, setSelected] = React.useState(null);
  const [modal, setModal] = React.useState(false);

  async function playSound(index) {
    setSource((index && { uri: songs[index].url }) || null);
  }

  const onSelect = (index) => {
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
            isPlay={isPlay}
            selected={index === selected}
            onSelect={() => onSelect(index)}
          />
        )}
      />
      {selected !== null && (
        <AudioBottom
          item={songs[selected]}
          progress={progress}
          onPress={() => setModal(!modal)}
          isPlay={isPlay}
          play={play}
          pause={pause}
        />
      )}
      {selected !== null && (
        <AudioModal
          item={songs[selected]}
          duration={duration}
          visible={modal}
          close={() => setModal(!modal)}
          progress={progress}
          position={position}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default AudioList;
