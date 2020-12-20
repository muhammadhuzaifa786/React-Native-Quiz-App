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
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import firebase from '../Config/Firebase.js'
import { SwipeListView } from 'react-native-swipe-list-view';
import {settopic} from '../Store/Action'
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const EditQuiz = (props) => {
  const [questions,setQuestions] = useState([])

  const editQuestion=(key)=>{
    
    props.navigation.navigate("EditQuizQ",{questionKey:key})
      
  }
  const delteQuestion=(key)=>{
    firebase.database().ref("quiz/"+props.topic+'/'+key).remove()

  }

  const addquestion= ()=>{
    props.settopic(props.topic)
    props.navigation.navigate("AddQuizQ")

  } 
  useEffect(()=>{
    firebase.database().ref('quiz').child(props.topic).on("value",function(snapshot){
      let newArray = []
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
      setQuestions(newArray)
    })
  },[])

  return(
      <>
        <View style={{flex:1}}>
          <ScrollView>
          <Text style={{fontSize:30,textAlign:"center",marginTop:15,fontWeight:"bold",marginBottom:10}}>{props.topic}</Text>
          <View>
            {questions.map((v,i)=>{
              return(
                <View style={styles.rowFront}>
                    <Text style={{fontSize:20,fontWeight:"bold",marginLeft:10}}>{v.question}</Text>
                    <View style={{marginBottom:10}}></View>
                    <View style={{marginLeft:20}}>
                      <Text style={{marginLeft:10}}>A : {"  "+v.answer1}</Text>
                      <Text style={{marginLeft:10}}>B : {"  "+v.answer2}</Text>
                      <Text style={{marginLeft:10}}>C : {"  "+v.answer3}</Text>
                      <Text style={{marginLeft:10}}>D : {"  "+v.answer4}</Text>
                    </View>
                    
                    <Text style={{marginLeft:10,marginTop:10}}>Correct Answer : {"  "+v.correct_answer}</Text>

                    <View style={{ alignSelf: 'flex-end', width: 30, height: 30, flexDirection:"row",marginRight:30}} >
                    <TouchableOpacity onPress={()=>editQuestion(v.key)}>
                        <Image source={require('../Assets/edit.png')} style={styles.ico}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>delteQuestion(v.key)}>
                        <Image source={require('../Assets/delete.png')} style={styles.ico}/>
                      </TouchableOpacity>
                    </View>
                    


                </View>
            )
            })}
          </View>
          </ScrollView>
          <ActionButton buttonColor="#5D1049" onPress={()=>addquestion()}></ActionButton>
        </View>
      </>
      
  )
  
};


const mapStateToProps = (state) => ({
  hasUser:state.hasUser,
  currentUsername:state.currentUsername,
  topic:state.topic
})

const mapDispatchToProps = (dispatch) => ({
    settopic:(topic)=> dispatch(settopic(topic))
})


export default connect(mapStateToProps,mapDispatchToProps)(EditQuiz)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    justifyContent:"center",
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 150,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
  floatbtn:{
    flex:1,
    marginBottom:10

  },
  ico:{
    width:30,
    height:30,
    resizeMode:"contain",
  }
});