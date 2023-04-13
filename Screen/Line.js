import React from "react";
import { View, StyleSheet } from "react-native";
// import "../styles.css";

const Line = () => {
  return <View style={styles.lineStyle} />;
};

const styles = StyleSheet.create({
  lineStyle: {
    border: "3px",
    width: "200px",
    paddingVertical: 5,
    borderColor: "gray",
  },
});
export default Line;
