import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function LockScreen() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <View style={{
      flex: 1,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Text style={{ color: "white", fontSize: 22, marginBottom: 20 }}>
        🔐 For Someone Special ❤️
      </Text>

      <TextInput
        placeholder="Enter secret..."
        placeholderTextColor="#aaa"
        style={{
          borderWidth: 1,
          borderColor: "#ff4d88",
          padding: 10,
          borderRadius: 10,
          width: "70%",
          color: "white",
          marginBottom: 15
        }}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={() => {
          if (password === "sonal123") router.push("/story");
          else alert("Wrong password 💔");
        }}
        style={{
          backgroundColor: "#ff4d88",
          padding: 12,
          borderRadius: 20
        }}
      >
        <Text style={{ color: "white" }}>Unlock 💖</Text>
      </TouchableOpacity>
    </View>
  );
}