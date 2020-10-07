import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Stars from "react-native-stars";
import Modal from "react-native-modal";
import { YellowBox } from "react-native";
import _ from "lodash";
import { FilledButton } from "../components/FilledButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import { withNavigation } from "react-navigation";
import { db } from "../database/db.js";
import firebase from "firebase";

class FarmerScreen extends Component {
  constructor() {
    super();
    console.disableYellowBox = true;
    this.state = {
      dataSource: [],
      isLoading: true,
      AllFarmers: [],
      Rating: "",
      Review: "",
      newRating: 1,
      FarmerID: "",
      name: "",
      isModalVisible: false,
    };
  }

  openModal(uid) {
    this.setState({
      isModalVisible: true,
      FarmerID: uid,
    });
  }
  description = () => {
    if (this.state.newRating < 1) {
      return "Useless";
    } else if (this.state.newRating == 1) {
      return "Useless";
    } else if (this.state.newRating == 2) {
      return "Poor";
    } else if (this.state.newRating == 3) {
      return "Ok";
    } else if (this.state.newRating == 4) {
      return "Good";
    } else if (this.state.newRating == 5) {
      return "Excellent";
    }
  };

  submit(uid) {
    const user = firebase.auth().currentUser;
    const review = db.ref("Farmers/" + uid + "/reviews");
    review.push({
      name: this.state.name,
      id: user.uid,
      comment: this.state.Review,
      rating: this.state.newRating,
    });
    this.setState({
      isModalVisible: false,
      name: "",
      Review: "",
    });
    Alert.alert("Your Review Has Been Submitted");
  }

  renderItem = ({ item }) => {
    return (
      <ScrollView>
        <View style={styles.card}>
          <View style={{ marginLeft: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>{item.Farmer}</Text>
                  <Text style={styles.rating}>{item.Rating}/5</Text>
                </View>
                <View style={{ marginTop: 20 }}></View>
                <Text style={styles.text}>phone</Text>
                <Text style={styles.text}>eco</Text>
                <Text style={styles.text}>crops</Text>
              </View>
            </View>
          </View>
          <FilledButton
            title={"Rate Farmer"}
            style={styles.orderButton}
            onPress={() => this.openModal(item.uid)}
          />
          <Modal
            animationIn="bounceIn"
            animationOut="bounceOut"
            backdropColor="#696969"
            isVisible={this.state.isModalVisible}
            onBackButtonPress={() => this.setState({ isModalVisible: false })}
            onBackdropPress={() => this.setState({ isModalVisible: false })}
            style={{ margin: 0 }}
          >
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.box}>
                  <Stars
                    half={false}
                    default={1}
                    update={(val) => {
                      this.setState({ stars: val });
                      this.state.newRating = val;
                    }}
                    spacing={4}
                    starSize={50}
                    count={5}
                    fullStar={
                      <Icon name={"star"} style={[styles.myStarStyle]} />
                    }
                    emptyStar={
                      <Icon
                        name={"star-outline"}
                        style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                      />
                    }
                  />
                  <Text style={styles.desc}>{this.description()}</Text>
                  <TextInput
                    style={styles.userReview}
                    placeholder={"Your Name"}
                    placeholderTextColor="#606060"
                    underlineColorAndroid="black"
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })}
                  ></TextInput>
                  <TextInput
                    style={styles.userReview}
                    placeholder={"Your Review"}
                    placeholderTextColor="#606060"
                    underlineColorAndroid="black"
                    value={this.state.Review}
                    onChangeText={(text) => this.setState({ Review: text })}
                  ></TextInput>
                  <FilledButton
                    title={"Submit"}
                    style={styles.orderButton}
                    onPress={() => {
                      if (this.state.name == "" || this.state.Review == "") {
                        Alert.alert("Please Enter all the details");
                      } else {
                        this.submit(this.state.FarmerID);
                      }
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
      </ScrollView>
    );
  };

  componentDidMount() {
    const farmers = db.ref("Farmers");
    farmers.on("value", (datasnap) => {
      const dataSource = [];
      datasnap.forEach((doc) => {
        var UID = doc.toJSON().uid;
        var reviews = db.ref("Farmers/" + UID + "/reviews");
        reviews.on("value", (datasnap) => {
          const ratings = [];
          datasnap.forEach((doc) => {
            ratings.push(doc.val()["rating"]);
          });
          var total = ratings.reduce((a, b) => {
            return a + b;
          }, 0);
          var avg = total / ratings.length;
          this.roundedAvg = Math.round(avg * 10) / 10;
          if (!this.roundedAvg) {
            this.roundedAvg = "0.0";
          }
        });
        dataSource.push({
          key: doc.key,
          Farmer: doc.toJSON().name,
          uid: doc.toJSON().uid,
          Rating: this.roundedAvg,
        });
        this.setState({
          isLoading: false,
          dataSource: dataSource,
          AllFarmers: dataSource,
        });
      });
    });
  }

  searchFarmers(farmerName) {
    this.setState({
      AllFarmers: this.state.dataSource.filter((i) =>
        i.Farmer.toLowerCase().includes(farmerName.toLowerCase())
      ),
    });
  }

  render() {
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" animating />
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Animatable.View
            animation="slideInRight"
            duration={500}
            style={styles.textinput}
          >
            <Icon name="magnify" style={styles.searchicon} />
            <TextInput
              placeholder="Enter Farmer's Name"
              style={styles.search}
              onChangeText={(text) => {
                this.searchFarmers(text);
              }}
            />
          </Animatable.View>
        </View>
        <FlatList
          data={this.state.AllFarmers}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    padding: 20,
    alignItems: "center",
  },
  header: {
    height: 60,
    width: 350,
    marginTop: 5,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    marginLeft: "5%",
    height: 200,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
  },
  box: {
    backgroundColor: "#fff",
    margin: 100,
    height: 310,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  desc: {
    fontSize: 20,
    marginTop: 10,
    alignSelf: "center",
  },
  textinput: {
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  userReview: {
    marginTop: 30,
    marginStart: 5,
    paddingBottom: 10,
    fontSize: 18,
  },
  searchicon: {
    fontSize: 24,
    marginLeft: 30,
  },
  myStarStyle: {
    fontSize: 40,
    marginTop: 15,
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "grey",
  },
  search: {
    fontSize: 20,
    marginLeft: 15,
    width: "100%",
  },
  title: {
    color: "green",
    fontSize: 18,
    marginTop: 5,
  },
  text: {
    fontSize: 18,
  },
  icon: {
    marginTop: 10,
    textAlign: "right",
    fontSize: 35,
    color: "red",
    flex: 1,
    marginRight: 10,
  },
  itemImage: {
    width: 100,
    height: "100%",
    marginRight: 10,
  },
  orderButton: {
    backgroundColor: "#19a119",
    height: 10,
    width: 150,
    marginTop: 25,
    marginRight: 4,
    alignSelf: "center",
  },
  rating: {
    position: "absolute",
    marginLeft: 250,
    color: "green",
    fontSize: 20,
    textAlign: "right",
    marginTop: 5,
  },
  modal: {
    height: 20,
    width: 200,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default withNavigation(FarmerScreen);
