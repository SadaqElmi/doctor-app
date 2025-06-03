import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  image: string;
  phone?: string;
  gender?: string;
  dob?: string;
  address?: {
    line1?: string;
    line2?: string;
  };
};

const dummyUser: UserProfile = {
  id: "123",
  name: "John Doe",
  email: "john@example.com",
  image: "",
  phone: "",
  gender: "",
  dob: "",
  address: { line1: "", line2: "" },
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile>(dummyUser);

  const [form, setForm] = useState({
    phone: user.phone || "",
    gender: user.gender || "",
    dob: user.dob || "",
    address1: user.address?.line1 || "",
    address2: user.address?.line2 || "",
    imageFile: null as any,
    previewImage: user.image || "",
  });

  const calculateAge = (dob: string) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setForm((prev) => ({
        ...prev,
        previewImage: result.assets[0].uri,
        imageFile: result.assets[0],
      }));
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const data = new FormData();

    if (form.imageFile) {
      data.append("image", {
        uri: form.imageFile.uri,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);
    }

    data.append("phone", form.phone);
    data.append("gender", form.gender);
    data.append("dob", form.dob);
    data.append("address1", form.address1);
    data.append("address2", form.address2);

    try {
      const res = await axios.put(
        "https://appointment-doctor-six.vercel.app/api/profile",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.status === 200) {
        alert("Profile updated!");
        setIsEditing(false);
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <ScrollView>
      <View className="p-4">
        {/* Profile Image */}
        <TouchableOpacity
          className="items-center mb-4"
          onPress={isEditing ? handlePickImage : undefined}
        >
          <Image
            source={
              form.previewImage
                ? { uri: form.previewImage }
                : require("../assets/images/profile_pic.png")
            }
            className="w-32 h-32 rounded-full border"
          />
          {isEditing && (
            <Text className="text-blue-500 mt-1 text-sm">
              Tap to change photo
            </Text>
          )}
        </TouchableOpacity>

        {/* Name */}
        <Text className="text-xl font-semibold text-center mb-2">
          {user.name}
        </Text>

        {/* Contact Info */}
        <Text className="text-gray-600 mt-4 mb-2 font-medium">
          Contact Info
        </Text>

        <Text className="text-sm">Email:</Text>
        <Text className="text-blue-600 mb-2">{user.email}</Text>

        <Text className="text-sm">Phone:</Text>
        {isEditing ? (
          <TextInput
            className="border p-2 rounded mb-2"
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text)}
          />
        ) : (
          <Text className="mb-2">{form.phone}</Text>
        )}

        <Text className="text-sm">Address:</Text>
        {isEditing ? (
          <>
            <TextInput
              className="border p-2 rounded mb-2"
              value={form.address1}
              placeholder="Line 1"
              onChangeText={(text) => handleChange("address1", text)}
            />
            <TextInput
              className="border p-2 rounded mb-2"
              value={form.address2}
              placeholder="Line 2"
              onChangeText={(text) => handleChange("address2", text)}
            />
          </>
        ) : (
          <Text className="mb-2">
            {form.address1} {form.address2 ? ", " + form.address2 : ""}
          </Text>
        )}

        {/* Basic Info */}
        <Text className="text-gray-600 mt-4 mb-2 font-medium">Basic Info</Text>

        <Text className="text-sm">Gender:</Text>
        {isEditing ? (
          <TextInput
            className="border p-2 rounded mb-2"
            placeholder="Male or Female"
            value={form.gender}
            onChangeText={(text) => handleChange("gender", text)}
          />
        ) : (
          <Text className="mb-2">{form.gender}</Text>
        )}

        <Text className="text-sm">Birthday:</Text>
        {isEditing ? (
          <TextInput
            className="border p-2 rounded mb-2"
            value={form.dob}
            placeholder="YYYY-MM-DD"
            onChangeText={(text) => handleChange("dob", text)}
          />
        ) : (
          <Text className="mb-2">{form.dob}</Text>
        )}

        <Text className="text-sm">Age:</Text>
        <Text className="mb-4">{calculateAge(form.dob)}</Text>

        {/* Edit/Save Button */}
        <TouchableOpacity
          className="bg-blue-600 rounded-full py-3 items-center"
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text className="text-white font-semibold text-sm">
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
