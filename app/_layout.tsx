import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import Toast from "react-native-toast-message";
import "../global.css";

export default function RootLayout() {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Header />
          <Tabs
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: "#007aff",
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                backgroundColor: "#fff",
                paddingBottom: 5,
                height: 60,
              },
              tabBarIcon: ({ focused, color, size }) => {
                type IoniconName = React.ComponentProps<
                  typeof Ionicons
                >["name"];
                let iconName: IoniconName;

                switch (route.name) {
                  case "index":
                    iconName = focused ? "home" : "home-outline";
                    break;
                  case "About":
                    iconName = focused
                      ? "information-circle"
                      : "information-circle-outline";
                    break;
                  case "AllDoctors":
                    iconName = focused ? "people" : "people-outline";
                    break;
                  case "Contect":
                    iconName = focused ? "call" : "call-outline";
                    break;
                  default:
                    iconName = "ellipse";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen
              name="AllDoctors"
              options={{ title: "Doctors", headerShown: false }}
            />
            <Tabs.Screen
              name="About"
              options={{ title: "About", headerShown: false }}
            />
            <Tabs.Screen
              name="Contect"
              options={{ title: "Contact", headerShown: false }}
            />
          </Tabs>
        </View>
      </SafeAreaView>
      <Toast />
    </PaperProvider>
  );
}
