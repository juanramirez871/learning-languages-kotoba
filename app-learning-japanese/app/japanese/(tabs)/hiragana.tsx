import { DAKUON, GOJUON, PALETTE, SOKUON, YOUON } from "@/constants/alphabetHiragama";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";



function KanaCard({
  kana,
  rom,
  colorIndex,
}: {
  kana: string;
  rom: string;
  colorIndex: number;
}) {
  const [pressed, setPressed] = useState(false);
  const c = PALETTE[colorIndex % PALETTE.length];
  if (!kana) return <View style={[styles.card, styles.cardEmpty]} />;
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.card,
        {
          backgroundColor: c.bg,
          borderColor: pressed ? c.letter : c.border,
          transform: [{ scale: pressed ? 0.94 : 1 }],
        },
      ]}
    >
      <Text style={[styles.kanaText, { color: c.letter }]}>{kana}</Text>
      <Text style={[styles.romText, { color: c.letter }]}>{rom}</Text>
    </TouchableOpacity>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
}

export default function HiraganaScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Título principal */}
        <View style={styles.mainHeader}>
          <Text style={styles.mainTitle}>平仮名{"\n"}Hiragana</Text>
          <Text style={styles.mainSubtitle}>Las 4 familias de caracteres</Text>
        </View>

        {/* 1. GOJUON */}
        <View style={[styles.section, { height: "33%" }]} >
          <SectionHeader title="Gojuon" subtitle="Los 46 caracteres base" />
          <View style={styles.grid5}>
            {GOJUON.map((item, i) => (
              <KanaCard
                key={i}
                kana={item.kana}
                rom={item.rom}
                colorIndex={Math.floor(i / 5)}
              />
            ))}
          </View>
        </View>

        {/* 2. SOKUON */}
        <View style={[styles.section, { height: "13%" }]} >
        <SectionHeader
          title="Sokuon · っ"
          subtitle="Duplica la consonante siguiente"
        />
        <View style={styles.sokuonHint}>
          <Text style={styles.sokuonKana}>っ</Text>
          <Text style={styles.sokuonArrow}>
            → dobla la consonante que le sigue
          </Text>
        </View>
        <View style={styles.sokuonGrid}>
          {SOKUON.map((s, i) => {
            const c = PALETTE[i % PALETTE.length];
            return (
              <View
                key={i}
                style={[
                  styles.sokuonCard,
                  { backgroundColor: c.bg, borderColor: c.border },
                ]}
              >
                <Text style={[styles.sokuonWord, { color: c.letter }]}>
                  {s.word}
                </Text>
                <Text style={[styles.sokuonRom, { color: c.letter }]}>
                  {s.rom}
                </Text>
                <Text style={styles.sokuonMeaning}>{s.meaning}</Text>
              </View>
            );
          })}
        </View>
        </View>

        {/* 3. DAKUON */}
        <View style={[styles.section, { height: "16%" }]} >
        <SectionHeader
          title="Dakuon · ゛゜"
          subtitle="Consonantes sonoras y semisordas"
        />
        <View style={styles.grid5}>
          {DAKUON.map((item, i) => (
            <KanaCard
              key={i}
              kana={item.kana}
              rom={item.rom}
              colorIndex={Math.floor(i / 5)}
            />
          ))}
        </View>
        </View>

        {/* 4. YOUON */}
        <View style={[styles.section, { height: "10%" }]} >
        <SectionHeader
          title="Youon"
          subtitle="Combinaciones con や ゆ よ pequeños"
        />
        <View style={styles.grid3}>
          {YOUON.map((item, i) => (
            <KanaCard
              key={i}
              kana={item.kana}
              rom={item.rom}
              colorIndex={Math.floor(i / 3)}
            />
          ))}
        </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF0F3",
    overflow: "hidden",
  },
  section: {
    gap: 10,
  },
  scroll: {
    paddingHorizontal: 16,
    gap: 24,
  },
  mainHeader: {
    paddingTop: 60,
    paddingHorizontal: 6,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 3.5,
    color: "#C992A8",
    fontWeight: "600",
    marginBottom: 6,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a1a",
    lineHeight: 38,
    marginBottom: 4,
  },
  mainSubtitle: {
    fontSize: 14,
    color: "#B07090",
  },
  sectionHeader: {
    paddingHorizontal: 4,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionEmoji: {
    fontSize: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1a1a",
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#C992A8",
    marginTop: 1,
  },
  grid5: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    alignContent: "flex-start",
  },
  grid3: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    alignContent: "flex-start",
  },
  card: {
    width: "18%",
    aspectRatio: 0.85,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    shadowColor: "#993556",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  cardEmpty: {
      backgroundColor: "rgba(153, 53, 86, 0.04)",
      borderColor: "rgba(153, 53, 86, 0.04)",
      borderStyle: "solid",
      shadowOpacity: 0,
      elevation: 0,
    },
  kanaText: {
    fontSize: 22,
    fontWeight: "800",
  },
  romText: {
    fontSize: 10,
    fontWeight: "500",
    opacity: 0.65,
    marginTop: 2,
  },
  sokuonHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FCEEF1",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#F4C0D1",
    padding: 14,
  },
  sokuonKana: {
    fontSize: 36,
    fontWeight: "800",
    color: "#993556",
  },
  sokuonArrow: {
    fontSize: 13,
    color: "#72243E",
    flex: 1,
    flexWrap: "wrap",
  },
  sokuonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  sokuonCard: {
    width: "47%",
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 14,
    shadowColor: "#993556",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  sokuonWord: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 2,
  },
  sokuonRom: {
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.8,
    marginBottom: 4,
  },
  sokuonMeaning: {
    fontSize: 11,
    color: "#B07090",
  },
});