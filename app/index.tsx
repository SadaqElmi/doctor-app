import Book from "@/components/Book";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Speciality from "@/components/Speciality";
import TopDoctors from "@/components/TopDoctors";
import { ScrollView, View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <ScrollView>
      <View>
        <HeroSection />
        <Speciality />
        <TopDoctors />
        <Book />
        <Footer />
      </View>
    </ScrollView>
  );
}
