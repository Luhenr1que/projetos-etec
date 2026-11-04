import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, View,Image, Modal, Pressable, ImageBackground, ScrollView} from 'react-native';
import styles from './style.js';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useAudio } from '../../../../audioContext.js';

export default function Terri2 (){

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
    nome: 'Aves da Mata Atlântica',
    imagem: require('../../../../assets/img/t2/avesMataAtlantica.png'),
    imagemR: require('../../../../assets/img/t2/avesMataAtlanticaR.png'),
    caracteristica: 'Características:\nEspécies com cores vibrantes e cantos melodiosos, adaptadas à densa vegetação.',
    reproducao: 'Reprodução:\nConstroem ninhos elaborados em árvores; incubação geralmente de 2 a 4 semanas.',
    conservacao: 'Conservação:\nMuitas espécies estão ameaçadas pelo desmatamento e fragmentação do habitat.',
    habitos: 'Hábitos:\nDiurnas e, em alguns casos, migratórias, alimentando-se de frutas e insetos.',
  },
  {
    nome: 'Aves da Caatinga',
    imagem: require('../../../../assets/img/t2/avesCaatinga.png'),
    imagemR: require('../../../../assets/img/t2/avescaatingaR.png'),
    caracteristica: 'Características:\nAves adaptadas ao clima semiárido, com plumagem que favorece a camuflagem em terrenos áridos.',
    reproducao: 'Reprodução:\nNinhos simples, com ciclos reprodutivos sincronizados à estação chuvosa.',
    conservacao: 'Conservação:\nSujeitas à degradação ambiental e às variações climáticas da região.',
    habitos: 'Hábitos:\nAtivas durante o dia, alimentam-se de sementes e pequenos insetos.',
  },
  {
    nome: 'Aves da Amazônia',
    imagem: require('../../../../assets/img/t2/avesAmazonia.png'),
    imagemR: require('../../../../assets/img/t2/avesAmazoniaR.png'),
    caracteristica: 'Características:\nGrande diversidade com espécies exóticas e coloridas, típicas da selva tropical.',
    reproducao: 'Reprodução:\nVariedade de ninhos e períodos de incubação, amplamente dependentes da espécie.',
    conservacao: 'Conservação:\nPressionadas pelo desmatamento e exploração predatória dos recursos naturais.',
    habitos: 'Hábitos:\nDiurnas, com hábitos que variam entre migratórias e territoriais.',
  },
  {
    nome: 'Aves do Pantanal',
    imagem: require('../../../../assets/img/t2/avesPantanal.png'),
    imagemR: require('../../../../assets/img/t2/avesPantanalR.png'),
    caracteristica: 'Características:\nAdaptadas a ambientes alagados, com bicos e pernas longas para a caça em áreas aquáticas.',
    reproducao: 'Reprodução:\nNinhos simples, com períodos de incubação influenciados pelo regime de chuvas.',
    conservacao: 'Conservação:\nAlgumas espécies são vulneráveis a alterações no ecossistema e à poluição das águas.',
    habitos: 'Hábitos:\nSociáveis e, em geral, migratórias em resposta às sazonalidades locais.',
  },
  {
    nome: 'Serpentes',
    imagem: require('../../../../assets/img/t2/serpentes.png'),
    imagemR: require('../../../../assets/img/t2/serpentesR.png'),
    caracteristica: 'Características:\nRépteis de corpo alongado, sem membros e com grande variedade de padrões para camuflagem.',
    reproducao: 'Reprodução:\nPodem ser ovíparas ou vivíparas, variando conforme a espécie.',
    conservacao: 'Conservação:\nAlgumas estão ameaçadas pela destruição de habitat e perseguição humana.',
    habitos: 'Hábitos:\nPredadoras silenciosas, com hábitos que variam entre diurnos e noturnos.',
  },
  {
    nome: 'Micos',
    imagem: require('../../../../assets/img/t2/micos.png'),
    imagemR: require('../../../../assets/img/t2/micosR.png'),
    caracteristica: 'Características:\nPequenos primatas com caudas longas, alta agilidade e grande capacidade de adaptação.',
    reproducao: 'Reprodução:\nGestação de cerca de 4 a 5 meses, com geralmente um único filhote por ninhada.',
    conservacao: 'Conservação:\nDiversas espécies estão ameaçadas pela perda de habitat e comércio ilegal.',
    habitos: 'Hábitos:\nSociáveis, com vida arbórea e diurna, formando pequenos grupos familiares.',
  },
  {
    nome: 'Anfíbios',
    imagem: require('../../../../assets/img/t2/anfibios.png'),
    imagemR: require('../../../../assets/img/t2/anfibiosR.png'),
    caracteristica: 'Características:\nAnimais com vida dupla – aquáticos e terrestres – e pele permeável que absorve água.',
    reproducao: 'Reprodução:\nReprodução aquática, onde ovos são depositados na água e sofrem metamorfose.',
    conservacao: 'Conservação:\nMuitas espécies estão em declínio devido à poluição e perda de habitat.',
    habitos: 'Hábitos:\nAtivos ao entardecer e à noite, habitando áreas úmidas e próximas a cursos d’água.',
  },
  {
    nome: 'Formigueiro',
    imagem: require('../../../../assets/img/t2/Formigueiro.png'),
    imagemR: require('../../../../assets/img/t2/formigueiroR.png'),
    caracteristica: 'Características:\nComplexas estruturas habitadas por insetos sociais, essenciais para o equilíbrio ecológico.',
    reproducao: 'Reprodução:\nRainhas depositam ovos que se desenvolvem em ninfas, formando colônias organizadas.',
    conservacao: 'Conservação:\nRelativamente resilientes, embora mudanças no solo possam impactar suas colônias.',
    habitos: 'Hábitos:\nOrganizados, trabalham coletivamente para forragear e construir túneis.',
  },
  {
    nome: 'Invertebrados',
    imagem: require('../../../../assets/img/t2/invertebrados.png'),
    imagemR: require('../../../../assets/img/t2/invertebradosR.png'),
    caracteristica: 'Características:\nAnimais sem coluna vertebral, com grande diversidade morfológica e funcional no ecossistema.',
    reproducao: 'Reprodução:\nPossuem diversas estratégias reprodutivas, desde ovos a métodos assexuados.',
    conservacao: 'Conservação:\nServem de indicador para a saúde ambiental e sofrem com a poluição e alterações dos habitats.',
    habitos: 'Hábitos:\nVariedade nos hábitos – diurnos, noturnos, terrestres e aquáticos – de acordo com cada espécie.',
  }
];

    return(
        <View style={styles.container}>
                <Animatable.View useNativeDriver={true} animation={animaT} duration={700} style={styles.tituloArea}>
                    <Pressable onPress={()=>volta("Home")}><Image style={styles.menuB} source={require('../../../../assets/img/t2/menuB.png')}/></Pressable>
                    <Image style={styles.titulo} source={require('../../../../assets/img/t2/titulo.png')}/>
                </Animatable.View>

                <ImageBackground style={styles.botArea} resizeMode='cover' source={require('../../../../assets/img/t2/back.png')}>
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
                        <ImageBackground style={styles.boxModal} resizeMode='cover' source={require('../../../../assets/img/t2/back.png')}>
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
                            <Pressable onPress={() => volta("T") }><Animatable.View animation="bounceIn"  duration={1000} ><Image style={styles.botaoModal} source={require('../../../../assets/img/t2/volta.png')}/></Animatable.View></Pressable>

                        </ImageBackground>

                    </Modal>
            <StatusBar style="auto"/>
        </View>

    );
}