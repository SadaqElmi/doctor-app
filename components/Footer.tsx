import { assets } from "@/mockdata/assets";
import React from "react";
import { Image, Text, View } from "react-native";

const Footer = () => {
  return (
    <>
      <View className="flex flex-col gap-10 px-6 mt-20">
        {/* Logo + Description */}
        <View className="flex flex-col items-start">
          <Image
            source={assets.logo}
            style={{ width: 120, height: 40, resizeMode: "contain" }}
            className="mb-4"
          />
          <Text className="text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
        </View>

        {/* Company Links */}
        <View>
          <Text className="text-black text-base font-semibold mb-3">
            COMPANY
          </Text>
          <View className="flex flex-col gap-1">
            <Text className="text-gray-600">Home</Text>
            <Text className="text-gray-600">About us</Text>
            <Text className="text-gray-600">Delivery</Text>
            <Text className="text-gray-600">Privacy policy</Text>
          </View>
        </View>

        {/* Contact */}
        <View>
          <Text className="text-black text-base font-semibold mb-3">
            GET IN TOUCH
          </Text>
          <View className="flex flex-col gap-1">
            <Text className="text-gray-600">+0-000-000-000</Text>
            <Text className="text-gray-600">Sadaqelmi123@gmail.com</Text>
          </View>
        </View>
      </View>

      {/* Bottom Text */}
      <View className="border-t border-gray-300 mt-10 pt-4">
        <Text className="text-center text-gray-600 text-sm mb-5">
          © 2023 Sadaqelmi.dev. All rights reserved.
        </Text>
      </View>
    </>
  );
};

export default Footer;
