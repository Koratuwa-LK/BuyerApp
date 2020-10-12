import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Button, Title, Paragraph, Text } from 'react-native-paper';
import firebase from "firebase";


import { db } from "../database/db.js";


export default function NotificationScreen() {

  const [notification, setNotification] = useState({ notificationList: [] })

  useEffect(() => {

    const BuyerId = firebase.auth().currentUser.uid;


    let subscriptionlist;
    let tempsubscriptionList = [];
    let stockslist;
    let tempstockList = [];

    const subscriptions = db.ref("sub").orderByChild("BuyerId").equalTo(BuyerId);
    subscriptions.on('value', snapshot => {
      const subscriptionlist = snapshot.val();
      for (let key in subscriptionlist) {
        tempsubscriptionList.push(subscriptionlist[key])
      }
      const stocks = db.ref("Stocks");
      stocks.on('value', snapshot => {
        const stockslist = snapshot.val();
        for (let key in stockslist) {
          tempstockList.push(stockslist[key])
        }
        const tempNotificationList = []

        tempsubscriptionList.map(sub => {
          tempstockList.map(stock => {
            if (sub['maxPrice'] > stock['price'] && sub['minPrice'] < stock['price'] && sub['crop'] == stock['crop'] && sub['quantity'] <= stock['quantity']) {
              tempNotificationList.push(stock)
              console.log(tempNotificationList)
            }
          })
        })
        setNotification({ notificationList: tempNotificationList })
      })

    })






  }, [])

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>

        {
          notification.notificationList.map(val => {
            return (
              <Card style={styles.card} key={val.timestamp}>
                <Card.Content>
                  <Title style={{color: 'green'}}>{val.crop}</Title>
                  <Paragraph>Farmer Name : {val.name}</Paragraph>
                  <Paragraph>Eco Center : {val.economicCenter}</Paragraph>
                  <Paragraph>Farmer Contact No : {val.phoneNum}</Paragraph>
                  <Paragraph>Price : {val.price}</Paragraph>
                  <Paragraph>Quantity : {val.quantity}</Paragraph>
                </Card.Content>
                <Card.Actions style={{ alignSelf: "flex-end" }}>
                  <Button onPress={() => console.log("Sahan")}>Ignore</Button>
                </Card.Actions>
              </Card>
            )
          })
        }
      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {

  },
  card: {
      flex: 1,
      flexDirection: "row",
      borderRadius: 5,
      borderColor: "green",
      borderWidth: 2,
      marginBottom: 1,
    marginHorizontal: 10,
    marginVertical: 4
  }
});
