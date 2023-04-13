import React, { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import "./styles.css";
import Defects from "./Screen/Defects";
import Hr from "react-native-hr-component";
import { View } from "react-native-web";
import config from "./Screen/config.json";
import axios from "axios";

const Url = config.AddressApi;
const App = () => {
  const [template, setTemplate] = useState("");
  const [Data, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get(Url);
    setData(response.data.sideImages);
    console.log("response", Data);
  };

  useEffect(() => {
    getData();
  }, []);

  const callTemplate = (props) => {
    console.log("pass Data =", props);
    setTemplate(props);
  };
  return (
    <>
      <div className="wrapperImg">
        <div className="templateImage">
          {Data.map((item) => (
            <>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => callTemplate(item.vehicleTemplateSide)}
              >
                <p className="imageHover">
                  <Image
                    id="element"
                    style={styles.image}
                    source={{
                      uri: `data:image/png;base64,${item.image.image}`,
                    }}
                  />
                </p>
              </TouchableOpacity>
            </>
          ))}
        </div>

        <View>
          {" "}
          <Hr lineColor="#d8d1d1" width="1" />{" "}
        </View>
        <Defects defectsId={template} />
      </div>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "100px",
    width: "200px",
    paddingVertical: 5,
  },
});

export default App;
