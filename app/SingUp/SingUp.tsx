import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type FormFields = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormFields>>({});

  const validate = () => {
    const newErrors: Partial<FormFields> = {};
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    } else if (/^\d+$/.test(form.name.trim())) {
      newErrors.name = "Name can't be only numbers.";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email format is invalid.";
      valid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (field: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await axios.post(
        "https://appointment-doctor-six.vercel.app/api/auth/register",
        form
      );
      setForm({ name: "", email: "", password: "" });
      Toast.show({
        type: "success",
        text1: "Registration Successful",
      });
      router.push("/Login/Login");
    } catch (error: any) {
      const message =
        error?.response?.data?.error || "Sign up failed. Please try again.";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
      });
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        padding: 20,
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <Text className="text-2xl font-bold mb-6 text-center">
        Create Account
      </Text>

      <View className="mb-4">
        <Text className="text-gray-700 mb-1">Full Name</Text>
        <TextInput
          className="border border-gray-300 rounded px-4 py-2"
          placeholder="Enter your name"
          value={form.name}
          onChangeText={(value) => handleChange("name", value)}
        />
        {errors.name && (
          <Text className="text-red-500 text-sm">{errors.name}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-1">Email</Text>
        <TextInput
          className="border border-gray-300 rounded px-4 py-2"
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && (
          <Text className="text-red-500 text-sm">{errors.email}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-1">Password</Text>
        <TextInput
          className="border border-gray-300 rounded px-4 py-2"
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
        />
        {errors.password && (
          <Text className="text-red-500 text-sm">{errors.password}</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-600 py-3 rounded-full mt-4"
      >
        <Text className="text-white text-center font-medium">
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/Login/Login")}
        className="mt-6"
      >
        <Text className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Text className="text-blue-600 underline">Login</Text>
        </Text>
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
};

export default SignUp;
