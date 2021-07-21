import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';

const AudioModal = ({ item, visible, close, duration }) => {
  const { title, artist, preview } = item;

  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.header}>
        <TouchableOpacity onPress={close}>
          <Text style={{ fontSize: 20 }}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Image style={{ width: 300, height: 300 }} source={{ ...preview }} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: 300 }}>
          <Text style={{ fontSize: 20 }}>{title}</Text>
          <Text>{artist}</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 50,
        }}
      >
        <View
          style={{ height: 5, backgroundColor: 'orange', width: 300 }}
        ></View>
      </View>

      <View>
        <Text>{duration}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity>
          <Text style={{ padding: 30 }}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ padding: 30 }}>{'||'}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ padding: 30 }}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
});

export default AudioModal;
