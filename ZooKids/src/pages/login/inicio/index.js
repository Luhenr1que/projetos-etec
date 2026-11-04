import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useState, useEffect } from 'react';
import styles from './style.js';
import { useAudio } from '../../../../audioContext.js';

export default function Inicio (){

    const [animaD,SetAnimaD] = useState('fadeInRightBig')
    const [animaE,SetAnimaE] = useState('fadeInLeftBig')
    const { playSound,playSomBot,mutado,mutar} = useAudio();

useEffect(() => {

  playSound
}, []);

        const navigation = useNavigation();
    
        const navigate = (index) => {
            playSomBot();
            SetAnimaD('fadeOutRightBig')
            SetAnimaE('fadeOutLeftBig')
            setTimeout(()=>{
                navigation.navigate(index)
            },150)
        }

    return(
        <ImageBackground resizeMode='cover' source={require('../../../../assets/img/incio/first/back.png')} style={styles.container}>
                <View style={styles.space1}></View>
                <Animatable.View style={styles.logo}>
                    <Animatable.Text style={styles.logoText}>Bem Vindo {'\n'} ao {'\n'} ZooKids!!!</Animatable.Text>
                </Animatable.View>
                <View style={styles.space2}></View>
                <Animatable.View style={styles.botArea}>
                    <Animatable.View animation={animaD}>
                        <Pressable onPress={() => navigate('Entrar')}>
                        <Image style={styles.botImg} source={require('../../../../assets/img/incio/first/entrar.png')}/>
                        </Pressable>
                    </Animatable.View>
                    <Animatable.View animation={animaE}> 
                        <Pressable onPress={() => navigate('Cadastrar')}>
                            <Image style={styles.botImg} source={require('../../../../assets/img/incio/first/cadastrar.png')}/>
                        </Pressable>
                    </Animatable.View>
                    <Pressable style={styles.V} onPress={mutar}>
                            <Image style={styles.VImg} source={mutado ? require('../../../../assets/img/home/botV0.png') : require('../../../../assets/img/home/botV1.png')}/>
                    </Pressable>
                    
                </Animatable.View>
            <StatusBar style="auto"/>
        </ImageBackground>
    );
}