import { createContext, useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [backgroundSound, setBackgroundSound] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);

  // Configuração inicial do áudio
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  const startBackgroundMusic = async () => {
    try {
      if (backgroundSound) {
        await backgroundSound.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        require('./assets/music/back.mp3'),
        { 
          shouldPlay: true, 
          isLooping: true,
          volume: 0
        }
      );

      setBackgroundSound(sound);
    } catch (e) {
      console.error('Erro ao iniciar música de fundo:', e);
    }
  };

  const stopBackgroundMusic = async () => {
    try {
      if (backgroundSound) {
        await backgroundSound.stopAsync();
        await backgroundSound.unloadAsync();
        setBackgroundSound(null);
      }
    } catch (e) {
      console.error('Erro ao parar música de fundo:', e);
    }
  };

  const pauseBackgroundMusic = async () => {
    try {
      if (backgroundSound) {
        await backgroundSound.pauseAsync();
      }
    } catch (e) {
      console.error('Erro ao pausar música de fundo:', e);
    }
  };

  const resumeBackgroundMusic = async () => {
    try {
      if (backgroundSound) {
        await backgroundSound.playAsync();
      }
    } catch (e) {
      console.error('Erro ao retomar música de fundo:', e);
    }
  };

  // Short authored CC0 effects replace missing originals.
  const playEffect = async source => {
    setUserInteracted(true);
    try {
      const { sound } = await Audio.Sound.createAsync(source, { shouldPlay: true, volume: 0.25 });
      sound.setOnPlaybackStatusUpdate(status => { if (status.didJustFinish) sound.unloadAsync(); });
    } catch { /* Optional effect: navigation remains available if audio is unavailable. */ }
  };
  const playSomBot = () => playEffect(require('./assets/music/botao.wav'));
  const playSomBotCode = () => playEffect(require('./assets/music/botCode.wav'));

  // Limpeza ao desmontar
  useEffect(() => {
    return () => {
      if (backgroundSound) {
        backgroundSound.unloadAsync();
      }
    };
  }, [backgroundSound]);

  return (
    <AudioContext.Provider
      value={{
        startBackgroundMusic,
        stopBackgroundMusic,
        pauseBackgroundMusic,
        resumeBackgroundMusic,
        playSomBot,
        playSomBotCode,
        userInteracted,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};