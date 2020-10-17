import React, { Component, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
  ScrollView
} from "react-native";
import { Button } from "react-native-paper";
import TimePicker from "react-native-24h-timepicker";
import axios from "../axioslist";
import { Heading } from "../components/Heading";
import { FilledButton } from "../components/FilledButton";

class bookingscreen extends Component {
  state = {
    buyername: "",
    croptype: "",
    cropquantity: "",
    time: "0:00",
    name: "tony",
    link: {
      uri: "",
    },
  };

  componentDidMount() {
    this.setState({
      link: {
        uri: "/drivers/" + this.props.navigation.getParam("name") + "/.json",
      },
    });
  }

 
  checkout() {
    // axios.patch('/drivers/' + this.props.navigation.getParam('name') + '/.json' , {time: this.state.time, booking: {lat : this.props.navigation.getParam('lat'), lng: this.props.navigation.getParam('lng')}})
    axios
      .post("/farmerbookings.json", {
        farmername: this.state.buyername,
        crop : this.state.croptype,
        quantity: this.state.cropquantity,
        drivername: this.props.navigation.getParam("name"),
        farmernumer: "011698080",
        time: this.state.time,
        lat: this.props.navigation.getParam("lat"),
        lng: this.props.navigation.getParam("lng"),
      })
      .then((response) => {
        Alert.alert("Booking Submited");
      })
      .catch((err) => {
        console.log(err);
      });

    this.props.navigation.navigate("Home");
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  render() {
    return (
      // <View style={styles.container}>
      //   <Image style={styles.image} source={require('../assets/logo1.png')}></Image>
      //        <Heading style={styles.title}>KrushiGanudenu.LK</Heading>

      <ImageBackground
        style={{ flex: 1 }}
        source={{
          uri:
            "https://images.unsplash.com/photo-1579992822406-2092a7bd5a36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80://images.unsplash.com/photo-1577549175702-422bcf9b2718?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80://images.unsplash.com/photo-1519817914152-22d216bb9170?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1402&q=80",
        }}
      >

        <View style={styles.tile}>
          <ScrollView>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              backgroundColor: "white",
              padding: 20,
              marginBottom: 20,
            }}
          >
            <View style={styles.hold}>
              <Image
                source={{
                  uri:
                    "https://cdn0.iconfinder.com/data/icons/professional-avatar-5/48/manager_male_avatar_men_character_professions-512.png",
                }}
                style={styles.img}
              ></Image>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold" }}>Name of the driver</Text>
              <Text
                style={{ color: "#fa7916", fontWeight: "bold", fontSize: 20 }}
              >
                {" "}
                {this.props.navigation.getParam("name")}
              </Text>
            </View>
          </View>

          <View style={{ backgroundColor: "white"}}>
            <Button color="#fa7916" onPress={() => this.TimePicker.open()}>
              set pickup time
            </Button>
          </View>
          <View>
            <TextInput style = {{marginTop: 20 ,width: 260, height: 40}}placeholder= "      Enter Your Name" placeholderTextColor="#fa7916" backgroundColor="white" value={this.state.buyername}
                onChangeText={(text) => this.setState({ buyername: text })}></TextInput>
          </View>
          <View>
            <TextInput style = {{marginTop: 20 ,width: 260, height: 40}}placeholder= "      Enter Crop Type" placeholderTextColor="#fa7916" backgroundColor="white" value={this.state.croptype}
                onChangeText={(text) => this.setState({ croptype: text })}></TextInput>
          </View>
          <View>
            <TextInput style = {{marginTop: 20 ,width: 260, height: 40}}placeholder= "      Enter Crop Quantity(Kg)" placeholderTextColor="#fa7916" backgroundColor="white" value={this.state.cropquantity}
                onChangeText={(text) => this.setState({ cropquantity: text })}></TextInput>
          </View>
          <Text style={styles.text}>{this.state.time}</Text>
          <TimePicker
            ref={(ref) => {
              this.TimePicker = ref;
            }}
            onCancel={() => this.onCancel()}
            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
          />
          {/*  <Text>{this.props.navigation.getParam('lat')}</Text>
        <Text>{this.props.navigation.getParam('lng')}</Text> */}
          {/* <Button
            mode="contained"
            color="#6b8e23"
            onPress={() => {
              this.checkout();
            }}
          >
            BOOK
          </Button> */}
          <Button
          style={{marginTop: 30, width: 100, alignSelf: 'center'}}
            mode="contained"
            color="#fa7916"
            onPress={() => {
              this.checkout();
            }}
          >
            BOOK
          </Button>
          </ScrollView>
     </View>
     </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

//   container: {
//         flex: 1,
//         backgroundColor: "#88b18b",
//         alignItems: 'center'
//   },

//   image : {

//     marginTop: 30,
//     height: "35%",
//     width: "65%"
// },
container: {
  flex: 1,
  alignItems: "center",
  backgroundColor: "#aff589",
  paddingTop: 100,
},

image : {

marginTop: 30,
height: "35%",
width: "65%"
},

  tile: {
    alignItems: "center",
    marginTop: 50,
  },
  text: {
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 20,
    color: "#f7e91e",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 3,
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },

  hold: {
    backgroundColor: "#fa7916",
    width: 80,
    borderRadius: 40,
  },
});

export default bookingscreen;
