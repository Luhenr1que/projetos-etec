import { StatusBar } from 'expo-status-bar';
import { FlatList,Text, View,Image, Modal, Pressable, ImageBackground, ScrollView } from 'react-native';
import styles from './style.js';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useAudio } from '../../../../audioContext.js';

export default function Terri6 (){

    const navigation = useNavigation();

    const[aparecer,setAparecer] = useState(false)
    const[cont,setCont] =useState(0)
    const[animaT,setAnimaT] =useState("fadeInDownBig")
    const[animaR,setAnimaR] =useState('fadeInRightBig')
    const[animaL,setAnimaL] =useState('fadeInLeftBig')
    const { playSomBot } = useAudio();

    const { playSound } = useAudio();

    useEffect(() => {
    playSound()
    }, [])

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
    nome: 'Lontra',
    imagem: require('../../../../assets/img/t6/lontra.png'),
    imagemR: require('../../../../assets/img/t6/lontraR.png'),
    caracteristica: 'Características:\nMamífero semi-aquático ágil, com pelagem densa e adaptado à vida nos rios.',
    reproducao: 'Reprodução:\nGestação de 2 a 3 meses, com ninhadas de 2 a 4 filhotes.',
    conservacao: 'Conservação:\nVulnerável em áreas com poluição hídrica e riscos de captura acidental.',
    habitos: 'Hábitos:\nSociável, vive em rios e lagos e apresenta comportamentos complexos de grupo.',
  },
  {
    nome: 'Chimpanzé',
    imagem: require('../../../../assets/img/t6/cimpaze.png'),
    imagemR: require('../../../../assets/img/t6/cimpazeR.png'),
    caracteristica: 'Características:\nPrimata altamente inteligente, com comportamento social complexo e comunicação sofisticada.',
    reproducao: 'Reprodução:\nGestação de cerca de 230 dias, geralmente com um filhote e intenso cuidado parental.',
    conservacao: 'Conservação:\nAmeaçado pela perda de habitat e pela caça ilegal para o comércio de animais.',
    habitos: 'Hábitos:\nVivem em grupos sociais e apresentam atividades diurnas com interações elaboradas.',
  },
  {
    nome: 'Orangotango',
    imagem: require('../../../../assets/img/t6/orangutango.png'),
    imagemR: require('../../../../assets/img/t6/orangutangoR.png'),
    caracteristica: 'Características:\nPrimata arborícola de longos braços, adaptado à vida nas florestas tropicais.',
    reproducao: 'Reprodução:\nGestação de 8 a 9 meses, geralmente com um único filhote por vez.',
    conservacao: 'Conservação:\nCriticamente ameaçado pela destruição de habitat e captura ilegal.',
    habitos: 'Hábitos:\nPrincipalmente solitário, com hábitos diurnos e vida intimamente ligada às árvores.',
  },
  {
    nome: 'Primatas Brasileiros',
    imagem: require('../../../../assets/img/t6/primatasBrasileiros.png'),
    imagemR: require('../../../../assets/img/t6/primatasBrasileirosR.png'),
    caracteristica: 'Características:\nDiversos primatas nativos do Brasil, com adaptações variadas a ecossistemas locais.',
    reproducao: 'Reprodução:\nVariável entre as espécies, geralmente com gestação de 4 a 8 meses.',
    conservacao: 'Conservação:\nMuitos estão ameaçados pela perda de habitat e pelo comércio ilegal.',
    habitos: 'Hábitos:\nSociais, vivem em grupos e costumam ser ativos durante o dia.',
  },
  {
    nome: 'Muriqui-do-sul',
    imagem: require('../../../../assets/img/t6/muriquiDoSul.png'),
    imagemR: require('../../../../assets/img/t6/muriquiDoSulR.png'),
    caracteristica: 'Características:\nMaior primata das Américas, com comportamento pacífico e vida arbórea.',
    reproducao: 'Reprodução:\nGestação de 7 a 8 meses, geralmente com um único filhote por ninhada.',
    conservacao: 'Conservação:\nCriticamente ameaçado devido à fragmentação de habitat e à pressão humana.',
    habitos: 'Hábitos:\nVive em grupos familiares, com hábitos diurnos e elevadas interações sociais.',
  },
];

return(
  <View style={styles.container}>
          <Animatable.View useNativeDriver={true} animation={animaT} duration={700} style={styles.tituloArea}>
              <Pressable onPress={()=>volta("Home")}><Image style={styles.menuB} source={require('../../../../assets/img/t6/menuB.png')}/></Pressable>
              <Image style={styles.titulo} source={require('../../../../assets/img/t6/titulo.png')}/>
          </Animatable.View>

          <ImageBackground style={styles.botArea} resizeMode='cover' source={require('../../../../assets/img/t6/back.png')}>
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
                  <ImageBackground style={styles.boxModal} resizeMode='cover' source={require('../../../../assets/img/t6/back.png')}>
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
                      <Pressable onPress={() => volta("T") }><Animatable.View animation="bounceIn"  duration={1000} ><Image style={styles.botaoModal} source={require('../../../../assets/img/t6/volta.png')}/></Animatable.View></Pressable>

                  </ImageBackground>

              </Modal>
      <StatusBar style="auto"/>
  </View>

);
}