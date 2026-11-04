import{StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    box:{
        width:'98%',
        flex:0.8,
        backgroundColor:"#bc7126",
        borderWidth:5,
        borderRadius:30,
        borderColor:'#713205',
        paddingTop:'10%',
        justifyContent:'flex-start',
    },
    textArea:{
        marginBottom: 10,
        alignItems:'center',
        justifyContent:'center',
    },
    textL:{
        width: '90%',
        color:'#f8e8d0',
        fontSize:26,
        fontFamily:'Sonic',
    },
    text:{
        width: '90%',
        height: 60,
        backgroundColor: '#fff',
        borderWidth:2,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 22,
        textAlign:'center',
        fontFamily:'cream',
        color:'#000'
    },
    botBack:{
        position: 'absolute',
        top: 10,
        left: 20,
        zIndex: 10,
    },
    botBackImg:{
        width:56,
        height:56,
    },
    bot:{
        alignSelf:'center',
        width:273,
        height:78,
    },
    aviso:{
        textAlign:'center',
        fontFamily:'cream',
        fontSize: 25,
        color:'#f8e8d0',
    },
    modal:{
        width:'100%',
        height:'100%',
        backgroundColor: 'rgba(94, 93, 93, 0.8)',
        justifyContent:'center',
        alignItems:'center',
    },
    boxM:{
        width:'70%',
        height:'40%',
        backgroundColor:"#bc7126",
        justifyContent:'center',
        alignItems:'center',
        gap:10,
        borderWidth:5,
        borderRadius:30,
        borderColor:'#713205',
    },
    boxMTextView:{
        width:200,
        backgroundColor:'#d59334',
        borderWidth:5,
        borderRadius:30,
        borderColor:'#713205',
    },
    boxMText:{
        textAlign:'center',
        color:'#f8e8d0',
        width:'100%',
        fontSize:40,
        fontFamily:'sonic',
    },
    modalIc:{
        width:'100%',
        height:'100%',
        backgroundColor: 'rgba(94, 93, 93, 0.8)',
        justifyContent:'center',
        alignItems:'center',
    },
    boxI:{
        width:'95%',
        height:'90%',
        backgroundColor:"#bc7126",
        gap:10,
        borderWidth:5,
        borderRadius:30,
        borderColor:'#713205',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',

    },
    textI:{
        color:'#f8e8d0',
        textAlign:'center',
        fontSize:40,
        fontFamily:'sonic',
    },
    boxILi:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'99%',
        marginBottom:10,
        gap:20,
    },
    imgIc:{
        width:100,
        height:100,
        borderRadius: 103,
        opacity:0.6,
        borderWidth:5,
        borderColor:'#713205',
    },
    ImgIcSelect:{
        borderWidth: 6,
        opacity:1,
        borderColor: '#60c537',
        borderRadius: 103,
        transform: [{ scale: 1.2 }],
    },
    senhaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom:20,
    },

    senhaInput: {
        flex: 1,
        fontSize: 22,
        fontFamily: 'cream',
        color: '#000',
        textAlign: 'center',
    },

    olhoBotao: {
        padding: 5,
    },

    olhoIcone: {
        width: 34,
        height: 26,
        tintColor: '#713205',
    },

})

export default styles