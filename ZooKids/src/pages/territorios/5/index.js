import { StatusBar } from 'expo-status-bar';
import { FlatList,Text, View,Image, Modal, Pressable, ImageBackground, ScrollView } from 'react-native';
import styles from './style.js';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useAudio } from '../../../../audioContext.js';

export default function Terri5 (){

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


const animal = [{
    nome: 'Águias',
    imagem: require('../../../../assets/img/t5/aguias.png'),
    imagemR: require('../../../../assets/img/t5/aguiasR.png'),
    caracteristica: 'Características:\nGrandes aves de rapina com visão aguçada e garras potentes para captura de presas.',
    reproducao: 'Reprodução:\nConstroem ninhos em locais elevados, com incubação de 35 a 45 dias.',
    conservacao: 'Conservação:\nAlgumas espécies são ameaçadas pela redução de habitat e poluição.',
    habitos: 'Hábitos:\nDiurnas, sobrevoando grandes áreas para caçar com precisão.',
  },
  {
    nome: 'Corujas',
    imagem: require('../../../../assets/img/t5/corujas.png'),
    imagemR: require('../../../../assets/img/t5/corujasR.png'),
    caracteristica: 'Características:\nAves de rapina noturnas, com audição aguçada e visão adaptada à escuridão.',
    reproducao: 'Reprodução:\nNinhos em cavidades ou árvores, com incubação de 30 a 35 dias.',
    conservacao: 'Conservação:\nEm declínio devido à degradação de habitat e sensibilidade ambiental.',
    habitos: 'Hábitos:\nPredadoras silenciosas e noturnas, caçando pequenos vertebrados.',
  },
  {
    nome: 'Gaviões',
    imagem: require('../../../../assets/img/t5/gavioes.png'),
    imagemR: require('../../../../assets/img/t5/gavioesR.png'),
    caracteristica: 'Características:\nAves de rapina de porte médio, com visão precisa e garras afiadas.',
    reproducao: 'Reprodução:\nAcasalamento monogâmico com criação compartilhada; incubação de 30 a 40 dias.',
    conservacao: 'Conservação:\nSofrem com a degradação ambiental e perda de áreas naturais.',
    habitos: 'Hábitos:\nDiurnos, sobrevoando áreas abertas e florestas em busca de presas.',
  },
  {
    nome: 'Harpia',
    imagem: require('../../../../assets/img/t5/harpia.png'),
    imagemR: require('../../../../assets/img/t5/harpiaR.png'),
    caracteristica: 'Características:\nUma das maiores águias, com garras poderosas e presença imponente na floresta.',
    reproducao: 'Reprodução:\nAcasalamento monogâmico com ninhos elevados e incubação de 50 a 55 dias.',
    conservacao: 'Conservação:\nAmeaçada pela perda de habitat e captura ilegal em algumas regiões.',
    habitos: 'Hábitos:\nDiurna e territorial, predadora de aves e pequenos mamíferos.',
  },
  {
    nome: 'Condor',
    imagem: require('../../../../assets/img/t5/condor.png'),
    imagemR: require('../../../../assets/img/t5/condorR.png'),
    caracteristica: 'Características:\nImponente ave de rapina com enorme envergadura, especializada em planagem.',
    reproducao: 'Reprodução:\nReprodução lenta com um único ovo e longos períodos de cuidado parental.',
    conservacao: 'Conservação:\nCriticamente ameaçado pela captura acidental e envenenamento em áreas de mineração.',
    habitos: 'Hábitos:\nSolitária, sobrevoando altitudes elevadas e se alimentando de carniça.',
  },
  {
    nome: 'Urubu-rei',
    imagem: require('../../../../assets/img/t5/urubuRei.png'),
    imagemR: require('../../../../assets/img/t5/urubuReiR.png'),
    caracteristica: 'Características:\nAve necrófaga de grande porte, com “coroa” distintiva e ampla envergadura.',
    reproducao: 'Reprodução:\nOvos incubados por 40 a 45 dias com cuidados parentais prolongados.',
    conservacao: 'Conservação:\nVulnerável devido à poluição e riscos de envenenamento acidental em áreas agrícolas.',
    habitos: 'Hábitos:\nVoa em altas altitudes e é fundamental para a limpeza do ecossistema.',
  },
];

    return(
      <View style={styles.container}>
              <Animatable.View useNativeDriver={true} animation={animaT} duration={700} style={styles.tituloArea}>
                  <Pressable onPress={()=>volta("Home")}><Image style={styles.menuB} source={require('../../../../assets/img/t5/menuB.png')}/></Pressable>
                  <Image style={styles.titulo} source={require('../../../../assets/img/t5/titulo.png')}/>
              </Animatable.View>

              <ImageBackground style={styles.botArea} resizeMode='cover' source={require('../../../../assets/img/t5/back.png')}>
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
                      <ImageBackground style={styles.boxModal} resizeMode='cover' source={require('../../../../assets/img/t5/back.png')}>
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
                          <Pressable onPress={() => volta("T") }><Animatable.View animation="bounceIn"  duration={1000} ><Image style={styles.botaoModal} source={require('../../../../assets/img/t5/volta.png')}/></Animatable.View></Pressable>

                      </ImageBackground>

                  </Modal>
          <StatusBar style="auto"/>
      </View>

  );
}