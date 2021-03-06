import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

import OrderItemDetails from "./OrderItemDetails";

const OrderList = ({ itemList, navigation, user, token, language }) => {
  const refRBSheet = useRef();

  return (
    <View
      style={{
        paddingBottom: 200,
        borderBottomWidth: 10,
        borderColor: "#edeeef",
      }}
    >
      <View style={styles.body}>
        <Text style={styles.text}>
          {language === "te"
            ? "నా ఆదేశాలు"
            : language === "hi"
            ? "मेरे आदेश"
            : language === "ka"
            ? "ನನ್ನ ಆಜ್ಞೆಗಳು"
            : language === "ta"
            ? "என்னுடைய உத்தரவுகள்"
            : "My Orders"}
        </Text>
      </View>
      <FlatList
        data={itemList}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <OrderItemDetails
              item={item}
              navigation={navigation}
              user={user}
              token={token}
              language={language}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    padding: Dimensions.get("screen").width * 0.02041,
    paddingHorizontal: Dimensions.get("screen").width * 0.04082,
    marginBottom: 4,
  },
  text: {
    fontFamily: "popins-semibold",
    fontSize: 22,
    color: "#20263e",
    marginLeft: 3,
  },
  view: {
    fontFamily: "popins-bold",
    fontSize: 18,
    color: "#20263e",
    paddingTop: 10,
    position: "absolute",
    right: Dimensions.get("screen").width * 0.10714,
  },

  slider: {
    position: "absolute",
    top: -5,
    right: -10,
    alignItems: "center",
    width: 80,
    borderRadius: 5,
    padding: 2,
  },
  heading: {
    fontFamily: "popins-med",
    fontSize: 20,
    color: "#20263e",
    paddingHorizontal: 8,
    letterSpacing: 0.5,
    textAlign: "left",
  },
});

export default OrderList;
