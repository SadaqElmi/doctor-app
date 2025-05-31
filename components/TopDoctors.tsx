import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
type Doctor = {
  available: boolean;
  _id: string;
  name: string;
  image: string;
  specialization: string;
};

const { width } = Dimensions.get("window");

const TopDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://appointment-doctor-six.vercel.app/api/doctor")
      .then((res) => {
        if (res.data.success) {
          setDoctors(res.data.doctors);
        }
      })
      .catch((err) => console.error("Failed to fetch doctors:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ paddingVertical: 20, alignItems: "center" }}>
        <Text style={{ color: "gray", fontSize: 18 }}>Loading doctors...</Text>
      </View>
    );
  }

  const itemWidth = width > 768 ? width / 4 - 32 : width / 2 - 24;
  const visibleDoctors = showAll ? doctors : doctors.slice(0, 7);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        paddingVertical: 40,
        paddingBottom: 80,
      }}
    >
      <View style={{ marginBottom: 40, maxWidth: "50%", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "500", textAlign: "center" }}>
          Top Doctors to Book
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "200",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          Simply browse through our extensive list of trusted doctors.
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingHorizontal: 8,
        }}
      >
        {visibleDoctors.map((item) => (
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
            style={{
              width: itemWidth,
              borderWidth: 1,
              borderColor: "#C9D8FF",
              borderRadius: 12,
              overflow: "hidden",
              margin: 8,
            }}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: 222, backgroundColor: "#EAEFFF" }}
              resizeMode="contain"
            />
            <View style={{ padding: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: item.available ? "green" : "red",
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    color: item.available ? "green" : "red",
                    fontSize: 14,
                  }}
                >
                  {item.available ? "Available" : "Unavailable"}
                </Text>
              </View>

              <Text
                style={{ color: "#262626", fontSize: 18, fontWeight: "500" }}
              >
                {item.name}
              </Text>
              <Text
                style={{ color: "#5C5C5C", fontSize: 14, fontWeight: "200" }}
              >
                {item.specialization}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {doctors.length > 7 && !showAll && (
        <TouchableOpacity
          style={{
            backgroundColor: "#C9D8FF",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 999,
            marginTop: 20,
          }}
          onPress={() => setShowAll(true)}
        >
          <Text style={{ color: "#4F4F4F", fontSize: 16, fontWeight: "500" }}>
            Show All
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default TopDoctors;
