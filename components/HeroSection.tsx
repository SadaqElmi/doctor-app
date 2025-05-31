import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const HeroSection = () => {
  const router = useRouter();

  return (
    <View className="bg-[#5f6fff] flex-col items-center px-4 mx-4 mt-4 rounded-lg">
      <Text className="text-white text-[35px] font-bold text-start mx-3 my-6">
        Book Appointment With Trusted Doctors
      </Text>

      <Image
        source={require("../assets/images/group_profiles.png")}
        className="w-38 mb-8"
        resizeMode="contain"
      />

      <Text className="text-white text-sm font-light mx-2">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </Text>

      {/* Book Button */}
      <TouchableOpacity
        className="bg-white px-6 py-3 rounded-full mt-4"
        onPress={() => router.push("/AllDoctors")}
      >
        <Text className="text-[#5f6fff] font-semibold text-[10px] ">
          Book Appointment
        </Text>
      </TouchableOpacity>

      <View className="relative w-full h-[300px] mt-4">
        <Image
          source={require("../assets/images/header_img.png")}
          className="absolute bottom-0 left-0 w-full h-full"
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default HeroSection;
