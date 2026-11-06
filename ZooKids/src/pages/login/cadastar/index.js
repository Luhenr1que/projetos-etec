import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, ImageBackground, TextInput, Modal, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useState, useEffect } from 'react';
import styles from './style.js';
import { useAudio } from '../../../../audioContext';
import AsyncStorage from '../../../../storage';


export default function Cadastrar (){

    const [formData, setFormData] = useState({
        nome: "",
        dataNasc: "",
        email: "",
        senha: "",
        icone: ""
      });
      
    const [borda,setBorda] = useState('#713205');  
    const [aviso,setAviso] = useState('');  
    const [mIcon,setmIcon] = useState(false);  
    const navigation = useNavigation();
    const [mAviso,setMAviso] = useState(false);
    const [senhaVisivel, setSenhaVisivel] = useState(false);  
    
    const { playSound, playSomBot } = useAudio();

    useEffect(() => {
    playSound();
    }, [formData]);

    //cadastra
    const cad = (type, text) => {
    setFormData(prev => ({
        ...prev,
        [type]: text
      }))
    };

    const salvar = async () =>{
        try{
            const dadosAntigos = await AsyncStorage.getItem('usuarios')
            let lista = []

            if (dadosAntigos !==  null){
                lista = JSON.parse(dadosAntigos)
            }

            lista.push(formData)
            await AsyncStorage.setItem('usuarios', JSON.stringify(lista))

            console.log('Sucesso ao salvar cadastro:');
            return true;
        }catch{
            console.log('Erro ao salvar cadastro:', error);
             return false;
        }

    }

    //faz a navegação
    const go =  async (local)=> {
        const { nome, dataNasc, email, senha, icone } = formData;
        playSomBot();

            if(local=='Entrar') {

                if(!icone){
                    setMAviso(true)
                    setAviso("Escolha um icone.")
                    return false
                }

                try {
                    const dadosAntigos = await AsyncStorage.getItem('usuarios');
                    const lista = dadosAntigos ? JSON.parse(dadosAntigos) : [];

                    const emailExistente = lista.some(user => user.email === email);
                        if (emailExistente) {
                        setMAviso(true);
                        setAviso("Este email já está cadastrado.");
                    return false;}
                
                    const sucesso = await salvar();
                    if(sucesso){
                        setTimeout(()=>{
                            setmIcon(false)
                            navigation.navigate(local)
                        },150)
                    }
                }
                catch {
            console.log("Erro ao verificar/salvar dados:");
                }
            }
            else{
                setTimeout(()=>{
                    navigation.navigate(local)
                },150)
            }
        }

    //formata a data
    const formatar = (text) => {
        const temp = text.replace(/\D/g, '');
        let formatado = temp;
        if(temp.length > 2 && temp.length <=4){
            formatado = temp.slice(0,2) + '/' + temp.slice(2);
        } 
        else if (temp.length > 4) {
            formatado = temp.slice(0, 2) + '/' + temp.slice(2, 4) + '/' + temp.slice(4, 8);
        }
        cad("dataNasc", formatado)
    }

        const validarData = (dataNasc)=>{
        const partes = dataNasc.split('/');
        if(partes.length !== 3)return true;
            const dia = parseInt(partes[0],10);
            const mes = parseInt(partes[1],10)-1;
            const ano = parseInt(partes[2],10);

            const data = new Date(ano,mes,dia);
            if(data.getFullYear() === ano && data.getMonth() === mes && data.getDate() === dia){
                console.log(data.toLocaleDateString('pt-BR'))
                return false;
            }else{
                return true;
            }  
    }

    const modal = () =>{
        setMAviso(false)
    }
    const modalIcon = () =>{
        playSomBot();
        const { nome, dataNasc, email, senha } = formData;
        const regexEmail = /^[a-zA-Z0-9._-]{6,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regexLetras = /[a-zA-Z]/;

            if(!nome || nome.length<2){
                setMAviso(true)
                setAviso("O nome deve  ter no minimo 2 letras.")
                return false
            }
            if(!dataNasc || dataNasc.length !== 10){
                
                setMAviso(true)
                setAviso("Coloque a data completa dd/mm/aaaa.")
                return false
            }
            const a = validarData(dataNasc);
            if(a){
                    setMAviso(true)
                    setAviso("Coloque uma data existente.")
                    return false
            }
            if(!regexEmail.test(email) || !regexLetras.test(email.split("@")[0])){
                setMAviso(true)
                setAviso("Antes do @, o email deve possuir ao menos 6 caracteres e 1 deve ser ao menos uma letra e um ponto após o @.")
                return false
            }
            if(!senha || senha.length<8){
                setMAviso(true)
                setAviso("A senha tem que ter 8 caracteres")
                return false
            }

        setmIcon(true)
    }
    const fecharlIcon = () =>{
        setmIcon(false)
    }
    
    
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} >
        <ImageBackground source={require('../../../../assets/img/incio/cadastrar/back.png')} style={styles.container}>
            <Pressable accessibilityRole="button" style={styles.botBack} onPress={()=> go('Inicio')}><Image style={styles.botBackImg} source={require('../../../../assets/img/incio/cadastrar/botBack.png')}/></Pressable>
            <Animatable.View style={styles.box}>
            
                <Animatable.View style={styles.textArea}>
                <Text style={styles.textL}>Nome:</Text>
                    <TextInput style={[styles.text, {borderColor: borda}]} placeholder="Digite seu nome" placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={2} onChangeText={(text) => cad("nome", text)}/>
                </Animatable.View>

                <Animatable.View style={styles.textArea}>
                <Text style={styles.textL}>Data de Nascimento:</Text>
                    <TextInput style={[styles.text, {borderColor: borda}]} placeholder="dd/mm/aaaa" placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={10} maxLength={10} keyboardType="numeric" onChangeText={formatar} value={formData.dataNasc}/>
                </Animatable.View>

                <Animatable.View style={styles.textArea}>
                <Text style={styles.textL}>Email:</Text>
                    <TextInput style={[styles.text, {borderColor: borda}]} placeholder="Digite seu email" placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={8} keyboardType="email-address"onChangeText={(text) => cad("email", text.toLowerCase())}/>
                </Animatable.View>

                <Animatable.View style={styles.textArea}>
                    <Text style={styles.textL}>Senha:</Text>
                    <View style={[styles.text,styles.senhaContainer]}>
                        <TextInput style={[ styles.senhaInput,{ borderColor: borda }]}  placeholder="Crie uma senha" placeholderTextColor="rgba(0, 0, 0, 0.3)" minLength={8} secureTextEntry={!senhaVisivel} onChangeText={(text) => cad("senha", text)} />
                        <Pressable accessibilityRole="button" onPress={() => setSenhaVisivel(!senhaVisivel)} style={styles.olhoBotao}><Image source={senhaVisivel ? require('../../../../assets/img/incio/naoVer.png') : require('../../../../assets/img/incio/ver.png')} style={styles.olhoIcone}/></Pressable>
                    </View>
                </Animatable.View>

                <Pressable accessibilityRole="button" accessibilityLabel="Continuar cadastro" onPress={()=> modalIcon()}><Image style={styles.bot} source={require('../../../../assets/img/incio/cadastrar/cont.png')}/></Pressable>
            </Animatable.View>

                <Modal style={styles.modalIc} animationType='fade' visible={mIcon} transparent={true}>
                    <Pressable accessibilityRole="button" onPress={()=> fecharlIcon()} style={styles.modalIc}>
                        <View style={styles.boxI}>
                            <Text style={styles.textI}>Escolha um icone:</Text>
                            <View style={styles.boxILi}>
                                <Pressable accessibilityRole="button" accessibilityLabel="Ícone 0" onPress={()=>cad("icone","0")}>
                                    <Image style={[styles.imgIc, formData.icone === "0" && styles.ImgIcSelect]} source={require('../../../../assets/img/icons/M.png')}/>
                                </Pressable>
                                <Pressable accessibilityRole="button" accessibilityLabel="Ícone 1" onPress={()=>cad("icone","1")}>
                                    <Image style={[styles.imgIc, formData.icone === "1" && styles.ImgIcSelect]} source={require('../../../../assets/img/icons/F.png')}/>
                                </Pressable>
                            </View>
                            <View style={styles.boxILi}>
                                <Pressable accessibilityRole="button" accessibilityLabel="Ícone 2" onPress={()=>cad("icone","2")}>
                                    <Image style={[styles.imgIc, formData.icone === "2" && styles.ImgIcSelect]} source={require('../../../../assets/img/icons/leao.png')}/>
                                </Pressable>
                                <Pressable accessibilityRole="button" accessibilityLabel="Ícone 3" onPress={()=>cad("icone","3")}>
                                    <Image style={[styles.imgIc, formData.icone === "3" && styles.ImgIcSelect]} source={require('../../../../assets/img/icons/zebra.png')}/>
                                </Pressable>
                                <Pressable accessibilityRole="button" accessibilityLabel="Ícone 4" onPress={()=>cad("icone","4")}>
                                    <Image style={[styles.imgIc, formData.icone === "4" && styles.ImgIcSelect]} source={require('../../../../assets/img/icons/macaco.png')}/>
                                </Pressable>
                            </View>
                            <View style={styles.boxILi}>
                                <Pressable accessibilityRole="button" accessibilityLabel="Ícone 5" onPress={()=>cad("icone","5")}>
                                    <Image style={[styles.imgIc, formData.icone === "5" && styles.ImgIcSelect]} source={require('../../../../assets/img/icons/cap.png')}/>
                                </Pressable>
                                <Pressable accessibilityRole="button" accessibilityLabel="Ícone 6" onPress={()=>cad("icone","6")}>
                                    <Image style={[styles.imgIc, formData.icone === "6" && styles.ImgIcSelect]} source={require('../../../../assets/img/icons/elefante.png')}/>
                                </Pressable>
                                <Pressable accessibilityRole="button" accessibilityLabel="Ícone 7" onPress={()=>cad("icone","7")}>
                                    <Image style={[styles.imgIc, formData.icone === "7" && styles.ImgIcSelect]} source={require('../../../../assets/img/icons/girafa.png')}/>
                                </Pressable>
                            </View>
                            <View style={styles.boxILi}>
                                <Pressable accessibilityRole="button" accessibilityLabel="Ícone 8" onPress={()=>cad("icone","8")}>
                                    <Image style={[styles.imgIc, formData.icone === "8" && styles.ImgIcSelect]} source={require('../../../../assets/img/icons/oncaPintada.png')}/>
                                </Pressable>
                                <Pressable accessibilityRole="button" accessibilityLabel="Ícone 9" onPress={()=>cad("icone","9")}>
                                    <Image style={[styles.imgIc, formData.icone === "9" && styles.ImgIcSelect]} source={require('../../../../assets/img/icons/axolote.png')}/>
                                </Pressable>
                                <Pressable accessibilityRole="button" accessibilityLabel="Ícone 10" onPress={()=>cad("icone","10")}>
                                    <Image style={[styles.imgIc, formData.icone === "10" && styles.ImgIcSelect]} source={require('../../../../assets/img/icons/jacare.png')}/>
                                </Pressable>
                            </View>

                            <Pressable accessibilityRole="button" accessibilityLabel="Salvar cadastro" onPress={()=> go("Entrar")}><Image style={styles.bot} source={require('../../../../assets/img/incio/cadastrar/cont.png')}/></Pressable>
                        </View>
                    </Pressable>
                </Modal>

                <Modal animationType='fade' visible={mAviso} transparent={true} style={styles.modal}>
                    <Pressable accessibilityRole="button" onPress={()=>modal()} style={styles.modal}>
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
