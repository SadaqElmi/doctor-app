import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import "../../global.css";

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
                paddingBottom: 10,
                paddingTop: 5,
                height: 60,
              },
              tabBarIcon: ({ focused, color, size }) => {
                type IoniconName = React.ComponentProps<
                  typeof Ionicons
                >["name"];

                const iconMap: Record<
                  string,
                  { active: IoniconName; inactive: IoniconName }
                > = {
                  Home: { active: "home", inactive: "home-outline" },
                  About: {
                    active: "information-circle",
                    inactive: "information-circle-outline",
                  },
                  AllDoctors: { active: "people", inactive: "people-outline" },
                  Contect: { active: "call", inactive: "call-outline" },
                };

                const icons = iconMap[route.name];
                if (!icons) return null;

                const iconName = focused ? icons.active : icons.inactive;
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tabs.Screen name="Home" options={{ title: "Home" }} />
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
