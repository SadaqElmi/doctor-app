import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://appointment-doctor-six.vercel.app/api/auth/Login",
        { email, password }
      );

      if (res.data.success && res.data.token) {
        await SecureStore.setItemAsync("userToken", res.data.token);
        await SecureStore.setItemAsync(
          "userData",
          JSON.stringify(res.data.user)
        );

        Toast.show({ type: "success", text1: "Login successful" });

        setEmail("");
        setPassword("");

        router.replace("/Home");
      } else {
        throw new Error("Invalid response");
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.error || "Login failed. Please try again.";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
        Login
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#5F6FFF",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/SingUp/SingUp")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ textAlign: "center", color: "#5F6FFF" }}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
};

export default Login;
