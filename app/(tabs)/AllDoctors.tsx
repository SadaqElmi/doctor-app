import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const specialities = [
  "All",
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

type Doctor = {
  available: boolean;
  _id: string;
  name: string;
  image: string;
  specialization: string;
};

const AllDoctors = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState("All");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://appointment-doctor-six.vercel.app/api/doctor")
      .then((res) => {
        if (res.data.success) setDoctors(res.data.doctors);
      })
      .catch((err) => console.error("Failed to fetch doctors:", err));
  }, []);

  const filteredDoctors =
    selectedSpecialist === "All"
      ? doctors
      : doctors.filter((doc) => doc.specialization === selectedSpecialist);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-gray-700 text-base mb-4">
        Browse through the doctors specialist.
      </Text>

      {/* Filters Section */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => setShowFilters(!showFilters)}
          className="bg-blue-600 px-4 py-2 rounded self-start"
        >
          <Text className="text-white font-semibold text-sm">Filters</Text>
        </TouchableOpacity>

        {showFilters && (
          <View className="space-y-2 mt-4">
            {specialities.map((spec) => (
              <TouchableOpacity
                key={spec}
                onPress={() => {
                  setSelectedSpecialist(
                    selectedSpecialist === spec ? "All" : spec
                  );
                }}
                className={`border border-gray-300 px-4 py-3 rounded ${
                  selectedSpecialist === spec ? "bg-blue-100" : "bg-white"
                }`}
              >
                <Text className="text-gray-700 text-sm">{spec}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Doctors List */}
      <View className="flex flex-col gap-4">
        {filteredDoctors.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              if (!item.available) {
                Toast.show({
                  type: "info",
                  text1: "Doctor is currently unavailable.",
                });
                return;
              }
              router.push(`/screens/appointment/${item._id}`);
            }}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <View className="bg-[#EAEFFF] px-4 pt-6  items-center justify-center">
              <Image
                source={{ uri: item.image }}
                className="w-full h-[270px]"
                resizeMode="contain"
              />
            </View>

            <View className="px-4 py-3 space-y-1">
              <View className="flex-row items-center gap-2">
                <View
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <Text
                  className={`text-xs ${
                    item.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </Text>
              </View>
              <Text className="text-base font-semibold text-gray-800">
                Dr. {item.name}
              </Text>
              <Text className="text-sm text-gray-500">
                {item.specialization}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default AllDoctors;
