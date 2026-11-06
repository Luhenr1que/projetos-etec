import { createContext, useContext, useEffect, useRef, useState } from 'react';
const AudioContext = createContext();
export const useAudio = () => useContext(AudioContext);
export function AudioProvider({ children }) {
  const sound = useRef(null);
  const [mutado, setMutado] = useState(false);
  const [aviso, setAviso] = useState('');
  const interacted = useRef(false);
  const playSound = async () => {
    if (!interacted.current || !sound.current) return;
    try { await sound.current.play(); setAviso(''); }
    catch { setAviso('Áudio indisponível neste navegador. Você pode continuar sem som.'); }
  };
  useEffect(() => {
    const source = require('./assets/music/MusicPrincipalN.mp3');
    const audio = new Audio(typeof source === 'string' ? source : source.uri);
    audio.loop = true; audio.volume = 0.02; sound.current = audio;
    const unlock = () => { interacted.current = true; playSound(); };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => { window.removeEventListener('pointerdown', unlock); window.removeEventListener('keydown', unlock); audio.pause(); audio.src = ''; sound.current = null; };
  }, []);
  const playSomBot = async () => {
    const source = require('./assets/music/button.mp3');
    const audio = new Audio(typeof source === 'string' ? source : source.uri); audio.volume = 0.2;
    if (!mutado) { try { await audio.play(); } catch { setAviso('Efeito sonoro indisponível.'); } }
  };
  const mutar = () => { if (sound.current) sound.current.muted = !mutado; setMutado(!mutado); };
  return <AudioContext.Provider value={{ playSound, playSomBot, mutado, mutar }}>{aviso && <div role="status">{aviso}</div>}{children}</AudioContext.Provider>;
}
