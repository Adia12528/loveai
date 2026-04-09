import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function ProposalScreen() {
  const router = useRouter();
  const [pos, setPos] = useState({ top: 0, left: 0 });

  return (
    <View style={{
      flex: 1,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Text style={{ color: "white", fontSize: 26 }}>Sonal ❤️</Text>

      <Text style={{ color: "white", margin: 20 }}>
        Will you be mine forever? 💍
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/chat")}
        style={{
          backgroundColor: "green",
          padding: 12,
          borderRadius: 20,
          marginBottom: 20
        }}
      >
        <Text style={{ color: "white" }}>YES 😍</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setPos({
          top: Math.random() * 400,
          left: Math.random() * 200
        })}
        style={{
          position: "absolute",
          top: pos.top,
          left: pos.left,
          backgroundColor: "red",
          padding: 12,
          borderRadius: 20
        }}
      >
        <Text style={{ color: "white" }}>NO 😏</Text>
      </TouchableOpacity>
    </View>
  );
}