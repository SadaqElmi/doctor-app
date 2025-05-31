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
                  case "(tabs)/About":
                    iconName = focused
                      ? "information-circle"
                      : "information-circle-outline";
                    break;
                  case "(tabs)/AllDoctors":
                    iconName = focused ? "people" : "people-outline";
                    break;
                  case "(tabs)/Contect":
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
              name="(tabs)/About"
              options={{ title: "About", headerShown: false }}
            />
            <Tabs.Screen
              name="(tabs)/AllDoctors"
              options={{ title: "Doctors", headerShown: false }}
            />
            <Tabs.Screen
              name="(tabs)/Contect"
              options={{ title: "Contact", headerShown: false }}
            />
          </Tabs>
        </View>
      </SafeAreaView>
      <Toast />
    </PaperProvider>
  );
}
