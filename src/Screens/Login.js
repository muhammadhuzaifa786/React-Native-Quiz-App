/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  BackHandler,Alert,
  TextInput,
  Text,
  StatusBar,
} from 'react-native';
import firebase from '../Config/Firebase.js'
import { connect } from 'react-redux'
import {set_user} from '../Store/Action'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Login(props){
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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  


  
  
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const login = () =>{
    console.log(email,password)
    if(email === "huzaifa@gmail.com" && password === "123456"){
      props.set_user("Admin",email,"123654789","admin")
      setEmail("")
      setPassword("")
      props.navigation.navigate("AdminHome")
    }else{
      alert("Please Wait ....")
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((result) => {

            firebase.database().ref("users").child(result.user.uid).once("value",(snapshot)=>{

              const names = snapshot.val().displayName;
              const uids = snapshot.val().uid;
              const emails = snapshot.val().email;
              console.log("Current User===>",names,emails,uids)
              props.set_user(names,emails,uids,"user")
              props.navigation.navigate("Home")
              

            })
            


        })
        .catch(function(error) {
            // Handle Errors here.
            //var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
    }

  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={{marginBottom:30}}>
          <Text style={{fontSize:30,color:"white",fontWeight:"bold"}}>Login</Text>
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
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={()=>login()}>
          <Text style={{color:"white"}}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>props.navigation.navigate("SignUp")}>
          <Text style={{color:"white"}}>Signup</Text>
        </TouchableOpacity>
      </ScrollView>  

    </>
  );
};

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
  },


});

const mapStateToProps = (state) => ({
  hasUser:state.hasUser,
  currentUsername:state.currentUsername
})

const mapDispatchToProps = (dispatch) => ({
  set_user:(name,email,uid,usertype)=> dispatch(set_user(name,email,uid,usertype))
})


export default connect(mapStateToProps,mapDispatchToProps)(Login)
