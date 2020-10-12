import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { Heading } from "../components/Heading";

// const landingScreen = props => {
    class landingScreen extends Component {

    static navigationOptions = {
       
        headerTransparent: {position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0},
        headerTintColor: 'white',
        headerTitle: 'Book delivery',
        
            // headerTitleStyle: { 
            //     fontFamily: 'sans-serif'
            //  },
            }


    render (){        
    return (
       
        // <View style={styles.main}>
        //      <Image style={styles.image} source={require('../assets/logo1.png')}></Image>
        //      <Heading style={styles.title}>KrushiGanudenu.LK</Heading>
<ImageBackground style={{flex: 1}} source={{uri: 'https://images.unsplash.com/photo-1528505086635-4c69d5f10908?ixlib=rb-1.2.1&auto=format&fit=crop&w=1389&q=80://images.unsplash.com/photo-1515113216643-09b1888ee9d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80://images.unsplash.com/photo-1503762687835-129cc7a277e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1576&q=80'}}>
        <View style={styles.main}>
        <View style={styles.row1}>
            <View style={styles.btn}>
            {/* <Button mode="contained" onPress={() => {props.navigation.navigate('List')}}>book delivery</Button> */}
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('List')}}>
                <View style={styles.style1}>
                <Image style={styles.imgstyle} source={require('../assets/eastwood-delivery.png')}></Image>
                <Text style={styles.txtstyle}>BOOK DELIVERY</Text>
                </View>
            </TouchableOpacity>
            </View>

            <View style={styles.btn}>
            {/* <Button mode="contained" onPress={() => {props.navigation.navigate('List')}}>book delivery</Button> */}
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('History')}}>
                <View style={styles.style1}>
                <Image style={styles.imgstyle} source={require('../assets/hugo-no-messages.png')}></Image>
                <Text style={styles.txtstyle}>BOOKING HISTORY</Text></View>
        
            </TouchableOpacity>
            </View>
        </View>
        </View>
        </ImageBackground>
    
    )}
    }

const styles = StyleSheet.create({

    // main:{
    //     flex: 1,
    //     backgroundColor: "#88b18b",
    //     alignItems: 'center'
    // },

    // title: {
    //     color: "white",
    //     marginBottom: 40,
    //     fontWeight:"500",
    //     fontSize:40,
    //     marginTop:10
    //   },

    // row1 :{
    //     flexDirection: "row"
    // },

    // image : {

    //         marginTop: 100,
    //         height: "40%",
    //         width: "85%"
    // },
    
    // style1: {
    //     height: 175,
    //     width: 175,
    //     textAlign:'center',
    //     backgroundColor: 'rgba(255,255,255, 0.5)',
    //     borderRadius: 6
    //   },

    // imgstyle:{
    //     height:150,
    //     width: 175
    // },

    // txtstyle:{
    //     textAlign: 'center',
    //     fontSize: 16

    // },

    main:{
        alignItems: 'center'
    },

    title: {
        color: "white",
        marginBottom: 40,
        fontWeight:"500",
        fontSize:40,
        marginTop:10
      },

    row1 :{
        marginTop: 200,
        flexDirection: "column",
        alignItems: 'center'
    },
    
    style1: {
        height: 175,
        width: 175,
        textAlign:'center',
        backgroundColor: 'rgba(255,255,255, 0.5)',
        borderRadius: 6
      },

    imgstyle:{
        height:150,
        width: 175
    },

    txtstyle:{
        textAlign: 'center',
        fontSize: 16

    },

    btn: {
        marginLeft:30,
        marginTop: 10,
        width: 200
    },
   
})

export default landingScreen;