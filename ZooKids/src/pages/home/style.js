import{StyleSheet} from 'react-native';

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fd8246',
        borderBottomWidth:5,
        borderColor:'#fff',
    },
    bot:{
        flex:1,
        width:'100%',
        height:'4%',
        display:'flex',
        flexDirection:'row-reverse',
        alignContent:'flex-end',
    },
    titulo:{
        width:'100%',
        flex:1,
        alignItems:'center',
        display:'flex',
        flexDirection:'column-reverse',
    },
    menuBot:{
        width:65,
        height:65,
        top: 20,
    },
    botaoArea:{
        width:'100%',
        flex:3,
        alignItems:'center',
        justifyContent:'center',
    },
    botao:{
        width:350,
        height:95,
        marginTop:5,
    },

    modal:{
        width:'100%',
        height:'100%',
        backgroundColor: 'rgba(94, 93, 93, 0.8)',
        justifyContent:'center',
        alignItems:'center',
    },
    box:{
        width:'70%',
        height:'65%',
        backgroundColor:"#bc7126",
        justifyContent:'center',
        alignItems:'center',
        gap:10,
        borderWidth:5,
        borderRadius:30,
        borderColor:'#713205',
    },
    boxTextView:{
        width:200,
        backgroundColor:'#d59334',
        borderWidth:5,
        borderRadius:30,
        borderColor:'#713205',
    },
    boxText:{
        textAlign:'center',
        color:'#f8e8d0',
        width:'100%',
        fontSize:40,
        fontFamily:'sonic',
    },
    V:{
        position: 'absolute',
        bottom: 20,
        left: 20,
        zIndex: 10,
    },
    VImg:{
        width:70,
        height:50,
    },
    BoxS:{
        width:'80%',
        height:'80%',
        backgroundColor:"#bc7126",
        alignItems:'center',
        gap:20,
        borderWidth:5,
        borderRadius:30,
        borderColor:'#713205',
        padding:20,
    },
    SImg:{
        width:206,
        height:206,
        borderRadius: 103,
        borderWidth:5,
        borderColor:'#713205',
        marginBottom:10,
    },
    SText:{
        textAlign:'center',
        fontSize:22,
        color:'#fff',
        marginBottom:15,
        fontFamily:'cream',
    },
    BoxC:{
        width:'80%',
        height:'50%',
        backgroundColor:"#bc7126",
        alignItems:'center',
        gap:20,
        borderWidth:5,
        borderRadius:30,
        borderColor:'#713205',
        padding:20,
        justifyContent:'center',

    },
    CImg:{
        width:151,
        height:151,
        borderRadius: 103,
        borderWidth:3,
        marginBottom:10,
                borderColor:'#713205',
    },
    CText:{
        width:'70%',
        textAlign:'center',
        fontSize:25,
        color:'#fff',
        marginBottom:15,
        fontFamily:'cream',
    },


})

export default styles