
import { Pressable, Linking, Text, View, Image, ScrollView, Modal, Platform, BackHandler,ImageBackground } from 'react-native';
import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { useAudio } from '../../../audioContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home (){

    const navigation = useNavigation();

    const [optionM,setOptionM] = useState(false)
    const [optionS,setOptionS] = useState(false)
    const [optionC,setOptionC] = useState(false)
    const [M,setM] = useState(1)
    const [invi,setInvi] = useState(true)
    const [animaE,setAnimaE] =useState("fadeInLeft")
    const [animaD,setAnimaD] =useState("fadeInRight")
    const [animaM,setAnimaM] =useState("fadeInRight")
    const [VImg,setVImg] =useState()
    const [usuario, setUsuario] = useState(null);

    const { playSound,playSomBot,mutado,mutar } = useAudio();

    useEffect(() => {
        const carregarUsuario = async () => {
            try {
                const userSalvo = await AsyncStorage.getItem('usuarios');
                const usuarios = userSalvo ? JSON.parse(userSalvo) : [];
                
                if (usuarios.length > 0) {
                    setUsuario(usuarios[0]);
                }
            } catch (error) {
                console.log("Erro ao buscar usuário:", error);
            }
            playSound();
        };

        carregarUsuario();
    }, []);

    const territorio = (terri) => {
        playSomBot();
        setAnimaD("fadeOutLeft")
        setAnimaE("fadeOutRight")
        setTimeout(()=>{
            navigation.navigate(terri)
        },150)
    }

    const aparecer = () => {
        playSomBot();
        setAnimaM("fadeInRight")
        setTimeout(()=>{
            setOptionM(true)
        },150)
    }
    const modal = (objetivo) => {
        playSomBot();
        setTimeout( async ()=>{
            
            switch (objetivo){
                case "desaparecer": 
                    setAnimaM("fadeOutLeft")
                    setTimeout(()=>{
                        setOptionM(false)
                    },300)
                    break;

                case "desaparecerS": 
                    setOptionS(false)
                    break;

                case "desaparecerC": 
                    setOptionC(false)
                    break;
    
                case "conta":
                    setOptionC(true);
                    setOptionM(false);
                    break;

                case "sobre":
                    setOptionS(true)
                    setOptionM(false)
                    break;
                case "logout":
                    AsyncStorage.clear()
                    navigation.navigate('Inicio')
                    setOptionM(false)
                    break;
                
                case "map":
                    openMaps();
                    setOptionM(false)
                    break;
                case "ingresso":
                    ingre();
                    setOptionM(false)
                    break;
                
                case "fecha":
                    BackHandler.exitApp();
                    break;
            }
        },150)

        }


    const openMaps = () => {
        const latitude = -23.650872;
        const longitude = -46.623024;
        const label = 'Zoológico de São Paulo'

        const url = Platform.select({
            android: `geo:0,0?q=${latitude},${longitude}(${label})` 
        })
        
        Linking.openURL(url)
    }

    const ingre = () =>{
        const url = 'https://ingressos.zoologico.com.br'
        Linking.openURL(url)
    }

    const ico = [
        { foto: require('../../../assets/img/icons/M.png') },
        { foto: require('../../../assets/img/icons/F.png') },
        { foto: require('../../../assets/img/icons/leao.png') },
        { foto: require('../../../assets/img/icons/zebra.png') },
        { foto: require('../../../assets/img/icons/macaco.png') },
        { foto: require('../../../assets/img/icons/cap.png') },
        { foto: require('../../../assets/img/icons/elefante.png') },
        { foto: require('../../../assets/img/icons/girafa.png') },
        { foto: require('../../../assets/img/icons/oncaPintada.png') },
        { foto: require('../../../assets/img/icons/axolote.png') },
        { foto: require('../../../assets/img/icons/jacare.png') },

    ];

    return(

        <ImageBackground source={require('../../../assets/img/home/back.png')} resizeMode='cover' style={styles.container}>
            <ImageBackground style={styles.titulo} resizeMode='cover' source={require('../../../assets/img/home/proxPa.png')}>
            <View style={styles.bot}>
                    <Pressable onPress={() => {aparecer()}}><View><Image style={styles.menuBot} source={require('../../../assets/img/home/menu.png')}/></View></Pressable>
            </View>
            </ImageBackground>
            <View style={styles.botaoArea} >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Pressable onPress={ () => territorio('Terri1')}>
                <Animatable.View useNativeDriver={true} animation={animaD} duration={200}><Image style={styles.botao} source={require('../../../assets/img/home/t1.png')}></Image></Animatable.View>
                </Pressable>
                <Pressable onPress={ () => territorio('Terri2')}>
                <Animatable.View useNativeDriver={true} animation={animaE} duration={400}><Image style={styles.botao} source={require('../../../assets/img/home/t2.png')}></Image></Animatable.View>
                </Pressable>
                <Pressable onPress={ () => territorio('Terri3')}>
                <Animatable.View useNativeDriver={true} animation={animaD} duration={600}><Image style={styles.botao} source={require('../../../assets/img/home/t3.png')}></Image></Animatable.View>
                </Pressable>
                <Pressable onPress={ () => territorio('Terri4')}>
                <Animatable.View useNativeDriver={true} animation={animaE} duration={800}><Image style={styles.botao} source={require('../../../assets/img/home/t4.png')}></Image></Animatable.View>
                </Pressable>
                <Pressable onPress={ () => territorio('Terri5')}>
                <Animatable.View useNativeDriver={true} animation={animaD} duration={1000}><Image style={styles.botao} source={require('../../../assets/img/home/t5.png')}></Image></Animatable.View>
                </Pressable>
                <Pressable onPress={ () => territorio('Terri6')}>
                <Animatable.View useNativeDriver={true} animation={animaE} duration={1200}><Image style={styles.botao} source={require('../../../assets/img/home/t6.png')}></Image></Animatable.View>
                </Pressable>
            </ScrollView>
                
                <Modal animationType='fade' visible={optionM} transparent={invi} style={styles.modal}>
                        <Pressable onPress={()=>{modal("desaparecer")}} style={styles.modal}>
                        <View style={styles.box}>
                            <Pressable onPress={ () => modal("conta")}>
                                <Animatable.View animation={animaM} duration={300} delay={M*100} style={styles.boxTextView}>
                                    <Text style={styles.boxText}>Conta</Text>
                                </Animatable.View>
                            </Pressable>
                            <Pressable onPress={ () => modal("sobre")}>
                                <Animatable.View animation={animaM} duration={300} delay={M+1*100} style={styles.boxTextView}>
                                    <Text style={styles.boxText}>Sobre</Text>
                                </Animatable.View>
                            </Pressable>

                            <Pressable onPress={()=>modal("map")}>
                                <Animatable.View animation={animaM} duration={300} delay={M+2*100} style={styles.boxTextView}>
                                    <Text style={styles.boxText}>Local</Text>
                                </Animatable.View>
                            </Pressable>

                            <Pressable onPress={()=>modal("ingresso")}>
                                <Animatable.View animation={animaM} duration={300} delay={M+3*100} style={styles.boxTextView}>
                                    <Text style={styles.boxText}>Ingresso</Text>
                                </Animatable.View>
                            </Pressable>

                            <Pressable onPress={()=>modal("logout")}>
                                <Animatable.View animation={animaM} duration={300} delay={M+4*100} style={styles.boxTextView}>                                
                                    <Text style={styles.boxText}>Logout</Text>
                                </Animatable.View>
                            </Pressable>
                            <Pressable onPress={()=>{modal("fecha")}}>
                                <Animatable.View animation={animaM} duration={300} delay={M+6*100} style={styles.boxTextView}>
                                    <Text style={styles.boxText}>Fechar</Text>
                                </Animatable.View>
                            </Pressable>
                        </View>
                        <Pressable style={styles.V} onPress={mutar}>
                            <Image style={styles.VImg} source={mutado ? require('../../../assets/img/home/botV0.png') : require('../../../assets/img/home/botV1.png')}/>
                        </Pressable>
                        </Pressable>
                </Modal>
                    <Modal animationType='fade' visible={optionS} transparent={invi} style={styles.modal}>
                        <Pressable onPress={()=>{modal("desaparecerS")}} style={styles.modal}>
                            <View style={styles.BoxS}>
                                <Pressable>

                                    <View style={{ alignItems: 'center' }}>
                                        <Image style={styles.SImg} source={require('../../../assets/img/icon.png')}/>
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            <Text style={styles.SText}>ZooKids é um app educativo e interativo para crianças, com imagens e curiosidades sobre os animais do Zoológico de São Paulo. Com uma interface colorida, incentiva o aprendizado, a conservação e o respeito à vida selvagem.</Text>
                                        </ScrollView>
                                    </View>
                                </Pressable>
                            </View>
                        </Pressable>
                    </Modal>

                    <Modal animationType='fade' visible={optionC} transparent={invi} style={styles.modal}>
                        <Pressable onPress={()=>{modal("desaparecerC")}} style={styles.modal}>
                            <View style={styles.BoxC}>
                                <Pressable>
                                        <View style={{ alignItems: 'center'}}>
                                            {usuario && ico[parseInt(usuario.icone)] && (
                                                <Image style={styles.CImg} source={ico[usuario.icone].foto} />
                                            )}
                                            {usuario ? (
                                                <>
                                                    <Text style={styles.CText}>{usuario.nome}</Text>
                                                    <Text style={styles.CText}>{usuario.email}</Text>
                                                    <Text style={styles.CText}>{usuario.dataNasc}</Text>
                                                </>
                                            ) : (
                                                <Text style={styles.CText}>Carregando dados do usuário...</Text>
                                            )}
                                        </View>
                                </Pressable>
                            </View>
                        </Pressable>
                    </Modal>
        </View>
        </ImageBackground>
    );
}