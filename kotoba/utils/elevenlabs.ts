import * as FileSystem from "expo-file-system/legacy";
import { Audio } from "expo-av";

export const createSound = async (text: string) => {

  const voiceId = "EXAVITQu4vr4xnSDxMaL";
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        output_format: "mp3_44100_128",
        model_id: "eleven_multilingual_v2",
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("ElevenLabs API Error:", errorData);
    throw new Error(`ElevenLabs API failed: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  let binary = "";
  const chunk = 8192;

  for (let i = 0; i < uint8Array.length; i += chunk) {
    binary += String.fromCharCode(...uint8Array.slice(i, i + chunk));
  }

  const base64 = btoa(binary);
  const fileUri = FileSystem.cacheDirectory + `tts_${Date.now()}.mp3`;
  await FileSystem.writeAsStringAsync(fileUri, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const { sound } = await Audio.Sound.createAsync(
    { uri: fileUri },
    { shouldPlay: true }
  );

  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded && status.didJustFinish) {
      sound.unloadAsync();
      FileSystem.deleteAsync(fileUri, { idempotent: true });
    }
  });

  return sound;
};

export async function getVoices() {

  const response = await fetch("https://api.elevenlabs.io/v1/voices", {
    method: "GET",
    headers: {
      "xi-api-key": process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY!,
    },
  });

  const data = await response.json();
  const voices = data.voices.map((v: any) => ({
    id: v.voice_id,
    name: v.name,
    language: v.fine_tuning?.language ?? v.labels?.language ?? "unknown",
    gender: v.labels?.gender ?? "unknown",
    accent: v.labels?.accent ?? "unknown",
    preview: v.preview_url,
  }));

  return voices;
}