import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type Appointment = {
  payment: boolean;
  _id: string;
  cancelled?: number;
  slotDate?: string;
  slotTime?: string;
  docId?: {
    image?: string;
    name?: string;
    specialization?: string;
    address?: {
      street?: string;
      city?: string;
    };
  };
};

const MyAppointments = () => {
  const userId = "demo-user-id"; // Replace with actual auth ID
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("https://appointment-doctor-six.vercel.app/api/myAppointments", {
        userId,
      })
      .then((res) => {
        if (res.data.success) setAppointments(res.data.appointments);
      })
      .catch((err) => console.error("Failed to fetch appointments", err))
      .finally(() => setLoading(false));
  }, []);

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const res = await axios.post(
        "https://appointment-doctor-six.vercel.app/api/cancelAppointment",
        { appointmentId }
      );
      if (res.data.success) {
        setAppointments((prev) =>
          prev.map((a) =>
            a._id === appointmentId ? { ...a, cancelled: 1 } : a
          )
        );
        Toast.show({
          type: "success",
          text1: "Appointment cancelled",
        });
      }
    } catch (err) {
      console.error("Cancel failed:", err);
      Toast.show({ type: "error", text1: "Failed to cancel appointment" });
    }
  };

  const payByCash = async (appointmentId: string) => {
    try {
      const res = await axios.post(
        "https://appointment-doctor-six.vercel.app/api/myAppointments/payCash",
        { appointmentId }
      );
      if (res.data.success) {
        setAppointments((prev) =>
          prev.map((a) =>
            a._id === appointmentId ? { ...a, payment: true } : a
          )
        );
        Toast.show({
          type: "success",
          text1: "Marked as paid by cash",
        });
      }
    } catch (err) {
      console.error("Cash payment failed:", err);
      Toast.show({ type: "error", text1: "Cash payment failed" });
    }
  };

  if (loading) return <ActivityIndicator className="mt-10" />;

  const upcoming = appointments.filter((a) => a.cancelled !== 1);

  return (
    <ScrollView className="p-4 bg-white">
      <Text className="text-lg font-semibold text-gray-700 mb-4">
        My Appointments ({upcoming.length})
      </Text>

      {upcoming.length === 0 ? (
        <Text className="text-gray-500">No upcoming appointments.</Text>
      ) : (
        upcoming.map((appointment) => (
          <View
            key={appointment._id}
            className="border-b border-gray-200 pb-4 mb-6"
          >
            <Image
              source={{
                uri:
                  appointment.docId?.image || "https://via.placeholder.com/150",
              }}
              className="w-full h-48 rounded-md mb-3"
              resizeMode="cover"
            />
            <Text className="text-xl font-bold text-[#262626] mb-1">
              {appointment.docId?.name}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              {appointment.docId?.specialization}
            </Text>
            <Text className="text-sm text-gray-700 mb-1">
              📍 {appointment.docId?.address?.street},{" "}
              {appointment.docId?.address?.city}
            </Text>
            <Text className="text-sm text-gray-700 mb-3">
              🗓 {appointment.slotDate} | ⏰ {appointment.slotTime}
            </Text>

            {appointment.payment ? (
              <Text className="text-green-600 font-semibold">Paid by Cash</Text>
            ) : (
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => payByCash(appointment._id)}
                  className="bg-blue-600 px-4 py-2 rounded-full"
                >
                  <Text className="text-white text-sm">Pay by Cash</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => cancelAppointment(appointment._id)}
                  className="bg-red-500 px-4 py-2 rounded-full"
                >
                  <Text className="text-white text-sm">Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))
      )}

      <Toast />
    </ScrollView>
  );
};

export default MyAppointments;
