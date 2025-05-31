import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Book = () => {
  return (
    <View
      style={{
        backgroundColor: "#5f6fff",
        borderRadius: 16,
        padding: 24,
        marginVertical: 32,
        marginHorizontal: 16,
        alignItems: "flex-start",
        justifyContent: "center",
        height: 200,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "400",
          marginBottom: 4,
        }}
      >
        Book Appointment
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 16,
        }}
      >
        With 100+ Trusted Doctors
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "white",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 999,
        }}
      >
        <Text
          style={{
            color: "#333",
            fontSize: 14,
            fontWeight: "400",
          }}
        >
          Create Appointment
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Book;
