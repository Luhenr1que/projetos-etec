import{StyleSheet} from 'react-native';
const styles=StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        backgroundColor:'#b65321',
        margin:0,
        display:'flex',
        flexDirection:'column',
    },
    tituloArea:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20,
        paddingBottom:10,
        borderBottomWidth:5,
        borderBottomColor:'#fff',
        gap:10,
    },
    titulo:{
        width:284,
        height:74,
    },
    menuB:{
        width:56,
        height:56,
    },
    botArea:{
        flex:1,
        alignItems:'center',
        width:'100%',
        height:'100%',
        overflow: 'hidden'
    },
    bot:{
        width:365,
        height:105,
    },
    botao:{
        width:'100%',
        height:95,
        marginBottom:5,
    },


    boxModal:{
        width:'100%',
        height:'100%',
        alignItems:'center',
    },
    boxInModal:{
        backgroundColor:'#b65321',
        width:'90%',
        height:'85%',
        alignItems:'center',
    },
        scrollInModal:{
        width:'90%',
    },
    tituModal:{
        fontFamily:'sonic',
        fontSize:40,
        color:'#fff',
        marginBottom:15,
        textAlign:'center',
    },
    textModal:{
        fontFamily:'cream',
        fontSize:21,
        color:'#fff',
        marginBottom:15,
        marginLeft:15,

    },
    imgRModal:{
        marginVertical:20,
        width:320,
        height:210,
    },
    botaoModal:{
        width:200,
        height:66,
    },
    icon:{
        width:30,
        height:30,  
    },
    iconText:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '90%',
        marginHorizontal:5,
    }
})

export default styles