import { StatusBar } from 'expo-status-bar';
import { FlatList,Text, View,Image, Modal, Pressable, ImageBackground, ScrollView } from 'react-native';
import styles from './style.js';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useAudio } from '../../../../audioContext';

export default function Terri4 (){

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
    nome: 'Rinoceronte',
    imagem: require('../../../../assets/img/t4/rinoceronte.png'),
    imagemR: require('../../../../assets/img/t4/rinoceronteR.png'),
    caracteristica: 'Características:\nGrande mamífero com chifre característico, estrutura robusta e pele espessa.',
    reproducao: 'Reprodução:\nGestação de 15 a 18 meses, normalmente com uma única cria por parto.',
    conservacao: 'Conservação:\nCriticamente ameaçado pela caça ilegal e degradação de habitat.',
    habitos: 'Hábitos:\nGeralmente solitário, com comportamento territorial e de forrageamento seletivo.',
  },
  {
    nome: 'Zebra',
    imagem: require('../../../../assets/img/t4/zebra.png'),
    imagemR: require('../../../../assets/img/t4/zebraR.png'),
    caracteristica: 'Características:\nMamífero africano de listras distintas, auxiliando na identificação e camuflagem.',
    reproducao: 'Reprodução:\nGestação de 12 a 13 meses, resultando normalmente em um único potro.',
    conservacao: 'Conservação:\nAlgumas espécies estão ameaçadas devido à perda de habitat e predação.',
    habitos: 'Hábitos:\nAnimais sociais que se deslocam em bandos e migram em busca de pastagens.',
  },
  {
    nome: 'Girafa',
    imagem: require('../../../../assets/img/t4/girafa.png'),
    imagemR: require('../../../../assets/img/t4/girafaR.png'),
    caracteristica: 'Características:\nMamífero de pescoço longo, adaptado para alcançar folhas no topo das árvores.',
    reproducao: 'Reprodução:\nGestação de cerca de 15 meses, com uma única cria e intensa relação materna.',
    conservacao: 'Conservação:\nVulnerável, afetada pela perda de habitat e conflitos com atividades humanas.',
    habitos: 'Hábitos:\nPastam em bandos, são diurnas e percorrem grandes áreas em busca de alimento.',
  },
  {
    nome: 'Suricata',
    imagem: require('../../../../assets/img/t4/suricata.png'),
    imagemR: require('../../../../assets/img/t4/suricataR.png'),
    caracteristica: 'Características:\nPequeno mamífero social, com corpo ágil e focinho afilado, vivendo em grupos cooperativos.',
    reproducao: 'Reprodução:\nReprodução sazonal com pequenas ninhadas e cuidados parentais compartilhados.',
    conservacao: 'Conservação:\nNão considerada em perigo, mas sofre impactos em ambientes urbanos.',
    habitos: 'Hábitos:\nHabitam tocas, têm comportamento diurno e vivem em comunidades bem organizadas.',
  },
  {
    nome: 'Dromedário',
    imagem: require('../../../../assets/img/t4/dromedalio.png'),
    imagemR: require('../../../../assets/img/t4/dromedalioR.png'),
    caracteristica: 'Características:\nCamelo de uma única corcova, adaptado a ambientes desérticos e à escassez de água.',
    reproducao: 'Reprodução:\nGestação de aproximadamente 13 meses, geralmente resultando em uma cria por parto.',
    conservacao: 'Conservação:\nDoméstico em muitas regiões; nas selvas, pode sofrer com mudanças ambientais.',
    habitos: 'Hábitos:\nSocial, percorrendo grandes distâncias em busca de água e alimento.',
  },
  {
    nome: 'Leão',
    imagem: require('../../../../assets/img/t4/leao.png'),
    imagemR: require('../../../../assets/img/t4/leaoR.png'),
    caracteristica: 'Características:\nGrande felino com juba imponente, símbolo de poder e comportamento social complexo.',
    reproducao: 'Reprodução:\nGestação de cerca de 110 dias, com ninhadas variando de 1 a 4 filhotes.',
    conservacao: 'Conservação:\nVulnerável, principalmente por conflitos com a expansão humana e perda de habitat.',
    habitos: 'Hábitos:\nVivem em grupos (alcateias) e apresentam comportamentos territoriais e de caça coordenada.',
  },
  {
    nome: 'Tigre',
    imagem: require('../../../../assets/img/t4/tigre.png'),
    imagemR: require('../../../../assets/img/t4/tigreR.png'),
    caracteristica: 'Características:\nMaior felino da Ásia, reconhecido por suas listras e físico robusto e ágil.',
    reproducao: 'Reprodução:\nGestação de aproximadamente 105 dias, com ninhadas de 2 a 3 filhotes.',
    conservacao: 'Conservação:\nCriticamente ameaçado devido à caça ilegal e à fragmentação de habitat natural.',
    habitos: 'Hábitos:\nPredador solitário e territorial, com hábitos predominantemente crepusculares.',
  },
  {
    nome: 'Hipopótamo',
    imagem: require('../../../../assets/img/t4/hipopotamo.png'),
    imagemR: require('../../../../assets/img/t4/hipopotamoR.png'),
    caracteristica: 'Características:\nMamífero semi-aquático de grande porte, com mandíbulas poderosas e comportamento territorial.',
    reproducao: 'Reprodução:\nGestação de cerca de 8 meses, resultando em um único filhote por ninhada.',
    conservacao: 'Conservação:\nEmbora não ameaçado globalmente, enfrenta conflitos em áreas de expansão urbana.',
    habitos: 'Hábitos:\nPassa longos períodos na água para termorregulação, ativo ao entardecer e à noite.',
  },
];

    return(
      <View style={styles.container}>
              <Animatable.View useNativeDriver={true} animation={animaT} duration={700} style={styles.tituloArea}>
                  <Pressable accessibilityRole="button" accessibilityLabel="Voltar ao início" onPress={()=>volta("Home")}><Image style={styles.menuB} source={require('../../../../assets/img/t4/menuB.png')}/></Pressable>
                  <Image style={styles.titulo} source={require('../../../../assets/img/t4/titulo.png')}/>
              </Animatable.View>

              <ImageBackground style={styles.botArea} resizeMode='cover' source={require('../../../../assets/img/t4/back.png')}>
                  <FlatList 
                  data={animal} 
                  renderItem = {({item,index}) => {
                    const anima = index % 2 === 0 ? animaL : animaR;
                    return(
                      <Animatable.View useNativeDriver={true} animation={anima} duration={1000} delay={index*150} style = {styles.bot}><Pressable accessibilityRole="button" accessibilityLabel={`Ver ${item.nome}`} onPress={() => puxa(index)}><Image style={styles.botao} source={item.imagem}/></Pressable></Animatable.View>
                      )}}
                  keyExtractor={item => item.nome}
                  showsVerticalScrollIndicator={false}
                  />
              </ImageBackground>

                  <Modal style={styles.boxModal} visible={aparecer}>
                      <ImageBackground style={styles.boxModal} resizeMode='cover' source={require('../../../../assets/img/t4/back.png')}>
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
                          <Pressable accessibilityRole="button" onPress={() => volta("T") }><Animatable.View animation="bounceIn"  duration={1000} ><Image style={styles.botaoModal} source={require('../../../../assets/img/t4/volta.png')}/></Animatable.View></Pressable>

                      </ImageBackground>

                  </Modal>
          <StatusBar style="auto"/>
      </View>

  );
}
