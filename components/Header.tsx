import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const router = useRouter();

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
              className="w-14 h-14 rounded-full opacity-70"
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
        <Menu.Item onPress={() => {}} title="Logout" />
      </Menu>
    </View>
  );
};

export default Header;
