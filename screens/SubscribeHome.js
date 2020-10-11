import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { db } from "../database/db.js";
import firebase from "firebase";
import DropDownPicker from "react-native-dropdown-picker";

export default class SubscribeHome extends React.Component {
  state = {
    quantity: "",
    minPrice: "",
    crop: "",
    maxPrice: "",
    isVisibleText: false,
    isVisibleEcon: false,
  };

  changeVisibility(state) {
    this.setState({
      isVisibleText: false,
      isVisibleEcon: false,
      ...state,
    });
  }

  checkInput = () => {
    if (this.state.crop != "") {
      if (this.state.minPrice != "") {
        if (this.state.maxPrice != "") {
          if (this.state.quantity != "") {
            this.handlePost();
          } else {
            alert("Enter the Quantity");
          }
        } else {
          alert("Enter Maximum Price");
        }
      } else {
        alert("Enter Minimum Price");
      }
    } else {
      alert("Select the Crop Type");
    }
  };

  handlePost() {
    const user = firebase.auth().currentUser;
    const subs = db.ref("sub");
    subs.push({
      BuyerId: user.uid,
      crop: this.state.crop,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      quantity: this.state.quantity,
    });
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ marginTop: 66 }}>
            <View style={styles.form}>
              <View style={{ marginTop: 12 }}>
                <DropDownPicker
                  items={[
                    {
                      label: "Select the Crop Type",
                      value: "",
                      selected: true,
                      disabled: true,
                    },
                    {
                      label: "Potato (අල)",
                      value: "Potato (අල)",
                    },
                    { label: "Beans (බෝංචි)", value: "Beans (බෝංචි)" },
                    { label: "Carrot (කැරට්)", value: "Carrot (කැරට්)" },
                    {
                      label: "Pumpkin (වට්ටක්කා)",
                      value: "Pumpkin (වට්ටක්කා)",
                    },
                    { label: "Chilli (මිරිස්)", value: "Chilli (මිරිස්)" },
                    { label: "Cabbage (ගෝවා)", value: "Cabbage (ගෝවා)" },
                    { label: "Brinjal (වම්බටු)", value: "Brinjal (වම්බටු)" },
                    { label: "Tomato (තක්කාලි)", value: "Tomato (තක්කාලි)" },
                  ]}
                  placeholder="Select the Crop Type"
                  defaultValue={this.state.crop}
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: "white" }}
                  dropDownStyle={{
                    backgroundColor: "white",
                    marginTop: -100,
                  }}
                  isVisible={this.state.isVisibleText}
                  onOpen={() =>
                    this.changeVisibility({
                      isVisibleText: true,
                    })
                  }
                  onClose={() =>
                    this.setState({
                      isVisibleText: false,
                    })
                  }
                  onChangeItem={(item) =>
                    this.setState({
                      crop: item.value,
                    })
                  }
                />
              </View>
              <View style={{ marginTop: 62 }}>
                <Text style={styles.inputTitle}> Min Price </Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={(minPrice) => this.setState({ minPrice })}
                  value={this.state.minPrice}
                  keyboardType={"numeric"}
                ></TextInput>
              </View>
              <View style={{ marginTop: 32 }}>
                <Text style={styles.inputTitle}> Max Price </Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={(maxPrice) => this.setState({ maxPrice })}
                  value={this.state.maxPrice}
                  keyboardType={"numeric"}
                ></TextInput>
              </View>
              <View style={{ marginTop: 62 }}>
                <Text style={styles.inputTitle}> Quantity </Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={(quantity) => this.setState({ quantity })}
                  value={this.state.quantity}
                  keyboardType={"numeric"}
                ></TextInput>
              </View>
              <View style={{ marginTop: 32 }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.checkInput}
                >
                  <Text style={{ color: "#FFF", fontWeight: "500" }}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fbc8f",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#000000",
    fontSize: 14,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#000000",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  photo: {
    alignItems: "center",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#6b8e23",
    borderRadius: 40,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
