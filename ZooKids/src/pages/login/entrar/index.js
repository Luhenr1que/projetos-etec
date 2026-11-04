import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, ImageBackground, TextInput, Modal,  KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useState, useEffect } from 'react';
import styles from './style.js';
import { useAudio } from '../../../../audioContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Cadastrar (){

    const [borda,setBorda] = useState('#713205');  
    const [aviso,setAviso] = useState('');  
    const [mAviso,setMAviso] = useState(false);  
    const navigation = useNavigation();
    const [senhaVisivel, setSenhaVisivel] = useState(false);  
    
    const { playSound, playSomBot } = useAudio();

    const [formData1, setFormData1] = useState({
        email: "",
        senha: ""
      });

    useEffect(() => {
    console.log(formData1);
    playSound();
    }, [formData1]);

    // temp
    const cad = (type, text) => {
    setFormData1(prev => ({
        ...prev,
        [type]: text
      }));
    };

    //faz a navegação
    const go = async (local)=> {
        const { email, senha } = formData1;

        playSomBot();

        if(local == "Home"){
            if (!email || !senha){
                setMAviso(true)
                setAviso('Prencha os campos corretamente')
                setTimeout(()=>{
                    modal()
                },5000)
                 return
            }

            const erro = await validar();

            if(erro) {
                setMAviso(true)
                setAviso('senha ou login errado')
                setTimeout(()=>{
                    modal()
                },5000)
                return;
            }
            else{
                salvar();
                setTimeout(()=>{
                    navigation.navigate(local)
                },150)
            }}
        else{
            setTimeout(()=>{
                navigation.navigate(local)
            },150)
        }
        }
    
        const validar = async () => {
        try{
            const userSalvo = await AsyncStorage.getItem('usuarios')
            const lista = userSalvo ? JSON.parse(userSalvo) : []

            const usuarioValido = lista.some(userSalvo =>
                userSalvo.email === formData1.email && userSalvo.senha === formData1.senha
            )
            return !usuarioValido
            }
        catch (erro){
            console.log("Erro ao validar:", erro);
            return true
                }
        }

        const salvar = async () =>{
            try{
                const logado = await AsyncStorage.getItem('login')
                let lista = []
    
                if (logado !==  null){
                    lista = JSON.parse(logado)
                }
    
                lista.push(formData1)
                await AsyncStorage.setItem('login', JSON.stringify(lista))
    
                console.log('Sucesso ao logar:');
                return true;
            }catch{
                console.log('Erro ao logar:', error);
                 return false;
            }
    
        }

        const modal = () =>{
            setMAviso(false)
        }
        
    
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} >
        <ImageBackground source={require('../../../../assets/img/incio/cadastrar/back.png')} style={styles.container}>
            <Pressable style={styles.botBack} onPress={()=> go("Inicio")}><Image style={styles.botBackImg} source={require('../../../../assets/img/incio/cadastrar/botBack.png')}/></Pressable>
            <Animatable.View style={styles.box}>
                <Animatable.View style={styles.textArea}>
                <Text style={styles.textL}>Email:</Text>
                    <TextInput style={[styles.text, {borderColor: borda}]} placeholder="Digite seu email" placeholderTextColor="rgba(0, 0, 0, 0.3)" keyboardType="email-address" onChangeText={(text) => cad("email", text.toLowerCase())}/>
                </Animatable.View>
                <Animatable.View style={styles.textArea}>
                    <Text style={styles.textL}>Senha:</Text>

                </Animatable.View>
                    <View style={[styles.text,styles.senhaContainer]}>
                        <TextInput style={[styles.senhaInput, {borderColor: borda}]} placeholder="Digite sua senha" placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={8} secureTextEntry={!senhaVisivel} onChangeText={(text) => cad("senha", text)} />
                        <Pressable onPress={() => setSenhaVisivel(!senhaVisivel)} style={styles.olhoBotao}><Image source={senhaVisivel ? require('../../../../assets/img/incio/naoVer.png') : require('../../../../assets/img/incio/ver.png')} style={styles.olhoIcone}/></Pressable>
                    </View>
                <Pressable onPress={()=> go("Home")}><Image style={styles.bot} source={require('../../../../assets/img/incio/cadastrar/cont.png')}/></Pressable>
            </Animatable.View>

                <Modal animationType='fade' visible={mAviso} transparent={true} style={styles.modal}>
                    <Pressable onPress={()=>modal()} style={styles.modal}>
                        <View style={styles.boxM}>
                            <Text style={styles.aviso}>{aviso}</Text>    
                        </View>
                    </Pressable>
                </Modal>
                
            <StatusBar style="auto"/>
        </ImageBackground>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}