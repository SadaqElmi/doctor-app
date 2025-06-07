import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
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

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const [form, setForm] = useState({
    phone: "",
    gender: "",
    dob: "",
    address1: "",
    address2: "",
    imageFile: null as any,
    previewImage: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await SecureStore.getItemAsync("userData");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (user) {
        setUser(user);
        setForm((prev) => ({
          ...prev,
          phone: user.phone || "",
          gender: user.gender || "",
          dob: user.dob || "",
          address1: user.address?.line1 || "",
          address2: user.address?.line2 || "",
          previewImage: user.image || "",
        }));
      }
    };

    fetchUser();
  }, []);

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

    if (user?.id) {
      data.append("id", String(user.id)); // ✅ Add user ID required by backend
    }

    if (form.imageFile) {
      const localUri = form.imageFile.uri;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename ?? "");
      const fileType = match ? `image/${match[1]}` : `image`;

      data.append("imageFile", {
        uri: localUri,
        name: filename,
        type: fileType,
      } as any);
    }

    data.append("phone", String(form.phone));
    data.append("gender", String(form.gender));
    data.append("dob", String(form.dob));
    data.append("address1", String(form.address1));
    data.append("address2", String(form.address2));

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
        await SecureStore.setItemAsync(
          "userData",
          JSON.stringify(res.data.data) // fixed: use `res.data.data` not `res.data.user`
        );
        setUser(res.data.data);
      } else {
        alert("Update failed");
      }
    } catch (error: any) {
      console.error("Update error:", error.response?.data || error.message);
    }
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        {/* Profile Image */}
        <TouchableOpacity
          style={{ alignItems: "center", marginBottom: 16 }}
          onPress={isEditing ? handlePickImage : undefined}
        >
          <Image
            source={
              form.previewImage
                ? { uri: form.previewImage }
                : require("../assets/images/profile_pic.png")
            }
            style={{
              width: 128,
              height: 128,
              borderRadius: 64,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          />
          {isEditing && (
            <Text style={{ color: "#5F6FFF", marginTop: 8 }}>
              Tap to change photo
            </Text>
          )}
        </TouchableOpacity>

        {/* Name */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          {user.name}
        </Text>

        {/* Email */}
        <Text style={{ color: "#888", marginBottom: 4 }}>Email:</Text>
        <Text style={{ marginBottom: 8 }}>{user.email}</Text>

        {/* Phone */}
        <Text style={{ color: "#888", marginBottom: 4 }}>Phone:</Text>
        {isEditing ? (
          <TextInput
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text)}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
            }}
          />
        ) : (
          <Text style={{ marginBottom: 8 }}>{form.phone}</Text>
        )}

        {/* Address */}
        <Text style={{ color: "#888", marginBottom: 4 }}>Address:</Text>
        {isEditing ? (
          <>
            <TextInput
              value={form.address1}
              onChangeText={(text) => handleChange("address1", text)}
              placeholder="Line 1"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 8,
              }}
            />
            <TextInput
              value={form.address2}
              onChangeText={(text) => handleChange("address2", text)}
              placeholder="Line 2"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 10,
              }}
            />
          </>
        ) : (
          <Text style={{ marginBottom: 8 }}>
            {form.address1}
            {form.address2 ? `, ${form.address2}` : ""}
          </Text>
        )}

        {/* Gender */}
        <Text style={{ color: "#888", marginBottom: 4 }}>Gender:</Text>
        {isEditing ? (
          <TextInput
            value={form.gender}
            onChangeText={(text) => handleChange("gender", text)}
            placeholder="Male or Female"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
            }}
          />
        ) : (
          <Text style={{ marginBottom: 8 }}>{form.gender}</Text>
        )}

        {/* Birthday */}
        <Text style={{ color: "#888", marginBottom: 4 }}>Birthday:</Text>
        {isEditing ? (
          <TextInput
            value={form.dob}
            onChangeText={(text) => handleChange("dob", text)}
            placeholder="YYYY-MM-DD"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
            }}
          />
        ) : (
          <Text style={{ marginBottom: 8 }}>{form.dob}</Text>
        )}

        {/* Age */}
        <Text style={{ color: "#888", marginBottom: 4 }}>Age:</Text>
        <Text style={{ marginBottom: 16 }}>{calculateAge(form.dob)}</Text>

        {/* Save/Edit Button */}
        <TouchableOpacity
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
          style={{
            backgroundColor: "#5F6FFF",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
