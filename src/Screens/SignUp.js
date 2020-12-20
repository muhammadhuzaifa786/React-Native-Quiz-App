/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StatusBar,
} from 'react-native';
import firebase from '../Config/Firebase.js'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function SignUp(props){
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  
    const onSubmit=()=>{
        alert("Please Wait ....")
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result=>{

            var user = result.user;

            var users = {
                name: name,
                email: user.email,
                uid:user.uid,
                password: password
            }

            var flag = false;
            firebase.database().ref('users').on("value", function(snapshot) {
                //var data = snapshot.val();

                snapshot.forEach(function(data) {
                    var userdata = data.val();
    
                    if (userdata.email === users.email) {
                        flag = true
                    }
                });
    
                if (flag === false) {
                    firebase.database().ref('/').child('users/'+user.uid).set({
                        displayName: users.name,
                        email: user.email,
                        uid:user.uid,
                        password: users.password
                    })

    
                } else {
                }
                alert("SignUp Success")
                props.navigation.navigate("Login")

            })  

            

        })
        .catch(function(error) {
            // Handle Errors here.
            //var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });
      }
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={{marginBottom:30}}>
          <Text style={{fontSize:30,color:"white",fontWeight:"bold",textAlign:"left"}}>Join Us Now</Text>
        </View>

        
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Full Name..." 
            keyboardType="default"
            value={name}
            placeholderTextColor="white"
            onChangeText={setName}/>
        </View>

        
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            keyboardType="email-address"
            value={email}
            placeholderTextColor="white"
            onChangeText={setEmail}/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Password..."
            secureTextEntry={true}
            value={password} 
            placeholderTextColor="white"
            onChangeText={setPassword}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={()=>onSubmit()}>
          <Text style={{color:"white"}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>props.navigation.navigate("Login")}>
          <Text style={{color:"white"}}>Login Now</Text>
        </TouchableOpacity>
      </ScrollView>  

    </>
  );
};

export default SignUp


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5D1049",
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView:{
    width:"80%",
    backgroundColor:"#4E0D3A",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
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
  }


})