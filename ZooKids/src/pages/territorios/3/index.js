import { StatusBar } from 'expo-status-bar';
import { FlatList,Text, View,Image, Modal, Pressable, ImageBackground, ScrollView } from 'react-native';
import styles from './style.js';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useAudio } from '../../../../audioContext.js';

export default function Terri3 (){

    const navigation = useNavigation();

    const[aparecer,setAparecer] = useState(false)
    const[cont,setCont] =useState(0)
    const[animaT,setAnimaT] =useState("fadeInDownBig")
    const[animaR,setAnimaR] =useState('fadeInRightBig')
    const[animaL,setAnimaL] =useState('fadeInLeftBig')
    const { playSomBot } = useAudio();

    const { playSound } = useAudio();

    useEffect(() => {
    playSound();
    }, []);

    const puxa = (index) =>{
        playSomBot()
        setTimeout(()=>{
          setCont(index)
          setAparecer(true)
        },150)
      }
      const volta = (local) => {
        if(local=="T"){
          playSomBot();
          setTimeout(()=>{
            setAparecer(false)
          },150)
        }
        else if(local=="Home"){
          playSomBot();
          setAnimaL('fadeOutLeftBig');
          setAnimaR('fadeOutRightBig');
    
          setTimeout(()=>{
            navigation.navigate('Home')
          }, 100)
        }
      }

const animal = [
  {
    nome: 'Mamíferos do Cerrado',
    imagem: require('../../../../assets/img/t3/mamiferosCerrado.png'),
    imagemR: require('../../../../assets/img/t3/mamiferosCerradoR.png'),
    caracteristica: 'Características:\nEspécies adaptadas às condições abertas e semiáridas do Cerrado, com morfologias diversas.',
    reproducao: 'Reprodução:\nCiclos reprodutivos variados, com gestação adaptada às condições climáticas da região.',
    conservacao: 'Conservação:\nMuitos enfrentam risco por conta da expansão agrícola e degradação ambiental.',
    habitos: 'Hábitos:\nAtivos durante o dia, com hábitos que os capacitam a lidar com longos períodos de seca.',
  },
  {
    nome: 'Urso-de-óculos',
    imagem: require('../../../../assets/img/t3/ursoDeOculos.png'),
    imagemR: require('../../../../assets/img/t3/ursoDeOculosR.png'),
    caracteristica: 'Características:\nUrso de porte médio, nativo das florestas, com marcação característica ao redor dos olhos.',
    reproducao: 'Reprodução:\nReprodução lenta com longos períodos de gestação e cuidados parentais prolongados.',
    conservacao: 'Conservação:\nVulnerável, devido à perda de habitat e desmatamento das florestas.',
    habitos: 'Hábitos:\nPrincipalmente solitário, com hábitos que alternam entre períodos diurnos e noturnos.',
  },
  {
    nome: 'Dinossauros',
    imagem: require('../../../../assets/img/t3/dinossauros.png'),
    imagemR: require('../../../../assets/img/t3/dinossaurosR.png'),
    caracteristica: 'Características:\nAnimais pré-históricos, com grande diversidade de tamanhos e formas, estudados na paleontologia.',
    reproducao: 'Reprodução:\nMétodos reprodutivos estimados a partir de análogos aos répteis modernos.',
    conservacao: 'Conservação:\nExtintos há milhões de anos, mas fundamentais para o entendimento da evolução.',
    habitos: 'Hábitos:\nVariedade de hábitos, desde predadores ferozes a herbívoros pacíficos, conforme a espécie.',
  },
];

    return(
        <View style={styles.container}>
                <Animatable.View useNativeDriver={true} animation={animaT} duration={700} style={styles.tituloArea}>
                    <Pressable onPress={()=>volta("Home")}><Image style={styles.menuB} source={require('../../../../assets/img/t3/menuB.png')}/></Pressable>
                    <Image style={styles.titulo} source={require('../../../../assets/img/t3/titulo.png')}/>
                </Animatable.View>

                <ImageBackground style={styles.botArea} resizeMode='cover' source={require('../../../../assets/img/t3/back.png')}>
                    <FlatList 
                    data={animal} 
                    renderItem = {({item,index}) => {
                        const anima = index % 2 === 0 ? animaL : animaR;
                        return(
                        <Animatable.View useNativeDriver={true} animation={anima} duration={1000} delay={index*150} style = {styles.bot}><Pressable onPress={() => puxa(index)}><Image style={styles.botao} source={item.imagem}/></Pressable></Animatable.View>
                        )}}
                    keyExtractor={item => item.nome}
                    showsVerticalScrollIndicator={false}
                    />
                </ImageBackground>

                    <Modal style={styles.boxModal} visible={aparecer}>
                        <ImageBackground style={styles.boxModal} source={require('../../../../assets/img/t3/back.png')}>
                        <View style={styles.boxInModal}>
                          <Animatable.View><Image style={styles.imgRModal} source={animal[cont].imagemR}/></Animatable.View>
                            <Animatable.Text style={styles.tituModal}>{animal[cont].nome}</Animatable.Text>
                          <ScrollView style={styles.scrollInModal} showsVerticalScrollIndicator={false}>

                            <View style={styles.iconText}>
                              <Image source={require('../../../../assets/img/home/carac.png')} style={styles.icon}/>
                              <Animatable.Text style={styles.textModal}>{animal[cont].caracteristica}</Animatable.Text>
                            </View>
                            <View style={styles.iconText}>
                              <Image source={require('../../../../assets/img/home/repro.png')} style={styles.icon}/>
                              <Animatable.Text style={styles.textModal}>{animal[cont].reproducao}</Animatable.Text>
                            </View>
                            <View style={styles.iconText}>
                              <Image source={require('../../../../assets/img/home/conse.png')} style={styles.icon}/>
                              <Animatable.Text style={styles.textModal}>{animal[cont].conservacao}</Animatable.Text>
                            </View>
                            <View style={styles.iconText}>
                              <Image source={require('../../../../assets/img/home/habit.png')} style={styles.icon}/>
                              <Animatable.Text style={styles.textModal}>{animal[cont].habitos}</Animatable.Text>
                            </View>
                          </ScrollView>
                          </View>
                            <Pressable onPress={() => volta("T") }><Animatable.View animation="bounceIn"  duration={1000} ><Image style={styles.botaoModal} source={require('../../../../assets/img/t3/volta.png')}/></Animatable.View></Pressable>

                        </ImageBackground>

                    </Modal>
            <StatusBar style="auto"/>
        </View>

    );
}