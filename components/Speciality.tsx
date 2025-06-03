import { specialityData } from "@/mockdata/assets";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Speciality = () => {
  const router = useRouter();
  return (
    <View className="flex items-center justify-center py-16 mb-16">
      <View className="flex flex-col gap-3 justify-center items-center w-full">
        <Text className="text-3xl font-medium">Find by Speciality</Text>
        <Text className="text-lg font-extralight text-center">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </Text>
      </View>

      <View className="flex-row flex-wrap justify-center items-center w-full gap-6 mt-10">
        {specialityData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              router.push({
                pathname: "/screens/speciality/[speciality]",
                params: { speciality: item.speciality },
              });
            }}
            className="flex flex-col justify-center items-center"
          >
            <Image source={item.image} className="w-16 h-16 mb-2" />
            <Text className="text-sm font-light text-center">
              {item.speciality}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Speciality;
