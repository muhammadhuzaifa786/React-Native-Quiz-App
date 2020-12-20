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
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {settopic} from '../Store/Action'

import { connect } from 'react-redux'


function AdminHome(props){
    const [topics,setTopics] = useState([])

  

    const edittopic=(topic)=>{
      props.settopic(topic)
      props.navigation.navigate("EditQuiz")
    }
    const deletetopic=(key)=>{
      firebase.database().ref("quiz/"+key).remove()
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
    },[])

      return(
        <>
          <View style={{flex:1}}>
            <ScrollView>
          <View style={styles.boxes}>
            {topics.map((v,i)=>{
              return(
                
                <View key={i} style={styles.topics}>
                  < View style={{ alignSelf: 'flex-end', width: 30, height: 30, flexDirection:"row",marginRight:30 }} >
                    <TouchableOpacity onPress={()=>edittopic(v.key)}>
                      <Image source={require('../Assets/edit.png')} style={styles.ico}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>deletetopic(v.key)}>
                      <Image source={require('../Assets/delete.png')} style={styles.ico}/>
                    </TouchableOpacity>
                    

                  </View >
                  <View style={{justifyContent:"center",alignItems:"center",marginTop:30}}>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>{v.key}</Text>
                  </View>
                </View>
              
              )
              })
            }

          </View>
          </ScrollView>

        <ActionButton buttonColor="#5D1049" onPress={()=>props.navigation.navigate("AddQuiz")}></ActionButton>
          </View>
        </>
    )
    
    
  
};


const mapStateToProps = (state) => ({
    hasUser:state.hasUser,
    currentUsername:state.currentUsername,
    usertype:state.usertype
})
  
const mapDispatchToProps = (dispatch) => ({
  settopic:(topic)=> dispatch(settopic(topic))
})
  
  
export default connect(mapStateToProps,mapDispatchToProps)(AdminHome)

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
    ico:{
      width:30,
      height:30,
      resizeMode:"contain"
    }

  });



