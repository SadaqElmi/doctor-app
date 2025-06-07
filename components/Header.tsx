import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";
import Toast from "react-native-toast-message";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const router = useRouter();
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    await SecureStore.deleteItemAsync("userData");
    router.replace("/Login/Login");
    Toast.show({
      type: "success",
      text1: "Logged out successfully",
    });
  };

  return (
    <View className="flex-row justify-between items-center  px-2 mt-10">
      <Image
        source={require("../assets/images/logo.png")}
        className="w-44 h-24"
        resizeMode="contain"
      />
      {/* icon */}
      <Menu
        style={{ marginTop: 20, marginRight: 10, backgroundColor: "#fff" }}
        anchorPosition="bottom"
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity
            onPress={openMenu}
            className="flex-row items-center space-x-1 "
          >
            <Image
              source={require("../assets/images/upload_area.png")}
              className="w-10 h-10 rounded-full opacity-70"
              resizeMode="cover"
            />
            <Ionicons name="chevron-down" size={22} color="#999" />
          </TouchableOpacity>
        }
      >
        <Menu.Item
          onPress={() => {
            closeMenu();
            router.push("/profile");
          }}
          title="Profile"
        />
        <Menu.Item onPress={() => {}} title="Settings" />
        <Menu.Item
          onPress={() => {
            closeMenu();
            handleLogout(); // ✅ now it's called
          }}
          title="Logout"
        />
      </Menu>
    </View>
  );
};

export default Header;
