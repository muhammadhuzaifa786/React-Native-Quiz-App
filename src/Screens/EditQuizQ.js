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
import { TextInput } from 'react-native-gesture-handler';

function EditQuizQ(props){
    const [ans1,setans1] = useState("")
    const [ans2,setans2] = useState("")
    const [ans3,setans3] = useState("")
    const [ans4,setans4] = useState("")
    const [question,setQuestion] = useState("")
    const [correctAnswer,setCorrectAnswer] = useState("")


    const another = ()=>{
        setans1("")
        setans2("")
        setans3("")
        setans4("")
        setQuestion("")
        setCorrectAnswer("")
    }

    useEffect(()=>{
        firebase.database().ref('quiz/'+props.topic+'/'+props.route.params.questionKey).on("value",(snapshot)=>{
            const dataVal = snapshot.val();
            setans1(dataVal.answer1)
            setans2(dataVal.answer2)
            setans3(dataVal.answer3)
            setans4(dataVal.answer4)
            setQuestion(dataVal.question)
            setCorrectAnswer(dataVal.correct_answer)
    
           
    
        
           })  
          
      },[])

    const addquestion = ()=>{
        if(ans1 === "" || ans2 === "" || ans3 === "" || ans4 === "" || question === "" || correctAnswer === ""){
            alert("Please Fill All The Required Informations")
        }else{
            firebase.database().ref('quiz/'+props.topic).child(props.route.params.questionKey).set({
                answer1:ans1,
                answer2:ans2,
                answer3:ans3,
                answer4:ans4,
                correct_answer:correctAnswer,
                question:question,
                topic:props.topic
            })
            alert("Question Successfully Edited")
            props.navigation.navigate("EditQuiz")
        }
    }   
    
    return(
        
        <>
        <ScrollView style={styles.container}>


            <Text style={{textAlign:"center",fontSize:35,fontWeight:"bold"}}>Edit This Question</Text>
        <Text style={{fontSize:32,paddingBottom:10,fontWeight:"bold",marginTop:40,marginLeft:10}}>Question :</Text>
        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Write Question Here..."
            placeholderTextColor = "#5D1049"
            value={question}
            autoCapitalize = "none"
            onChangeText = {setQuestion}/>

        <Text style={{fontSize:32,paddingBottom:10,fontWeight:"bold",marginTop:40,marginLeft:10}}>Answers :</Text>
            <Text>A)</Text>
            <TextInput style = {styles.inputa}
            underlineColorAndroid = "transparent"
            placeholder = "Write Option A Here..."
            placeholderTextColor = "#5D1049"
            value={ans1}
            autoCapitalize = "none"
            onChangeText = {setans1}/>

            <Text>B)</Text>

            <TextInput style = {styles.inputa}
            underlineColorAndroid = "transparent"
            placeholder = "Write Option B Here..."
            value={ans2}
            placeholderTextColor = "#5D1049"
            autoCapitalize = "none"
            onChangeText = {setans2}/>

            <Text>C)</Text>

            <TextInput style = {styles.inputa}
            underlineColorAndroid = "transparent"
            placeholder = "Write Option C Here..."
            value={ans3}
            placeholderTextColor = "#5D1049"
            autoCapitalize = "none"
            onChangeText = {setans3}/>

            <Text>D)</Text>


            <TextInput style = {styles.inputa}
            underlineColorAndroid = "transparent"
            placeholder = "Write Option D Here..."
            value={ans4}
            placeholderTextColor = "#5D1049"
            autoCapitalize = "none"
            onChangeText = {setans4}/>


        <Text style={{fontSize:32,paddingBottom:10,fontWeight:"bold",marginTop:40,marginLeft:10}}>Select Correct Answer :</Text>

            <View style={styles.rbcontainer}>
						
                <TouchableOpacity
                    style={styles.radioCircle}
                    onPress={()=>setCorrectAnswer("A")}>
                    <Text style={styles.radioText}>A</Text>
                        {correctAnswer === "A" && <View style={styles.selectedRb} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.radioCircle}
                    onPress={()=>setCorrectAnswer("B")}>
                    <Text style={styles.radioText}>B</Text>
                        {correctAnswer === "B" && <View style={styles.selectedRb} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.radioCircle}
                    onPress={()=>setCorrectAnswer("C")}>
                    <Text style={styles.radioText}>C</Text>
                        {correctAnswer === "C" && <View style={styles.selectedRb} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.radioCircle}
                    onPress={()=>setCorrectAnswer("D")}>
                    <Text style={styles.radioText}>D</Text>
                        {correctAnswer === "D" && <View style={styles.selectedRb} />}
                </TouchableOpacity>
			
					
			</View>
            <Text> Selected: {correctAnswer} </Text>




        <TouchableOpacity style={styles.loginBtn} onPress={()=>addquestion()}>
          <Text style={{color:"white"}}>Edit This Question</Text>
        </TouchableOpacity>
       
            <TouchableOpacity style={styles.btn} onPress={()=>props.navigation.navigate("AdminHome")}>
            <Text style={{color:"white"}}>Cancel</Text>
            </TouchableOpacity>
      
        </ScrollView>
        </>
    )
  
};


const mapStateToProps = (state) => ({
    hasUser:state.hasUser,
    currentUsername:state.currentUsername,
    topic:state.topic
})
  
const mapDispatchToProps = (dispatch) => ({
})
  
  
export default connect(mapStateToProps,mapDispatchToProps)(EditQuizQ)

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f4f4f4',
      flex: 1,
    },
    loginBtn:{
        width:"80%",
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
       margin: 15,
       width:"95%",
       height: 80,
       alignSelf:"center",
       borderRadius:10,
       borderColor: '#5D1049',
       borderWidth: 1
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
        marginBottom: 35,
        alignItems: 'center',
        flexDirection: 'row',
		justifyContent: 'space-around',
	},
    
    

  });



