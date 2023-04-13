import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import "../styles.css";
import Hr from "react-native-hr-component";
import config from "./config.json";
import axios from "axios";

const Url = `${config.AddressApi}/damages`;

const Damages = ({ templateId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [damages, setDamages] = useState([]);

  const getData = async () => {
    const response = await axios.get(Url);
    setDamages(response.data.vehicleDefects);
    console.log("response", damages);
  };

  useEffect(() => {
    getData();
  }, []);

  const result = damages.filter((item) => item.templateSide == templateId);

  return (
    <View style={styles.templateBottom}>
      {result.map((data) => (
        <>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Image
              className="imgDamage"
              style={{
                height: "40px",
                width: "40px",
                top: data.templateCoordinates.y + 100 + "px",
                left: data.templateCoordinates.x + 100 + "px",
              }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfwfyuuVtm96nCcScRYYkj3iL7BztHU8RcI67eLt-sMa3Vui3thLj2Kcy0HWLnv15fHyY&usqp=CAU",
              }}
            />
          </TouchableOpacity>
          <div className="Description ">
            <p>
              <b> {data.templateSide} </b>
            </p>
            <Hr lineColor="#f4ebeb" width="1" />
            <p style={{ fontWeight: "bold" }}> Existing Defects </p>

            <Hr lineColor="#f4ebeb" width="1" />
            <p> {data.description}</p>
            <Hr lineColor="#f4ebeb" />
          </div>
          <div>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>View Defect</Text>
                    <Hr lineColor="#d8d1d1" width="1" />
                    <Text style={styles.modalText}>
                      <b> Data</b> <br /> {data.date}
                    </Text>
                    <Text style={styles.modalText}>
                      description <br /> {data.description}
                    </Text>

                    <Text style={styles.modalText}>
                      <b>Notes </b> <br /> {data.images.fileName}
                    </Text>

                    <Text style={styles.modalText}>
                      templateSide: <br /> {data.templateSide}
                    </Text>
                    <Hr lineColor="#d8d1d1" width="2" />
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>close</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </div>
        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "left",
    alignItems: "center",
    marginTop: 150,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    width: 300,
    borderRadius: 10,
    padding: 35,
    alignItems: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "rgb(163, 161, 161)",
  },
  buttonClose: {
    backgroundColor: "rgb(163, 161, 161)",
    width: 100,
    textAlign: "center",
    margin: "10px",
    right: "5px",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
  },

  templateBottom: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "left",
  },
});

export default Damages;
