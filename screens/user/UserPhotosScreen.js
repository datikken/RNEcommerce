import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useDispatch } from "react-redux";
import { Text, View, StyleSheet, Image, Button, Alert } from "react-native";

async function askFormPermissions() {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );
  if (status !== "granted") {
    Alert.alert("Error", "No camera access");
    return false;
  } else {
    return true;
  }
}

const UserPhotosScreen = props => {
  const dispatch = useDispatch();

  const takePhoto = async () => {
    const hasPermissions = await askFormPermissions();
    if (!hasPermissions) {
        return;
      }
      //камера
      const img = await ImagePicker.launchCameraAsync({
        quality: 1,
        allowsEditing: true,
        aspect: [16, 9]
      });
      
      setImage(img.uri);
  };

  const [image, setImage] = useState(null);

  return (
    <View style={S.wrapper}>
      <Button title="Fetch"  onPress={() => dispatch(savePhoto.trigger({}))}/>
      <Button title='+' onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={S.image} />}
    </View>
  );
};

const S = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10
  }
});

export default UserPhotosScreen;