import { createContext, useContext, useEffect, useRef } from 'react';
const AudioContext = createContext();
export const useAudio = () => useContext(AudioContext);
export function AudioProvider({ children }) {
  const sound = useRef(null);
  useEffect(() => () => { sound.current?.pause(); }, []);
  const startBackgroundMusic = async () => {
    if (sound.current) return;
    const source = require('./assets/music/back.mp3');
    const audio = new Audio(typeof source === 'string' ? source : source.uri);
    audio.loop = true; audio.volume = 0; sound.current = audio;
    // The meditation tracks themselves start from explicit button presses.
  };
  const stopBackgroundMusic = async () => { sound.current?.pause(); sound.current = null; };
  const pauseBackgroundMusic = async () => sound.current?.pause();
  const resumeBackgroundMusic = async () => { try { await sound.current?.play(); } catch { /* Muted background is optional. */ } };
  const playEffect = async source => {
    const audio = new Audio(typeof source === 'string' ? source : source.uri);
    audio.volume = 0.25;
    try { await audio.play(); } catch { /* Optional effect; keep all controls functional. */ }
  };
  const playSomBot = () => playEffect(require('./assets/music/botao.wav'));
  const playSomBotCode = () => playEffect(require('./assets/music/botCode.wav'));
  return <AudioContext.Provider value={{ startBackgroundMusic, stopBackgroundMusic, pauseBackgroundMusic, resumeBackgroundMusic, playSomBot, playSomBotCode, userInteracted: true }}>{children}</AudioContext.Provider>;
}
