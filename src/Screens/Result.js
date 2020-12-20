/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,Alert,
  View,
  Text,
  StatusBar,
} from 'react-native';
import firebase from '../Config/Firebase'
import {connect} from 'react-redux'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Result = (props) => {

  const [result,setResult] = useState("")
  const [ques,setQues] = useState([])


  const backAction = () => {
    Alert.alert("Exit App", "Are You Sure You Want To Exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  const finish=()=>{

    firebase.database().ref('results').child(props.uid).remove();
    props.navigation.navigate("Home")

  }

  
  useEffect(()=>{

    
    firebase.database().ref('quiz').child(props.route.params.topic).on("value",function(snapshot){
      let newArray =[]

      snapshot.forEach((data)=>{
        const dataVal = data.val();
        newArray.push({
          key:data.key,
          question:dataVal.question,
          answer1:dataVal.answer1,
          answer2:dataVal.answer2,
          answer3:dataVal.answer3,
          answer4:dataVal.answer4,
          correct_answer:dataVal.correct_answer
        })
      })
      setQues(newArray)

      
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);

    })

    firebase.database().ref('results/'+props.uid).child(props.route.params.topic).on("value",function(snapshot){
      let marks =0

      snapshot.forEach((data)=>{
        const dataVal = data.val();
        console.log(dataVal)
        if(dataVal.score === 1){
          marks+=1
        }
      })
      setResult(marks)
    })
  },[])

    return (
      <>
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:30,fontWeight:"bold",marginBottom:20}}>You Got {result} Out Of {ques.length}</Text>

            
            <TouchableOpacity style={styles.loginBtn} onPress={()=>finish()}>
                      <Text style={{color:"white"}}>Finish</Text>
                    </TouchableOpacity>
          </View>
      </>
    );
  
  
};

const styles = StyleSheet.create({
  loginBtn:{
    width:"85%",
    backgroundColor:"#E30425",
    borderRadius:25,
    height:50,
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
},
});


const mapStateToProps = (state) => ({
  hasUser:state.hasUser,
  currentUsername:state.currentUsername,
  uid:state.uid
})

const mapDispatchToProps = (dispatch) => ({
})


export default connect(mapStateToProps,mapDispatchToProps)(Result)