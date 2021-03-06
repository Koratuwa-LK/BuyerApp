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
} from "react-native";
import _ from "lodash";
import { FilledButton } from "../components/FilledButton";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { withNavigation } from "react-navigation";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBYt63JOqEi0ufNASxrzSVNWwUn-vr9KPY",
  authDomain: "reactnative-73d14.firebaseapp.com",
  databaseURL: "https://reactnative-73d14.firebaseio.com",
  projectId: "reactnative-73d14",
  storageBucket: "reactnative-73d14.appspot.com",
  messagingSenderId: "476265559870",
  appId: "1:476265559870:web:95a33edadb3c593b391e6f",
  measurementId: "G-CKQ9694116",
};

if (!firebase.apps.length) {
  const firebaseApp = firebase.initializeApp(firebaseConfig);
}

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true,
      filteredcrops: [],
    };
  }

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderRadius: 5,
          borderColor: "green",
          borderWidth: 2,
          marginBottom: 1,
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 18, color: "green", marginBottom: 15 }}>
            {item.Name}
          </Text>
          <Text>Price Range: 1kg </Text>
          <Text>{item.Price}</Text>
        </View>
        <FilledButton
          title={"Order"}
          style={styles.orderButton}
          onPress={() => {
            this.props.navigation.navigate("Order");
          }}
        />
      </View>
    );
  };

  componentDidMount() {
    const myvegetables = firebase.database().ref("vegetables");
    myvegetables.on("value", (datasnap) => {
      this.setState({
        isLoading: false,
        dataSource: Object.values(datasnap.val()),
        filteredcrops: dataSource,
      });
    });
  }

  searchCrops(cropName) {
    this.setState({
      filteredcrops: this.state.dataSource.filter((i) =>
        i.name.toLowerCase().includes(cropName.toLowerCase())
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
            <Icon name="ios-search" style={styles.searchicon} />
            <TextInput
              placeholder="Search crops"
              style={styles.search}
              onChangeText={(text) => {
                this.searchCrops(text);
              }}
            />
          </Animatable.View>
        </View>
        <FlatList
          data={this.state.filteredcrops}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: 350,
    marginTop: 40,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  textinput: {
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  searchicon: {
    fontSize: 24,
    marginLeft: 30,
  },
  search: {
    fontSize: 20,
    marginLeft: 15,
    width: "100%",
  },
  items: {
    padding: 20,
    fontSize: 20,
    height: 70,
    borderRadius: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  orderButton: {
    backgroundColor: "#7F00FF",
    height: 10,
    width: 100,
    marginRight: 4,
    alignSelf: "center",
  },
});

export default withNavigation(HomeScreen);
