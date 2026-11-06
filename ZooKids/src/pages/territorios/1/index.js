import { StatusBar } from 'expo-status-bar';
import { FlatList,Text, View,Image, Modal, Pressable, ImageBackground, ScrollView } from 'react-native';
import styles from './style.js';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useAudio } from '../../../../audioContext';
export default function Terri1 (){
    const navigation = useNavigation();

    const[aparecer,setAparecer] = useState(false)
    const[cont,setCont] = useState(0)
    const[animaVol,setAnimaVol] = useState("bounceIn")
    const[animaT,setAnimaT] = useState("fadeInDownBig")
    const[animaR,setAnimaR] = useState('fadeInRightBig')
    const[animaL,setAnimaL] = useState('fadeInLeftBig')
    const { playSomBot } = useAudio();


    const { playSound } = useAudio();
    useEffect(() => {
    playSound();
    }, []);

    const puxa = (index) =>{
        playSomBot();
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
    nome: 'Onça-Pintada',
    imagem: require('../../../../assets/img/t1/oncaPintada.png'),
    imagemR: require('../../../../assets/img/t1/oncaPintadaR.png'),
    caracteristica: 'Características:\nMaior felino das Américas, com pelagem manchada em rosetas e corpo forte.',
    reproducao: 'Reprodução:\nGestação de aproximadamente 100 dias, ninhada com 2 a 4 filhotes.',
    conservacao: 'Conservação:\nVulnerável, ameaçada pela perda de habitat e caça ilegal.',
    habitos: 'Hábitos:\nPredadora solitária, ativa no crepúsculo, encontrada em florestas densas.',
  },
  {
    nome: 'Onça-Parda',
    imagem: require('../../../../assets/img/t1/oncaParda.png'),
    imagemR: require('../../../../assets/img/t1/oncaPardaR.png'),
    caracteristica: 'Características:\nFelino de porte médio, com tonalidades variáveis na pelagem, adaptável a diversos ambientes.',
    reproducao: 'Reprodução:\nCiclo reprodutivo com gestação de 90 dias e ninhadas de 2 a 3 filhotes.',
    conservacao: 'Conservação:\nQuase ameaçada, devido à fragmentação de habitat e conflitos com humanos.',
    habitos: 'Hábitos:\nNocturna e territorial, caçadora habilidosa em diversos ecossistemas.',
  },
  {
    nome: 'Jacaré/Cágados',
    imagem: require('../../../../assets/img/t1/jacare.png'),
    imagemR: require('../../../../assets/img/t1/jacareR.png'),
    caracteristica: 'Características:\nRépteis de grande porte com escamas resistentes; os cágados apresentam carapaças robustas.',
    reproducao: 'Reprodução:\nDesova coletiva, com ovos depositados em ninhos de areia ou vegetação, conforme a espécie.',
    conservacao: 'Conservação:\nAlgumas espécies estão ameaçadas pela perda de habitat e exploração comercial.',
    habitos: 'Hábitos:\nHabitat aquático, predadores oportunistas e geralmente solitários.',
  },
  {
    nome: 'Elefante',
    imagem: require('../../../../assets/img/t1/elefante.png'),
    imagemR: require('../../../../assets/img/t1/elefanteR.png'),
    caracteristica: 'Características:\nMaior mamífero terrestre, com tromba longa e orelhas imponentes, símbolo de força.',
    reproducao: 'Reprodução:\nGestação prolongada de cerca de 22 meses, com ninhada normalmente única.',
    conservacao: 'Conservação:\nEm perigo crítico devido à caça furtiva e fragmentação de habitat.',
    habitos: 'Hábitos:\nSocial, vivendo em bandos liderados por fêmeas, e com hábitos diurnos e migratórios.',
  },
  {
    nome: 'Flamingos',
    imagem: require('../../../../assets/img/t1/flamingo.png'),
    imagemR: require('../../../../assets/img/t1/flamingoR.png'),
    caracteristica: 'Características:\nAves de plumagem rosa, longas pernas e bicos curvos, adaptados à filtragem de alimento.',
    reproducao: 'Reprodução:\nReproduzem-se em colônias; cada fêmea deposita um único ovo por ninho.',
    conservacao: 'Conservação:\nAlgumas populações sofrem com alterações ambientais e perdas de áreas de nidificação.',
    habitos: 'Hábitos:\nMigratórios e sociáveis, alimentam-se de pequenos organismos aquáticos.',
  },
  {
    nome: 'Leão-marinho',
    imagem: require('../../../../assets/img/t1/leaoMarinho.png'),
    imagemR: require('../../../../assets/img/t1/leaoMarinhoR.png'),
    caracteristica: 'Características:\nMamífero marinho com corpo alongado, membros adaptados à natação e focinho afilado.',
    reproducao: 'Reprodução:\nCiclo reprodutivo anual com cuidados parentais intensos, geralmente com uma ninhada por ano.',
    conservacao: 'Conservação:\nPopulações vulneráveis devido à poluição e à captura acidental em redes de pesca.',
    habitos: 'Hábitos:\nSociáveis, formam grandes colônias e passam parte do tempo em terra e na água.',
  },
  {
    nome: 'Pequenos Felinos',
    imagem: require('../../../../assets/img/t1/pequenosFelinos.png'),
    imagemR: require('../../../../assets/img/t1/pequenosFelinosR.png'),
    caracteristica: 'Características:\nFelinos de porte reduzido, ágeis e com variadas pelagens, presentes em habitats urbanos e rurais.',
    reproducao: 'Reprodução:\nGestação em torno de 60 a 70 dias, com ninhadas de 1 a 3 filhotes, dependendo da espécie.',
    conservacao: 'Conservação:\nDiversas espécies podem estar em risco por perda de habitat e conflitos com humanos.',
    habitos: 'Hábitos:\nPredadores discretos e noturnos, caçando pequenos roedores e aves.',
  }
]        


    return(
        <View style={styles.container}>
                <Animatable.View useNativeDriver={true} animation={animaT} duration={700} style={styles.tituloArea}>
                    <Pressable accessibilityRole="button" accessibilityLabel="Voltar ao início" onPress={()=>volta("Home")}><Image style={styles.menuB} source={require('../../../../assets/img/t1/menuB.png')}/></Pressable>
                    <Image style={styles.titulo} source={require('../../../../assets/img/t1/titulo.png')}/>
                </Animatable.View>
                <ImageBackground style={styles.botArea} resizeMode='cover' source={require('../../../../assets/img/t1/back.png')}>
                    <FlatList 
                    data={animal} 
                    renderItem = {({item,index}) => {
                      const anima = index % 2 === 0 ? animaL : animaR;
                      return (
                        <Animatable.View useNativeDriver={true} initial={false} animation={anima} duration={800} delay={index*100} style = {styles.bot}><Pressable accessibilityRole="button" accessibilityLabel={`Ver ${item.nome}`} onPress={() => puxa(index)}><Image style={styles.botao} source={item.imagem}/></Pressable></Animatable.View>
                        )}}
                    keyExtractor={item => item.nome}
                    showsVerticalScrollIndicator={false}
                    />
                </ImageBackground>
                    <Modal style={styles.boxModal} visible={aparecer}>
                        <ImageBackground style={styles.boxModal} resizeMode='cover' source={require('../../../../assets/img/t1/back.png')}>
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
                            <Pressable accessibilityRole="button" onPress={() => volta("T") }><Animatable.View animation={animaVol} duration={800} ><Image style={styles.botaoModal} source={require('../../../../assets/img/t1/volta.png')}/></Animatable.View></Pressable>
                        </ImageBackground>
                    </Modal>
            <StatusBar style="auto"/>
        </View>
    );
}
