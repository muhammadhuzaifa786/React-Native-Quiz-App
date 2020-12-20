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
import { connect } from 'react-redux'
import firebase from '../Config/Firebase'

import AdminHome from '../Screens/AdminHome'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Home = (props) => {

  
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


  const [topics,setTopics] = useState([])

  const startQuiz = (topic)=>{
    props.navigation.navigate("Quiz",{topicKey:topic})
  }

  useEffect(()=>{
    firebase.database().ref('quiz').on("value",function(snapshot){
      let newArray = []
      snapshot.forEach((data)=>{
        const dataVal = data.val();
        newArray.push({
          key:data.key
        })

      })
      setTopics(newArray)
    })

    
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  },[])
  {console.log(props.hasUser,props.usertype)}
  if(props.hasUser === false && props.usertype === null){
    props.navigation.navigate("Login")
    return true
  }
  else if(props.hasUser === true && props.usertype === "user"){
    return (
      <>
          <ScrollView>
          <View style={styles.boxes}>
            {topics.map((v,i)=>{
              return(
                
                <TouchableOpacity key={i} style={styles.topics} onPress={()=>startQuiz(v.key)}>
                  <View style={{justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>{v.key}</Text>
                  </View>
                </TouchableOpacity>
              
              )
              })
            }

          </View>
          </ScrollView>
      </>
    );
  }
  else if(props.hasUser === true && props.usertype === "admin"){
    props.navigation.navigate("AdminHome")
    return null
  }
  else{
    return false
  }
    
  
  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  boxes:{
      marginTop:10,
      flexDirection:'row',
      justifyContent:'space-around',
      flexWrap:'wrap'
  },
  topics:{
      backgroundColor:'white',
      width:'45%',
      height:150,
      alignItems:"center",
      justifyContent:"center",
      marginBottom:20,
      borderColor:'black',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
      borderRadius:10
  },
  

});


const mapStateToProps = (state) => ({
  hasUser:state.hasUser,
  currentUsername:state.currentUsername,
  usertype:state.usertype
})

const mapDispatchToProps = (dispatch) => ({
})


export default connect(mapStateToProps,mapDispatchToProps)(Home)

