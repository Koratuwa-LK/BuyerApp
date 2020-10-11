import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Alert,
  Image,
  Picker,
  
} from "react-native";

import { Heading } from "../components/Heading";
import { Button, shadow } from "react-native-paper";
import axios from "../axioslist";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

import * as Maplocation from "expo-location";
import * as Permissions from "expo-permissions";

const listScreen = (props) => {
  const [locationpicked, setlocationpicked] = useState();
  const [isfetching, setisfetching] = useState(null);
  const [driverslist, setdriverslist] = useState();
  const [ecocentre, setecocentre] = useState("Dambulla");

  const Permissionverify = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status != "granted") {
      Alert.alert("permission need", "need permissions to proceed", [
        { text: "OK" },
      ]);
      return false;
    }
    return true;
  };

  useEffect(() => {
    locationHandler();
  }, []);

  const locationHandler = async () => {
    const haspermission = await Permissionverify();
    if (!haspermission) {
      return;
    }

    setisfetching(true);

    try {
      const location = await Maplocation.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log(location);
      setlocationpicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onpickedlocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {}
    setisfetching(false);
  };

  const driversHandler = () => {
    axios
      .get("/drivers.json")
      .then((response) => {
        const hotel = [];
        const obj = response.data;
        for (let key in obj) {
          if (obj[key].status == "Online" && obj[key].ecocentre == ecocentre) {
            hotel.push({
              id: key,
              location: obj[key].location,
              status: obj[key].status,
              name: obj[key].name,
            });
          }
        }

        setdriverslist(hotel);
        console.log(hotel);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showlist = () => {
    console.log(driverslist);
  };

  return (
    
      <View style={styles.main}>
        <Heading style={styles.title}>KrushiGanudenu.LK</Heading>
        {/* <Button onPress={locationHandler}>set my location</Button> */}
        <View>
        <View style={styles.row1}>
          
          <TouchableOpacity onPress={locationHandler}>
          <View style={styles.container1}>
              <Image style={styles.imgstyle } source={require("../assets/marginalia-location-access.png")}></Image>
              <Text style={styles.txtstyle}>Set Location</Text>
            </View>
          </TouchableOpacity>
        
          <TouchableOpacity onPress={driversHandler}>
            <View style={styles.container2}>
              <Image style={styles.imgstyle} source={require("../assets/cherry-delivery.png")}></Image>
              <Text style={styles.txtstyle}> view drivers in my area </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* <Button onPress={driversHandler}>view drivers in my area</Button> */}

        <View style={styles.pickcon}>
        <Text style={styles.topic}> Select Eco centre</Text>
          <Picker selectedValue={ecocentre} style={{ height: 10,width: 200 }}
            onValueChange={(itemValue, itemIndex) => setecocentre(itemValue)}>
            <Picker.Item label="Dambulla" value="Dambulla" />
            <Picker.Item label="Thambuththegama" value="Thambuththegama" />
          </Picker>
        </View>

        <ScrollView style={{ marginBottom: 20 }}>
          <FlatList
            style={{ marginBottom: 20 }}
            data={driverslist}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("Mapview", {
                      lat: item.location.lat,
                      lng: item.location.lng,
                      userloc: locationpicked,
                      name: item.name,
                    });
                  }}
                >
                  <View style={styles.tile}>
                    <View style={styles.hold}>
                      <Image
                        source={{
                          uri:
                            "https://cdn0.iconfinder.com/data/icons/professional-avatar-5/48/manager_male_avatar_men_character_professions-512.png",
                        }}
                        style={styles.img}
                      ></Image>
                    </View>
                    <Text
                      style={{ marginLeft: 10, fontSize: 15, marginTop: 8 }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{ marginLeft: 10, fontSize: 15, color: "#7bf037" }}
                    >
                      {item.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
      </View>
    
  );
};

const styles = StyleSheet.create({

  main:{
      flex:1,
      backgroundColor:"#88b18b"
  },

  title:{
    color: "white",
    fontWeight:"500",
    fontSize:40,
    marginTop:10,
    marginLeft: 30
  },

  row1:{
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 30
  },

  topic:{
    marginTop: 30,
    fontSize:30,
    color:"#ffffff"
  },

  container1:{
    height: 180,
    width: 150,
    textAlign: "center",
    backgroundColor: "rgba(255,255,255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    

  },

  container2:{
    height: 180,
    width: 150,
    marginLeft: 50,
    textAlign: "center",
    backgroundColor: "rgba(255,255,255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,

  },

  pickcon:{
    alignItems: "center"
  },

 
  imgstyle:{
    height: 100,
    width : 100

  },

  txtstyle:{
    textAlign: "center" 
  },

  tile: {
    backgroundColor: "rgba(255,255,255,10)",
    height: 160,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 3,
    display: "flex",
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

export default listScreen;
