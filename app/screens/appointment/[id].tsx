import Header from "@/components/Header";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const timeSlots = [
  "10:30 am",
  "11:00 am",
  "11:30 am",
  "12:00 pm",
  "12:30 pm",
  "1:00 pm",
  "1:30 pm",
];

const Appointment = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // replace this with real user data from context or storage
  const currentUser = {
    id: "u1",
    name: "Test User",
    email: "test@example.com",
  };

  useEffect(() => {
    axios
      .get("https://appointment-doctor-six.vercel.app/api/doctor")
      .then((res) => {
        if (res.data.success) setDoctors(res.data.doctors);
      })
      .catch((err) => console.error("Error fetching doctors", err))
      .finally(() => setLoading(false));
  }, []);

  const doctor = doctors.find((doc) => doc._id === id);
  const relatedDoctors = doctors.filter(
    (doc) =>
      doc.specialization === doctor?.specialization && doc._id !== doctor?._id
  );

  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().split("T")[0],
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        number: date.getDate(),
      };
    });
  }, []);

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !doctor || !currentUser) {
      Toast.show({
        type: "info",
        text1: "Please select a date and time",
      });

      return;
    }

    const appointment = {
      userId: currentUser.id,
      docId: doctor._id,
      slotDate: selectedDate,
      slotTime: selectedTime,
      userData: {
        name: currentUser.name,
        email: currentUser.email,
      },
      docData: {
        name: doctor.name,
        specialization: doctor.specialization,
      },
      amount: doctor.fees,
      date: Date.now(),
      cancelled: 0,
      payment: false,
      isCompleted: false,
    };

    try {
      const res = await axios.post(
        "https://appointment-doctor-six.vercel.app/api/bookAppointment",
        appointment
      );
      if (res.data.success) {
        Toast.show({
          type: "success",
          text1: "Appointment booked",
          text2: "Your appointment has been scheduled.",
        });

        setSelectedDate(null);
        setSelectedTime(null);
        router.push("/myAppointments/MyAppointments");
      } else {
        Toast.show({
          type: "error",
          text1: "Booking failed.",
        });
      }
    } catch (err) {
      console.error("Booking failed:", err);
      Toast.show({
        type: "error",
        text1: "Something went wrong.",
      });
    }
  };

  if (loading) return <Text className="p-4">Loading...</Text>;
  if (!doctor) return <Text className="p-4">Doctor not found</Text>;

  return (
    <ScrollView className="p-4 bg-white">
      <Header />
      {/* Doctor Header */}
      <View className="items-center mb-6">
        <Image
          source={{ uri: doctor.image }}
          className="w-60 h-60 rounded-xl mb-4 bg-blue-200"
          resizeMode="cover"
        />
        <Text className="text-xl font-bold">{doctor.name}</Text>
        <Text className="text-gray-600">
          {doctor.degree} - {doctor.specialization}
        </Text>
        <Text className="text-xs text-blue-600">{doctor.experience} Years</Text>
        <Text className="mt-2 text-sm text-gray-700">{doctor.about}</Text>
        <Text className="mt-2 font-semibold text-base">
          Fee: ${doctor.fees}
        </Text>
      </View>

      {/* Booking Section */}
      <Text className="font-medium text-lg mb-2">Select a Date:</Text>
      <View className="flex-row flex-wrap gap-2 mb-6">
        {dates.map((d) => (
          <TouchableOpacity
            key={d.date}
            onPress={() => {
              setSelectedDate(d.date);
              setSelectedTime(null);
            }}
            className={`rounded-full px-4 py-2 border ${
              selectedDate === d.date ? "bg-blue-500" : "bg-white"
            }`}
          >
            <Text
              className={`text-sm ${
                selectedDate === d.date ? "text-white" : "text-gray-700"
              }`}
            >
              {d.day} {d.number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedDate && (
        <>
          <Text className="font-medium text-lg mb-2">Select a Time:</Text>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                onPress={() => setSelectedTime(time)}
                className={`px-4 py-2 rounded-full border ${
                  selectedTime === time ? "bg-blue-500" : "bg-white"
                }`}
              >
                <Text
                  className={`text-sm ${
                    selectedTime === time ? "text-white" : "text-gray-700"
                  }`}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <TouchableOpacity
        className="bg-blue-600 py-3 rounded-full items-center"
        onPress={handleBookAppointment}
      >
        <Text className="text-white text-sm font-semibold text-center">
          Book Appointment
        </Text>
      </TouchableOpacity>

      {/* Related Doctors */}
      {relatedDoctors.length > 0 && (
        <View className="mt-12">
          <Text className="text-xl font-medium mb-4 text-center">
            Related Doctors
          </Text>
          <View className="flex flex-col gap-4 mb-12">
            {relatedDoctors.map((item) => (
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
                  router.push({
                    pathname: "/screens/appointment/[id]",
                    params: { id: item._id },
                  });
                }}
                className="border border-gray-300 rounded-lg overflow-hidden"
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
        </View>
      )}
    </ScrollView>
  );
};

export default Appointment;
