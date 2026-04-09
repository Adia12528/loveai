import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

export default function StoryScreen() {
  const router = useRouter();

  const lines = [
    "Sonal...",
    "I never believed in magic...",
    "Until you came into my life...",
    "You became my peace...",
    "My happiness...",
    "My everything ❤️",
    "And today..."
  ];

  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [char, setChar] = useState(0);

  useEffect(() => {
    if (char < lines[index].length) {
      const t = setTimeout(() => {
        setDisplay(prev => prev + lines[index][char]);
        setChar(char + 1);
      }, 40);
      return () => clearTimeout(t);
    }
  }, [char]);

  const next = () => {
    if (index < lines.length - 1) {
      setIndex(index + 1);
      setDisplay("");
      setChar(0);
    } else {
      router.push("/proposal");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 22, textAlign: "center", minHeight: 80 }}>
        {display}
      </Text>

      <TouchableOpacity onPress={next} style={{ marginTop: 30, backgroundColor: "#ff4d88", padding: 12, borderRadius: 25 }}>
        <Text style={{ color: "white" }}>Next ➡️</Text>
      </TouchableOpacity>
    </View>
  );
}