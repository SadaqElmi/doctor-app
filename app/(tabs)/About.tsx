import { assets } from "@/mockdata/assets";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function About() {
  return (
    <ScrollView>
      <View className="px-4 py-6">
        <View className="items-center">
          <Text className="text-2xl font-semibold text-gray-700 text-center">
            Find by Speciality
          </Text>
        </View>

        <Image
          source={assets.About_Us}
          className="w-full h-64 mt-8 mb-4"
          resizeMode="contain"
        />

        <View className="space-y-4">
          <Text className="text-sm text-gray-700">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </Text>
          <Text className="text-sm text-gray-700">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service.
          </Text>
          <Text className="text-base font-medium text-gray-800">
            Our Vision
          </Text>
          <Text className="text-sm text-gray-700">
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers.
          </Text>
        </View>

        <View className="mt-10 mb-4">
          <Text className="text-xl font-semibold text-gray-800">
            WHY CHOOSE PRESCRIPTO?
          </Text>
        </View>

        <View className="space-y-4 flex flex-col gap-5">
          <View className="border border-gray-300 rounded-md p-4 bg-white">
            <Text className="font-semibold text-gray-800 mb-1">
              EFFICIENCY:
            </Text>
            <Text className="text-sm text-gray-600">
              Easy appointment scheduling that fits your busy day.
            </Text>
          </View>

          <View className="border border-gray-300 rounded-md p-4 bg-white">
            <Text className="font-semibold text-gray-800 mb-1">
              CONVENIENCE:
            </Text>
            <Text className="text-sm text-gray-600">
              Access trusted healthcare professionals near you.
            </Text>
          </View>

          <View className="border border-gray-300 rounded-md p-4 bg-white mb-10">
            <Text className="font-semibold text-gray-800 mb-1">
              PERSONALIZATION:
            </Text>
            <Text className="text-sm text-gray-600">
              Get tailored recommendations and reminders for your health.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
