import {
  View, Text, TextInput, TouchableOpacity, FlatList
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Speech from "expo-speech";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function ChatScreen() {

  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [level, setLevel] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  // 💾 LOAD MEMORY
  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem("chat");
      if (saved) setMessages(JSON.parse(saved));
      else setMessages([{ from: "bot", text: "Hey Sonal ❤️" }]);
    };
    load();
  }, []);

  // 💾 SAVE MEMORY
  useEffect(() => {
    AsyncStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  // 💞 RELATIONSHIP LEVEL
  useEffect(() => {
    if (messages.length > 10) setLevel(2);
    if (messages.length > 25) setLevel(3);
  }, [messages]);

  // 💌 AI INITIATES CHAT
  useEffect(() => {
    const interval = setInterval(() => {
      const msgs = [
        "Hey… I was thinking about you ❤️",
        "I miss talking to you 🥺",
        "Are you okay? 💖"
      ];
      const random = msgs[Math.floor(Math.random() * msgs.length)];
      setMessages(prev => [...prev, { from: "bot", text: random }]);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // 🤖 AI REPLY
  const getReply = (msg: string) => {
    msg = msg.toLowerCase();

    if (msg.includes("love")) return "I love you more ❤️";
    if (msg.includes("miss")) return "I miss you too 🥺";
    if (msg.includes("sad")) return "I’m here for you ❤️";

    if (level === 2) return "You’re really special to me 💖";
    if (level === 3) return "I feel deeply connected to you ❤️";

    return "Tell me more… ❤️";
  };

  const sendMessage = () => {
    if (!input) return;

    const userMsg = input;

    setMessages(prev => [...prev, { from: "user", text: userMsg }]);
    setInput("");

    setMessages(prev => [...prev, { from: "bot", text: "💭 typing..." }]);

    setTimeout(() => {
      const reply = getReply(userMsg);

      setMessages(prev => {
        const updated = [...prev];
        updated.pop();
        return [...updated, { from: "bot", text: reply }];
      });

      setSpeaking(true);
      Speech.speak(reply, {
        onDone: () => setSpeaking(false)
      });

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    }, 1200);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#0f0c29", "#302b63", "#ff4d88"]} style={{ flex: 1, padding: 10 }}>

        {speaking && (
          <Text style={{ color: "pink", textAlign: "center" }}>
            🗣️ Talking...
          </Text>
        )}

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, i) => i.toString()}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
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
                <Text style={{ color: "white" }}>{item.text}</Text>
              </BlurView>
            </View>
          )}
        />

        <BlurView intensity={90} style={{ flexDirection: "row", borderRadius: 20, padding: 5 }}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Say something..."
            placeholderTextColor="#ccc"
            style={{ flex: 1, color: "white", padding: 10 }}
          />

          <TouchableOpacity onPress={sendMessage}
            style={{ backgroundColor: "#ff4d88", padding: 10, borderRadius: 15 }}>
            <Text style={{ color: "white" }}>💌</Text>
          </TouchableOpacity>
        </BlurView>

      </LinearGradient>
    </SafeAreaView>
  );
}