import { Slot, usePathname, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import "../../global.css";

export default function AuthLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");

        const isLoginPage = pathname === "/Login/Login";

        if (!token && !isLoginPage) {
          router.replace("/Login/Login");
        } else if (token && isLoginPage) {
          // already logged in and trying to access login screen — redirect to main
          router.replace("/Home");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setLoading(false); // make sure spinner stops
      }
    };

    checkAuth();
  }, [pathname]); // 🔁 depend on route

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <Slot />
      <Toast />
    </>
  );
}
