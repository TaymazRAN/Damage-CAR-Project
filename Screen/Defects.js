import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import "../styles.css";
import Damages from "./Damages";
import config from "./config.json";
import axios from "axios";

const Url = config.AddressApi;
const Defects = ({ defectsId }) => {
  const [Data, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get(Url);
    setData(response.data.sideImages);
    console.log("response", Data);
  };

  useEffect(() => {
    getData();
  }, []);

  const showImage = Data.filter(
    (item) => item.vehicleTemplateSide == defectsId
  );
  return (
    <>
      <View style={styles.templateBottom}>
        {showImage.map((item) => (
          <>
            <ImageBackground
              source={`data:image/png;base64,${item.image.image}`}
              resizeMode="cover"
              style={styles.imageScreen}
            >
              <Damages templateId={defectsId} />
            </ImageBackground>
          </>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  templateBottom: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    // direction: "ltr",
    justifyContent: "flex-start",
    textAlign: "left",
  },
  imageScreen: {
    height: "500px",
    width: "500px",
    position: "relative",
    textAlign: "left",
    justifyContent: "flex-start",
    marginLeft: "20%",
  },
});

export default Defects;
