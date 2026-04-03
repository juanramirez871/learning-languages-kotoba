import { DAKUON, GOJUON, PALETTE, SOKUON, YOUON } from "@/constants/alphabetKatakana";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import LetterCard from "@/components/LetterCard";

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

export default function KatakanaScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Título principal */}
        <View style={styles.mainHeader}>
          <Text style={styles.mainTitle}>片仮名{"\n"}Katakana</Text>
          <Text style={styles.mainSubtitle}>Las 4 familias de caracteres</Text>
        </View>

        {/* 1. GOJUON */}
        <View style={[styles.section, { height: "28%" }]} >
          <SectionHeader title="Gojuon" subtitle="Los 46 caracteres base" />
          <View style={styles.grid5}>
            {GOJUON.map((item, i) => (
              <LetterCard
                key={i}
                text={item.kana}
                subtitle={item.rom}
                sound={item.sound}
                color={PALETTE[Math.floor(i / 5) % PALETTE.length]}
                style={{ width: "18%" }}
              />
            ))}
          </View>
        </View>

        {/* 2. SOKUON */}
        <View style={[styles.section, { height: "12%" }]} >
        <SectionHeader
          title="Sokuon · ッ"
          subtitle="Duplica la consonante siguiente"
        />
        <View style={styles.sokuonHint}>
          <Text style={styles.sokuonKana}>ッ</Text>
          <Text style={styles.sokuonArrow}>
            dobla la consonante que le sigue
          </Text>
        </View>
        <View style={styles.sokuonGrid}>
          {SOKUON.map((s, i) => {
            const c = PALETTE[i % PALETTE.length];
            return (
              <LetterCard
                key={i}
                text={s.word}
                rom={s.rom}
                subtitle={s.meaning}
                sound={s.sound}
                color={c}
                style={{ width: "31.5%" }}
              />
            );
          })}
        </View>
        </View>

        {/* 3. DAKUON */}
        <View style={[styles.section, { height: "14%" }]} >
        <SectionHeader
          title="Dakuon · ゛゜"
          subtitle="Consonantes sonoras y semisordas"
        />
        <View style={styles.grid5}>
          {DAKUON.map((item, i) => (
            <LetterCard
              key={i}
              text={item.kana}
              subtitle={item.rom}
              sound={item.sound}
              color={PALETTE[Math.floor(i / 5) % PALETTE.length]}
              style={{ width: "18%" }}
            />
          ))}
        </View>
        </View>

        {/* 4. YOUON */}
        <View style={[styles.section, { height: "10%" }]} >
        <SectionHeader
          title="Youon"
          subtitle="Combinaciones con ヤ ユ ヨ pequeños"
        />
        <View style={styles.grid4}>
          {YOUON.map((item, i) => (
            <LetterCard
              key={i}
              text={item.kana}
              subtitle={item.rom}
              sound={item.sound}
              color={PALETTE[Math.floor(i / 4) % PALETTE.length]}
              style={{ width: "23%" }}
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
    marginBottom: 20,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  mainHeader: {
    paddingTop: 60,
    paddingHorizontal: 6,
    marginBottom: 20,
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
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  },
  grid3: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  grid4: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
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
    marginBottom: 10,
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
});
