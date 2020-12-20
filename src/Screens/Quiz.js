/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from 'react-native';
import firebase from '../Config/Firebase'
import { connect } from 'react-redux'

const Quiz = (props) => {

  const [ques,setQues] = useState([])
  const [no,setNo] = useState(0)
  const [correctAnswer,setCorrectAnswer] = useState("")
  const totalQuestions = ques.length;
  const [currentTopic,setCurrentTopic] = useState("")
  const [user,setUser] = useState("")
  const qno = no+1


  const another=()=>{
   
    if(ques[no].correct_answer === correctAnswer){
      firebase.database().ref('results/'+props.uid).child(currentTopic).push({
        topic:props.route.params.topicKey,
        question:ques[no].question,
        answer:correctAnswer,
        score:1,
        correct_answer:ques[no].correct_answer
      })
      alert("Answer Submitted Successfully")
      setNo(no+1)

    }else{
      firebase.database().ref('results/'+props.uid).child(currentTopic).push({
        topic:props.route.params.topicKey,
        question:ques[no].question,
        answer:correctAnswer,
        score:0,
        correct_answer:ques[no].correct_answer
      })

      alert("Answer Submitted Successfully")
      setNo(no+1)


    }    
  }


  const finish =()=>{
    if(ques[no].correct_answer === correctAnswer){
      firebase.database().ref('results/'+props.uid).child(currentTopic).push({
        topic:props.route.params.topicKey,
        question:ques[no].question,
        answer:correctAnswer,
        score:1,
        correct_answer:ques[no].correct_answer
      })
      alert("Answer Submitted Successfully")

      props.navigation.navigate("Result",{topic:props.route.params.topicKey})
  
    }else{
      firebase.database().ref('results/'+props.uid).child(currentTopic).push({
        topic:props.route.params.topicKey,
        question:ques[no].question,
        answer:correctAnswer,
        score:0,
        correct_answer:ques[no].correct_answer
      })
      alert("Answer Submitted Successfully")

      props.navigation.navigate("Result",{topic:props.route.params.topicKey})
  
    }    
  }
  
  useEffect(()=>{

    let topic = props.route.params.topicKey
    setCurrentTopic(topic)
    setUser(props.uid)
    firebase.database().ref('quiz').child(topic).on("value",function(snapshot){
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
          ques_no:dataVal.ques_no,
          correct_answer:dataVal.correct_answer
        })
      })
      setQues(newArray)

    })
  },[])
  if(ques.length === 0){
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontSize:32,fontWeight:"bold",color:"#5D1049"}}>Loading.....</Text>       
      </View>
    )
  }else{
    return (
      <>
        <ScrollView>
            {/* <View style={{flex:1}}>
              
              <Text style={{fontSize:32,paddingBottom:10,fontWeight:"bold",marginTop:40,marginLeft:10}}>Question {qno} of {totalQuestions}:</Text>
          
              <Text style = {styles.input}>{ques[no].question}</Text>
              <TouchableOpacity style={styles.btn} onPress={()=>another()}>
                <Text style={{color:"white"}}>Next Question</Text>
              </TouchableOpacity>
            </View> */}

          <View style={{flex:1}}>
            
            <View>
              <Text style={{fontSize:30,fontWeight:"bold",textAlign:"center"}}>{props.route.params.topicKey}</Text>
            </View>
  
  
            <Text style={{fontSize:32,paddingBottom:10,fontWeight:"bold",marginTop:40,marginLeft:10}}>Question {qno} of {totalQuestions}:</Text>
          
            <Text style = {styles.input}>{ques[no].question}</Text>
          
            
  
            <Text style={{fontSize:32,paddingBottom:30,fontWeight:"bold",marginTop:40,marginLeft:10}}>Select Correct Answer :</Text>
  
            <View style={styles.rbcontainer}>
              <TouchableOpacity style={{flex:1, flexDirection:"row",marginBottom:20}} onPress={()=>setCorrectAnswer("A")}>
                <View
                    style={styles.radioCircle}>
                    <Text style={styles.radioText}>A</Text>
                        {correctAnswer === "A" && <View style={styles.selectedRb} />}
                </View>
                <View style={{alignItems:"center",justifyContent:"center", marginLeft:20}}>
                  <Text style={{color:"#5D1049"}}>{ques[no].answer1}</Text>
                </View>
              </TouchableOpacity>
    
              <TouchableOpacity style={{flex:1, flexDirection:"row",marginBottom:20}} onPress={()=>setCorrectAnswer("B")}>
                <View
                    style={styles.radioCircle}>
                    <Text style={styles.radioText}>B</Text>
                        {correctAnswer === "B" && <View style={styles.selectedRb} />}
                </View>
                <View style={{alignItems:"center",justifyContent:"center", marginLeft:20}}>
                  <Text style={{color:"#5D1049"}}>{ques[no].answer2}</Text>
                </View>
              </TouchableOpacity>
    
              <TouchableOpacity style={{flex:1, flexDirection:"row",marginBottom:20}} onPress={()=>setCorrectAnswer("C")}>
                <View
                    style={styles.radioCircle}>
                    <Text style={styles.radioText}>C</Text>
                        {correctAnswer === "C" && <View style={styles.selectedRb} />}
                </View>
                <View style={{alignItems:"center",justifyContent:"center", marginLeft:20}}>
                  <Text style={{color:"#5D1049"}}>{ques[no].answer3}</Text>
                </View>
              </TouchableOpacity>
    
              <TouchableOpacity style={{flex:1, flexDirection:"row",marginBottom:20}} onPress={()=>setCorrectAnswer("D")}>
                <View
                    style={styles.radioCircle}>
                    <Text style={styles.radioText}>D</Text>
                        {correctAnswer === "D" && <View style={styles.selectedRb} />}
                </View>
                <View style={{alignItems:"center",justifyContent:"center", marginLeft:20}}>
                  <Text style={{color:"#5D1049"}}>{ques[no].answer4}</Text>
                </View>
              </TouchableOpacity>
                
    
            </View>

            <Text style={{marginLeft:20}}> Selected: {correctAnswer} </Text>
  
            <View style={{flexDirection:"row",flex:1,alignItems:"center",justifyContent:"space-around",}}>
              <TouchableOpacity style={styles.btn} onPress={()=>props.navigation.navigate("Home")}>
                <Text style={{color:"white"}}>Cancel</Text>
              </TouchableOpacity>
                  {no+1 === totalQuestions 
                      ?
                    <TouchableOpacity style={styles.loginBtn} onPress={()=>finish()}>
                      <Text style={{color:"white"}}>Finish</Text>
                    </TouchableOpacity>
                      : 
                    <TouchableOpacity style={styles.btn} onPress={()=>another()}>
                      <Text style={{color:"white"}}>Next Question</Text>
                    </TouchableOpacity>
                  }
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  loginBtn:{
      width:"45%",
      backgroundColor:"#E30425",
      borderRadius:25,
      height:50,
      alignSelf:"center",
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
  },
  input: {
     width:"95%",
     alignSelf:"center",
     justifyContent:"center",
     alignItems:"center",
     color:"#5D1049",
     fontSize:25,
    
  },
  inputa: {
      margin: 15,
      width:"80%",
      height: 50,
      borderRadius:10,
      borderColor: '#5D1049',
      borderWidth: 1
  },
  btn:{
      width:"45%",
      backgroundColor:"#5D1049",
      borderRadius:25,
      height:50,
      alignSelf:"center",
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10

  },
  radioText: {
      fontSize: 15,
      color: '#000',
      fontWeight: '700'
  },
radioCircle: {
  height: 30,
  width: 30,
  borderRadius: 100,
  borderWidth: 2,
  borderColor: '#5D1049',
  alignItems: 'center',
  justifyContent: 'center',
},
selectedRb: {
  width: 15,
  height: 15,
  borderRadius: 50,
  backgroundColor: '#5D1049',
  },
  result: {
      marginTop: 20,
      color: 'white',
      fontWeight: '600',
      backgroundColor: '#F3FBFE',
  },
  rbcontainer: {
      marginBottom: 15,
      marginLeft:30,
      
  justifyContent: 'space-around',
},
  

});


const mapStateToProps = (state) => ({
  hasUser:state.hasUser,
  currentUsername:state.currentUsername,
  uid:state.uid,
  questions:state.questions
})

const mapDispatchToProps = (dispatch) => ({
})


export default connect(mapStateToProps,mapDispatchToProps)(Quiz)