import React from 'react';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';

function millisToTime(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return (
    (minutes < 10 ? '0' : '') +
    minutes +
    ':' +
    (seconds < 10 ? '0' : '') +
    seconds
  );
}

export default function (initSource) {
  const [source, setSource] = React.useState(initSource);
  const [sound, setSound] = React.useState(null);
  const [duration, setDuration] = React.useState('00:00');
  const [position, setPosition] = React.useState('00:00');
  const [progress, setProgress] = React.useState(0);
  const [isPlay, setIsPlay] = React.useState(false);
  const [finishFunc, setFinishFunc] = React.useState(() => {});

  const play = async () => {
    if (!isPlay) {
      sound && (await sound.playAsync());
      setIsPlay(true);
    }
  };

  const pause = async () => {
    if (isPlay) {
      sound && (await sound.pauseAsync());
      setIsPlay(false);
    }
  };

  const playFromPosition = async (progress) => {
    if (sound) {
      const status = await sound.getStatusAsync();
      const millis = Math.ceil(status.durationMillis * progress);
      await sound.setPositionAsync(millis);
      calcPositionProgress();
    }
  };

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(source);
    const status = await sound.getStatusAsync();
    setDuration(millisToTime(status.durationMillis));
    setSound(sound);

    if (source.shouldPlay) {
      sound && (await sound.playAsync());
      setIsPlay(true);
    }
  };

  const unloadSound = async () => {
    setIsPlay(false);
    setPosition('00:00');
    setProgress(0);
    await sound.unloadAsync();
    setSound(null);
  };

  const calcPositionProgress = async () => {
    const status = await sound.getStatusAsync();
    setPosition(millisToTime(status.positionMillis));
    const progress = status.positionMillis / status.durationMillis;
    setProgress(progress);
    if (progress === 1) {
      pause();
      finishFunc();
    }
  };

  React.useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  React.useEffect(() => {
    sound && unloadSound();
    source && loadSound();
  }, [source]);

  React.useEffect(() => {
    if (isPlay) {
      const interval = setInterval(async () => {
        await calcPositionProgress();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlay]);

  return {
    isPlay,
    duration,
    setSource,
    play,
    pause,
    position,
    progress,
    playFromPosition,
    setFinishFunc,
  };
}
