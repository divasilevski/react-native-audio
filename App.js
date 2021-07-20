import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AudioList from './components/AudioPlayer/AudioList';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ height: 44 }}></View>
      <AudioList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
