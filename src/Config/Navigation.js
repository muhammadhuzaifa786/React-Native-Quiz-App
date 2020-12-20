import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity,Text} from 'react-native'
import Home from '../Screens/Home.js'
import Quiz from '../Screens/Quiz.js'
import Result from '../Screens/Result.js'
import Login from '../Screens/Login.js'
import SignUp from '../Screens/SignUp.js'
import AdminHome from '../Screens/AdminHome.js'
import EditQuiz from '../Screens/EditQuiz.js'
import AddQuiz from '../Screens/AddQuiz.js'
import AddQuizQ from '../Screens/AddQuizQ.js'
import EditQuizQ from '../Screens/EditQuizQ.js'
import CustomizeQuiz from '../Screens/CustomizeQuiz.js'
import {connect} from 'react-redux'
import {signout} from '../Store/Action'
const Stack = createStackNavigator();

function Navigation(props) {

  const signout=()=>{
    props.signout()
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home" options={{
          title:"Home",
          
          headerLeft: null,
          
        }} component={Home} 
        options={{
          headerStyle:{
            backgroundColor:"#5D1049"
          },
          title:"Home",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerRight: () => (
          <TouchableOpacity
           onPress={()=>signout()}
            style={{backgroundColor:"black",height:"70%",alignItems:"center",justifyContent:"center",padding:12,marginRight:10}}
          >
            <Text style={{color:"white"}}>Sign Out</Text>
          </TouchableOpacity>
        ),}}
         />
          


        <Stack.Screen name="Login" options={{
          title:"Login",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
            headerLeft: null,
          headerStyle:{
            backgroundColor:"#5D1049"
          }
        }} component={Login}
        options={{headerShown: false }} />



        <Stack.Screen name="SignUp" options={{
          title:"SignUp",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:"#5D1049"
          }
        }} component={SignUp}
        options={{headerShown: false }} />


        <Stack.Screen name="Quiz" options={{
          title:"Quiz",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:"#5D1049"
          }}} component={Quiz} />


        
        <Stack.Screen name="CustomizeQuiz" options={{
          title:"Quiz",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:"#5D1049"
          }}} component={CustomizeQuiz} />


        <Stack.Screen name="Result" options={{
          title:"Result",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerLeft:null,
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:"#5D1049"
          }}} component={Result} />

          
        <Stack.Screen name="AdminHome"
          component={AdminHome} 
          options={{
            headerStyle:{
              backgroundColor:"#5D1049"
            },
            
            headerLeft: null,
            title:"Admin Home",
            headerTitleStyle:{
              color:"white",
              fontWeight:"bold",
              fontSize:25
            },
            headerRight: () => (
            <TouchableOpacity
             onPress={()=>signout()}
              style={{backgroundColor:"black",height:"70%",alignItems:"center",justifyContent:"center",padding:12,marginRight:10}}
            >
              <Text style={{color:"white"}}>Sign Out</Text>
            </TouchableOpacity>
          ),}}
        />

      <Stack.Screen name="AddQuiz" options={{
          title:"Add Quiz",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:"#5D1049"
          }}} component={AddQuiz} />

      <Stack.Screen name="AddQuizQ" options={{
          title:"Add Questions",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerTintColor: '#fff',
          headerLeft: null,
          headerStyle:{
            backgroundColor:"#5D1049"
          }}} component={AddQuizQ} />

      <Stack.Screen name="EditQuiz" options={{
          title:"Edit Quiz",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:"#5D1049"
          }}} component={EditQuiz} />

          
      <Stack.Screen name="EditQuizQ" options={{
          title:"Edit This Question",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerTintColor: '#fff',
          headerLeft: null,
          headerStyle:{
            backgroundColor:"#5D1049"
          }}} component={EditQuizQ} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  hasUser:state.hasUser,
  currentUsername:state.currentUsername
})

const mapDispatchToProps = (dispatch) => ({
  signout:()=> dispatch(signout())
})


export default connect(mapStateToProps,mapDispatchToProps)(Navigation)