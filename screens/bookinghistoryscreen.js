import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "../axioslist";
import { db } from "../database/db.js";
import { FlatList, ScrollView } from "react-native-gesture-handler";

class BookinghistoryScreen extends Component {
  state = {
    trips: [],
  };

  async componentDidMount() {
    try {
      db.ref("confirmedbookings").on("value", (snapshot) => {
        let trips = [];
        snapshot.forEach((snap) => {
          trips.push(snap.val());
        });
        this.setState({ trips });
        console.log(this.state.trips);
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }

  render() {
    return (
      <View>
        <ScrollView>
          {this.state.trips.reverse().map((trip) => {
            return (
              <View style ={{marginTop: 20}}>
                {trip.farmer_name == "Nipuna" ? (
                  <View style={styles.tile}>
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold" }}>Confirmed time: </Text>
                      <Text>{trip.date}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold" }}>Driver: </Text>
                      <Text>{trip.driver_name}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold" }}>Status: </Text>
                      <Text>{trip.status}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold" }}>Time: </Text>
                      <Text>{trip.time}</Text>
                    </View>
                    
                    
                  </View>
                  </View>
                ) : null}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   tile: {
//     padding: 20,
//     backgroundColor:"#88b18b",
//     borderRadius: 10,
//     borderWidth:2
//   },
// });
// export default BookinghistoryScreen;

const styles = StyleSheet.create({
  tile: {
    padding: 20,
    backgroundColor:"#88b18b",
    borderRadius: 10,
    borderWidth:2
  },
});
export default BookinghistoryScreen;
