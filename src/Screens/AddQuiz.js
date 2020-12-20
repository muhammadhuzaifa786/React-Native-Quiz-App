/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import ActionButton from 'react-native-action-button';
import firebase from '../Config/Firebase.js'

import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  SectionList,
  Image,
  ScrollView,
  TextView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux'
import {settopic} from '../Store/Action'
import { TextInput } from 'react-native-gesture-handler';

function AddQuiz(props){

    const [topic,setTopic] = useState("")

    const begin =()=>{
        firebase.database().ref('results').child(props.uid).remove();
        props.settopic(topic)
        props.navigation.navigate("AddQuizQ")
    }
    
    return(
        <>
        <View style={styles.container}>
        <Text style={{fontSize:32,paddingBottom:60,fontWeight:"bold",marginTop:50}}>Enter Topic Name :</Text>
        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Topic Name"
            placeholderTextColor = "#5D1049"
            value={topic}
            autoCapitalize = "none"
            onChangeText = {setTopic}/>

        <TouchableOpacity style={styles.loginBtn} onPress={()=>begin()}>
          <Text style={{color:"white"}}>Lets Begin</Text>
        </TouchableOpacity>
        </View>
        </>
    )
  
};


const mapStateToProps = (state) => ({
    hasUser:state.hasUser,
    currentUsername:state.currentUsername,
    topic:state.topic,
    uid:state.uid
})
  
const mapDispatchToProps = (dispatch) => ({
    settopic:(topic)=> dispatch(settopic(topic))
})
  
  
export default connect(mapStateToProps,mapDispatchToProps)(AddQuiz)

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f4f4f4',
      alignItems:"center",
      flex: 1,
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#E30425",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    input: {
       margin: 15,
       width:"80%",
       height: 60,
       borderRadius:10,
       borderColor: '#5D1049',
       borderWidth: 1
    }
    
    

  });



