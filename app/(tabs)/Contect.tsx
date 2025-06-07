import { assets } from "@/mockdata/assets";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Contect = () => {
  return (
    <ScrollView>
      <View className="px-4 py-6">
        <View className="items-center">
          <Text className="text-2xl font-semibold text-gray-700 text-center">
            Find by Speciality
          </Text>
        </View>

        <Image
          source={assets.Contact_Us}
          className="w-full h-64 mt-8 mb-4"
          resizeMode="contain"
        />
        <View className="space-y-4  flex-col gap-5  ">
          <Text className="font-semibold text-lg text-gray-600">
            OUR OFFICE
          </Text>
          <Text className="text-gray-500">
            00000 Willms Station Suite{"\n"}000, Washington, USA
          </Text>

          <Text className="text-gray-500">
            Tel: (000) 000-0000{"\n"}Email: sadaqelmi@gmail.com
          </Text>

          <Text className="  font-semibold text-lg text-gray-600">
            CAREERS AT PRESCRIPTO
          </Text>

          <Text className="text-gray-500">
            Learn more about our teams and job openings.
          </Text>
        </View>
        <TouchableOpacity className="bg-white px-6 py-3 rounded-full mt-4">
          <Text className="text-[#5f6fff] font-semibold text-[10px] ">
            Book Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Contect;
