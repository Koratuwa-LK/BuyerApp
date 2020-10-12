import React, { Component,useLayoutEffect } from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View, Image,Button,Alert } from "react-native";
import { FilledButton } from "../components/FilledButton";
import { Heading } from "../components/Heading";

import { withNavigation } from "react-navigation";

 

class FirstScreen extends Component {

  button = () => {
    return (
   
      <TouchableOpacity>
        style={styles.button}
       
            <Text>Click Change Language</Text>
          </TouchableOpacity>
        );
      };

render()
{
  
    return(

//       import React, { Component,useLayoutEffect } from "react";
// import { render } from "react-dom";
// import { StyleSheet, Text, View, Image,Button,Alert } from "react-native";
// import { FilledButton } from "../components/FilledButton";
// import { Heading } from "../components/Heading";

// import { withNavigation } from "react-navigation";

 

// class FirstScreen extends Component {

//   button = () => {
//     return (
   
//       <TouchableOpacity>
//         style={styles.button}
       
//             <Text>Click Change Language</Text>
//           </TouchableOpacity>
//         );
//       };

// render()
// {
  
//     return(

        // <View style={styles.container}>
        //     <Image style={styles.image} source={require('../assets/logo.jpg')}></Image>
        
        //     <Heading style={styles.title}>KrushiGanudenu.LK</Heading>
        //     <Text style={styles.texty}>Please click Login if you are already registered Or Click Sign up to create a new account.</Text>
           
        //   <View style={styles.buttonRow}>   
        //     <FilledButton
        //   title={'Login'}
        //   style={styles.loginButton}
        //   onPress={() => {
        //     this.props.navigation.navigate("Login");
        //   }}
        //   />

        //     <FilledButton
        //   title={'Signup'}
        //   style={styles.signupButton}
        //   onPress={() => {
        //     this.props.navigation.navigate("SignUp");
        //   }}
        //   />

        // </View>

        // </View>

          <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo1.png')}></Image>

            <Heading style={styles.title}>KrushiGanudenu.LK</Heading>
            <Text style={styles.texty}>Please click Login if you are already registered Or Click Sign up to create a new account.</Text>

              <View style={styles.buttonRow}>   
        <FilledButton
            title={'Login'}
            style={styles.loginButton}
            onPress={() => {
             this.props.navigation.navigate("Login");
            }}
           />

        <FilledButton
            title={'Signup'}
            style={styles.signupButton}
            onPress={() => {
            this.props.navigation.navigate("SignUp");
            }}
        />

      </View>

      </View>
        )
  }

    }

// const styles = StyleSheet.create({
//     container: {
//        flex:1,
//        backgroundColor: '#88b18b'
//     },

//     button:{
//       marginTop:10,
    
//     },

//     title:{
//         color: "#ffffff",
//         marginTop:10,
//         marginLeft:75,
//         fontWeight: "500"
//     },

//     buttonRow:{
//         flexDirection: "row",
//     },

//     signupButton :{
       
//         marginLeft:35,
//         borderRadius:50,
//         width: 175,
//         backgroundColor:"#6b8e23"
        
//     },
    
//     loginButton : {
       
//         marginLeft:15,
//         borderRadius:50,
//         width: 175,
//         backgroundColor:"#6b8e23"
        
//     },

//     texty :{
//         padding: 50,
//         fontSize: 10
//     },
//     image:{
//         padding: 20 ,
//         width: '100%',
//         height: '50%'
//     }
   
// })

// export default FirstScreen;

const styles = StyleSheet.create({
  container: {
     flex:1,
     backgroundColor: '#88b18b'
  },

  button:{
    marginTop:10,
  
  },

  title:{
      color: "#ffffff",
      marginTop:10,
      marginLeft:75,
      fontWeight: "500"
  },

  buttonRow:{
      flexDirection: "row",
  },

  signupButton :{
     
      marginLeft:35,
      borderRadius:50,
      width: 175,
      backgroundColor:"#6b8e23"
      
  },
  
  loginButton : {
     
      marginLeft:15,
      borderRadius:50,
      width: 175,
      backgroundColor:"#6b8e23"
      
  },

  texty :{
      padding: 50,
      fontSize: 10
  },
  image:{
      padding: 20 ,
      width: '100%',
      height: '50%'
  }
 
})

export default FirstScreen;