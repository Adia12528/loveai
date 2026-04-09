import {
  View, Text, TextInput, TouchableOpacity, FlatList
} from "react-native";
import { useState, useEffect } from "react";
import * as Speech from "expo-speech";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function ChatScreen() {

  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [quote, setQuote] = useState("");

  const quotes = [
    "I still remember the first time we talked… ❤️",
    "You became my favorite part of every day… ✨",
    "With you… everything feels special 💫",
    "You became my everything ❤️"
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setQuote(quotes[i]);
      i++;
      if (i >= quotes.length) clearInterval(interval);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const playMusic = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3" },
        { isLooping: true, volume: 0.4 }
      );
      await sound.playAsync();
    };
    playMusic();
  }, []);

  const sendMessage = () => {
    if (!input) return;

    const userMsg = input;
    setMessages(prev => [...prev, { from: "user", text: userMsg }]);
    setInput("");

    setMessages(prev => [...prev, { from: "bot", text: "typing..." }]);

    setTimeout(() => {
      let reply = "You mean everything to me ❤️";

      if (userMsg.toLowerCase().includes("love"))
        reply = "I love you more ❤️";
      else if (userMsg.toLowerCase().includes("miss"))
        reply = "I miss you too 🥺";

      setMessages(prev => {
        const updated = [...prev];
        updated.pop();
        return [...updated, { from: "bot", text: reply }];
      });

      Speech.speak(reply);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    }, 1200);
  };

  return (
    <LinearGradient
      colors={["#0f0c29", "#302b63", "#ff4d88"]}
      style={{ flex: 1, padding: 10 }}
    >

      <Text style={{ color: "#ff9a9e", textAlign: "center" }}>
        {quote}
      </Text>

      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={{
            alignSelf: item.from === "user" ? "flex-end" : "flex-start",
            maxWidth: "75%",
            marginBottom: 10
          }}>
            <BlurView intensity={80} style={{
              padding: 12,
              borderRadius: 20,
              backgroundColor: item.from === "user"
                ? "rgba(255,105,180,0.3)"
                : "rgba(255,255,255,0.1)"
            }}>
              <Text style={{ color: "white" }}>
                {item.text}
              </Text>
            </BlurView>
          </View>
        )}
      />

      <BlurView intensity={90} style={{
        flexDirection: "row",
        borderRadius: 20,
        padding: 5
      }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Say something..."
          placeholderTextColor="#ccc"
          style={{ flex: 1, color: "white", padding: 10 }}
        />

        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: "#ff4d88",
            padding: 10,
            borderRadius: 15
          }}
        >
          <Text style={{ color: "white" }}>💌</Text>
        </TouchableOpacity>
      </BlurView>

    </LinearGradient>
  );
}