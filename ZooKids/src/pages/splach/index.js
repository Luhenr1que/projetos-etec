import { View, Image, ActivityIndicator} from 'react-native';
import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useEffect} from 'react';
import AsyncStorage from '../../../storage';
import { useAudio } from '../../../audioContext';

export default function Splach() {
  const navigation = useNavigation();
    const { playSound } = useAudio();

  useEffect(() => {
    playSound();
    setTimeout(() => {
      valida();
    }, 3500);
  }, []);

  const autoLog = async () => {
    try {
      const salvo = await AsyncStorage.getItem('usuarios');
      const log = await AsyncStorage.getItem('login');

      const salvoA = salvo ? JSON.parse(salvo) : [];
      const logAArray = log ? JSON.parse(log) : [];

      const logA = Array.isArray(logAArray) ? logAArray[0] : {};

      const emailDigitado = logA.email?.trim().toLowerCase() || '';
      const senhaDigitada = String(logA.senha || '').trim();

      const logado = salvoA.some((usuario) => {
        const emailUsuario = usuario.email?.trim().toLowerCase() || '';
        const senhaUsuario = String(usuario.senha || '').trim();
        return emailUsuario === emailDigitado && senhaUsuario === senhaDigitada;
      });

      return logado;
    } catch (erro) {
      console.log("Erro ao validar:", erro);
      return false;
    }
  };

  const valida = async () => {
    const isLogado = await autoLog();

    if (!isLogado) {
      navigation.navigate('Inicio');
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
        <Image
          source={require('../../../assets/img/patinhasM.gif')}
          style={styles.gif}
        />
        <ActivityIndicator size='large' color='#f8e8d0' style={{ transform: [{ scale: 1.5 }] }}/>
    </View>
  );
}
