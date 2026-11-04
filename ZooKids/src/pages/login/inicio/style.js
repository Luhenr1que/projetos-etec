import{StyleSheet} from 'react-native';
const styles=StyleSheet.create({
    
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    space1:{
        height:'7%',
    },
    logo:{
        width:'90%',
        height:'33%'
    },
    logoText:{
        textAlign:'center',
        fontFamily:'sonic',
        color:'#f8e8d0',
        lineHeight:90,
        fontSize:60,
        borderWidth:5,
        borderRadius:30,
        borderColor:'#713205',
        backgroundColor:'#bc7126',
    },
    space2:{
        height:'20%',
    },
    botArea:{
        width:'100%',
        height:'33%',
        alignItems:'center',
    },
    botImg:{
        width:365,
        height:95,
        margin:5,
    },
    V:{
        position: 'absolute',
        bottom: 0,
        left: 20,
        zIndex: 10,
    },
    VImg:{
        width:50,
        height:40,
    }
});

export default styles