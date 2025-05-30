import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import "../global.css";

export default function Index() {
  const router = useRouter();

  return (
    <ScrollView>
      <View className="bg-[#5f6fff] flex-col items-center px-4 mx-4 mt-4 rounded-lg">
        <Text className="text-white text-2xl font-bold text-center mt-10">
          Book Appointment With Trusted Doctors
        </Text>

        <Image
          source={require("../assets/images/group_profiles.png")}
          className="w-44 h-24"
          resizeMode="contain"
        />

        <Text className="text-white text-base text-center">
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

        <View className="relative flex items-center justify-center w-full ">
          <Image
            source={require("../assets/images/header_img.png")}
            className="w-full   bottom-0"
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
}
