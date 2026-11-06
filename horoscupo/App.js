import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, ImageBackground, Pressable,Modal, ScrollView} from 'react-native';
import styles from './style';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { getSignIndex } from './zodiac';

export default function App() {

  const [aparecer,setaparecer] = useState(false);
  const [aparecerErro,setAparecerErro] = useState(false)
  const [dia,setDia] = useState('');
  const [mes,setMes] = useState("");
  const [signo,setSigno] = useState(0);

  const [horoscupo,setHoroscupo] = useState([
    {
        nome:'Áries',
        dias:'21 de março a 19 de abril',
        imagem:<Image style={styles.imageM} source={require('./assets/img/ares.png')}></Image>,
        cor:'Vermelho - Representa paixão, energia e força.',
        elemento:'Elemento Fogo (Energia, ação, entusiasmo)',
    },
    {
      nome:'Touro',
      dias:'20 de abril a 20 de maio',
      imagem:<Image style={styles.imageM} source={require('./assets/img/touro.png')}></Image>,
      cor:'Verde - Relacionada à natureza, estabilidade e crescimento.',
      elemento:'Elemento Terra (Praticidade, estabilidade, sensatez)',
    },
    {
      nome:'Gêmeos',
      dias:'21 de maio a 20 de junho',
      imagem:<Image style={styles.imageM} source={require('./assets/img/gemeos.png')}></Image>,
      cor:'Amarelo - Simboliza comunicação, inteligência e alegria.',
      elemento:'Elemento Ar (Intelecto, comunicação, sociabilidade)',
    },
    {
      nome:'Câncer',
      dias:'21 de junho a 22 de julho',
      imagem:<Image style={styles.imageM} source={require('./assets/img/cancer.png')}></Image>,
      cor:'Prata ou Branco - Conectada à intuição, proteção e sensibilidade.',
      elemento:'Elemento Água (Emoções, intuição, sensibilidade)',
    },
    {
      nome:'Leão',
      dias:'23 de julho a 22 de agosto',
      imagem:<Image style={styles.imageM} source={require('./assets/img/leao.png')}></Image>,
      cor:'Dourado ou Laranja - Reflete poder, confiança e criatividade.',
      elemento:'Elemento Fogo (Energia, ação, entusiasmo)',
    },
    {
      nome:'Virgem',
      dias:'23 de agosto a 22 de setembro',
      imagem:<Image  style={styles.imageM} source={require('./assets/img/virgem.png')}></Image>,
      cor:'Verde Claro ou Marrom - Representa equilíbrio, harmonia e praticidade.',
      elemento:'Elemento Terra (Praticidade, estabilidade, sensatez)',
    },
    {
      nome:'Libra',
      dias:'23 de setembro a 22 de outubro',
      imagem:<Image style={styles.imageM} source={require('./assets/img/libra.png')}></Image>,
      cor:'Azul Claro ou Rosa - Ligada à paz, harmonia e elegância.',
      elemento:'Elemento Ar (Intelecto, comunicação, sociabilidade)',
    },
    {
      nome:'Escorpião',
      dias:'23 de outubro a 21 de novembro',
      imagem:<Image style={styles.imageM} source={require('./assets/img/escorpiao.png')}></Image>,
      cor:'Preto ou Vermelho Escuro - Relacionada à intensidade, mistério e profundidade.',
      elemento:'Elemento Água (Emoções, intuição, sensibilidade)',
    },
    {
      nome:'Sagitário',
      dias:'22 de novembro a 21 de dezembro',
      imagem:<Image style={styles.imageM} source={require('./assets/img/sargitario.png')}></Image>,
      cor:'Roxo ou Azul Royal - Reflete sabedoria, aventura e expansão.',
      elemento:'Elemento Fogo (Energia, ação, entusiasmo)',
    },
    {
      nome:'Capricórnio',
      dias:'22 de dezembro a 19 de janeiro',
      imagem:<Image style={styles.imageM} source={require('./assets/img/capricornio.png')}></Image>,
      cor:'Preto ou Cinza - Simboliza seriedade, responsabilidade e estabilidade',
      elemento:'Elemento Terra (Praticidade, estabilidade, sensatez)',
    },
    {
      nome:'Aquário',
      dias:'20 de janeiro a 18 de fevereiro',
      imagem:<Image style={styles.imageM} source={require('./assets/img/aquario.png')}></Image>,
      cor:'Azul Elétrico ou Turquesa - Conectada à inovação, originalidade e liberdade.',
      elemento:'Elemento Ar (Intelecto, comunicação, sociabilidade)',
    },
    {
      nome:'Peixes',
      dias:'19 de fevereiro a 20 de março',
      imagem:<Image style={styles.imageM} source={require('./assets/img/peixes.png')}></Image>,
      cor:'Verde Água ou Lilás - Reflete sensibilidade, criatividade e empatia.',
      elemento:'Elemento Água (Emoções, intuição, sensibilidade)',
    },
  ])

  const verificar = () => {
    const result = getSignIndex(dia, mes);
    setAparecerErro(result === null);
    setaparecer(result !== null);
    if (result !== null) setSigno(result);
  };

    const novamente = () =>{
      setAparecerErro(false)
      setaparecer(false)
    }

  return (

    <ImageBackground source={require('./assets/img/horos.png')} style={styles.container} resizeMode='repeat'>

    <View style={styles.box}>
      <Text accessibilityRole="header" style={styles.titulo}>Horóscopo</Text>

      <Text style={styles.text}>Dia de nascimento:</Text>

      <Picker accessibilityLabel="Dia de nascimento" selectedValue={dia} onValueChange={setDia} style={styles.input}>

      <Picker.Item label="Selecione" value=""/>
      <Picker.Item label="1" value="1"/>
      <Picker.Item label="2" value="2"/>
      <Picker.Item label="3" value="3"/>
      <Picker.Item label="4" value="4"/>
      <Picker.Item label="5" value="5"/>
      <Picker.Item label="6" value="6"/>
      <Picker.Item label="7" value="7"/>
      <Picker.Item label="8" value="8"/>
      <Picker.Item label="9" value="9"/>
      <Picker.Item label="10" value="10"/>
      <Picker.Item label="11" value="11"/>
      <Picker.Item label="12" value="12"/>
      <Picker.Item label="13" value="13"/>
      <Picker.Item label="14" value="14"/>
      <Picker.Item label="15" value="15"/>
      <Picker.Item label="16" value="16"/>
      <Picker.Item label="17" value="17"/>
      <Picker.Item label="18" value="18"/>
      <Picker.Item label="19" value="19"/>
      <Picker.Item label="20" value="20"/>
      <Picker.Item label="21" value="21"/>
      <Picker.Item label="22" value="22"/>
      <Picker.Item label="23" value="23"/>
      <Picker.Item label="24" value="24"/>
      <Picker.Item label="25" value="25"/>
      <Picker.Item label="26" value="26"/>
      <Picker.Item label="27" value="27"/>
      <Picker.Item label="28" value="28"/>
      <Picker.Item label="29" value="29"/>
      <Picker.Item label="30" value="30"/>
      <Picker.Item label="31" value="31"/>

      </Picker>

      <Text style={styles.text}>Mês do nascimento:</Text>

      <Picker accessibilityLabel="Mês de nascimento" selectedValue={mes} onValueChange={setMes} style={styles.picker}>

          <Picker.Item label="Selecione" value=""/>
        
          <Picker.Item label="Janeiro" value="janeiro"/>

          <Picker.Item label="Fevereiro" value="fevereiro"/>

          <Picker.Item label="Março" value="marco"/>

          <Picker.Item label="Abril" value="abril"/>

          <Picker.Item label="Maio" value="maio"/>

          <Picker.Item label="Junho" value="junho"/>

          <Picker.Item label="Julho" value="julho"/>

          <Picker.Item label="Agosto" value="agosto"/>

          <Picker.Item label="Setembro" value="setembro"/>

          <Picker.Item label="Outubro" value="outubro"/>

          <Picker.Item label="Novembro" value="novembro"/>

          <Picker.Item label="Dezembro" value="dezembro"/>

        </Picker>

        <Pressable accessibilityRole="button" onPress={()=>{verificar()}}>
          <View style={styles.botao}>
            <Text style={styles.textB}>Verificar</Text>
          </View>
        </Pressable>

        <Modal visible={aparecer} animationType='fade' onRequestClose={novamente}>
        <ImageBackground source={require('./assets/img/horos.png')} style={styles.modal} resizeMode='repeat'>
        <ScrollView contentContainerStyle={styles.modalContent}>

            <Text style={styles.nomeM} >{horoscupo[signo].nome}</Text>
            <Text style={styles.diaM} >{horoscupo[signo].dias}</Text>
            <View style={styles.imageBox}>{horoscupo[signo].imagem}</View>
            <Text style={styles.corM} >{horoscupo[signo].cor}</Text>
            <Text style={styles.elementoM} >{horoscupo[signo].elemento}</Text>

            <Pressable accessibilityRole="button" onPress={()=>{novamente()}}>
          <View style={styles.botao}>
            <Text style={styles.textB}>Novo Teste</Text>
          </View>
        </Pressable>

        </ScrollView>
        </ImageBackground>
        </Modal> 

                <Modal visible={aparecerErro} animationType='fade' onRequestClose={novamente}>
        <ImageBackground source={require('./assets/img/horos.png')} style={styles.modalErro} resizeMode='repeat'>
        <ScrollView contentContainerStyle={styles.modalContent}>

            <Text style={styles.erro}>Digite uma data valida!!!</Text>

        <Pressable accessibilityRole="button" onPress={()=>{novamente()}}>
          <View style={styles.botao}>
            <Text style={styles.textB}>Tentar Novamente</Text>
          </View>
        </Pressable>

        </ScrollView>
        </ImageBackground>
        </Modal> 

        
    </View>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}





