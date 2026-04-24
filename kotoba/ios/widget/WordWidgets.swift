import WidgetKit
import SwiftUI

// --- Componentes Compartidos ---

struct WordBadge: View {
    let text: String
    let color: Color

    var body: some View {
        Text(text)
            .font(.system(size: 10, weight: .bold, design: .rounded))
            .foregroundColor(.white)
            .padding(.horizontal, 6)
            .padding(.vertical, 2)
            .background(color.opacity(0.8))
            .clipShape(Capsule())
    }
}

struct WordRow: View {
    let word: String
    let pronunciation: String?
    let spanish: String
    let color: Color

    var body: some View {
        HStack(spacing: 8) {
            RoundedRectangle(cornerRadius: 2)
                .fill(color.opacity(0.3))
                .frame(width: 3)

            VStack(alignment: .leading, spacing: 0) {
                Text(word)
                    .font(.system(size: 17, weight: .bold, design: .rounded))
                    .foregroundColor(.primary)

                if let pron = pronunciation {
                    Text(pron)
                        .font(.system(size: 11, design: .serif))
                        .italic()
                        .foregroundColor(.secondary)
                }

                Text(spanish)
                    .font(.system(size: 13, weight: .medium, design: .rounded))
                    .foregroundColor(.secondary)
                    .lineLimit(1)
            }
        }
    }
}

// --- Japanese Widget ---

struct JapaneseProvider: TimelineProvider {
    func placeholder(in context: Context) -> JapaneseEntry {
        let defaultWord = JapaneseWord(japanese: "日本語", pronounciation: "nihongo", spanish: "Japonés")
        return JapaneseEntry(date: Date(), word1: defaultWord, word2: defaultWord)
    }

    func getSnapshot(in context: Context, completion: @escaping (JapaneseEntry) -> ()) {
        let fallback = JapaneseWord(japanese: "日本語", pronounciation: "nihongo", spanish: "Japonés")
        let word1 = WordLoader.pickLowScoreJapanese() ?? fallback
        let word2 = WordLoader.pickLowScoreJapanese() ?? fallback
        completion(JapaneseEntry(date: Date(), word1: word1, word2: word2))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<JapaneseEntry>) -> ()) {
        let fallback = JapaneseWord(japanese: "日本語", pronounciation: "nihongo", spanish: "Japonés")
        var entries: [JapaneseEntry] = []
        let currentDate = Date()

        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let word1 = WordLoader.pickLowScoreJapanese() ?? fallback
            let word2 = WordLoader.pickLowScoreJapanese() ?? fallback
            entries.append(JapaneseEntry(date: entryDate, word1: word1, word2: word2))
        }

        completion(Timeline(entries: entries, policy: .atEnd))
    }
}

struct JapaneseEntry: TimelineEntry {
    let date: Date
    let word1: JapaneseWord
    let word2: JapaneseWord
}

struct JapaneseWordWidgetEntryView : View {
    var entry: JapaneseProvider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            VStack(alignment: .leading, spacing: 12) {
                WordRow(word: entry.word1.japanese,
                        pronunciation: "[\(entry.word1.pronounciation)]",
                        spanish: entry.word1.spanish,
                        color: .red)

                if family != .systemSmall || entry.word2.japanese != entry.word1.japanese {
                    Divider().background(Color.red.opacity(0.1))

                    WordRow(word: entry.word2.japanese,
                            pronunciation: "[\(entry.word2.pronounciation)]",
                            spanish: entry.word2.spanish,
                            color: .red)
                }
            }
            Spacer(minLength: 0)
        }
        .padding(12)
        .containerBackground(for: .widget) {
            ZStack {
                Color(.systemBackground)
                LinearGradient(colors: [Color.red.opacity(0.05), Color.clear],
                               startPoint: .topLeading,
                               endPoint: .bottomTrailing)
            }
        }
    }
}

struct JapaneseWordWidget: Widget {
    let kind: String = "JapaneseWordWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: JapaneseProvider()) { entry in
            JapaneseWordWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Aprende Japonés")
        .description("Nuevas palabras cada hora para tu vocabulario.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

// --- English Widget ---

struct EnglishProvider: TimelineProvider {
    func placeholder(in context: Context) -> EnglishEntry {
        let defaultWord = EnglishWord(word: "Hello", spanish: "Hola")
        return EnglishEntry(date: Date(), word1: defaultWord, word2: defaultWord)
    }

    func getSnapshot(in context: Context, completion: @escaping (EnglishEntry) -> ()) {
        let fallback = EnglishWord(word: "Hello", spanish: "Hola")
        let word1 = WordLoader.pickLowScoreEnglish() ?? fallback
        let word2 = WordLoader.pickLowScoreEnglish() ?? fallback
        completion(EnglishEntry(date: Date(), word1: word1, word2: word2))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<EnglishEntry>) -> ()) {
        let fallback = EnglishWord(word: "Hello", spanish: "Hola")
        var entries: [EnglishEntry] = []
        let currentDate = Date()

        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let word1 = WordLoader.pickLowScoreEnglish() ?? fallback
            let word2 = WordLoader.pickLowScoreEnglish() ?? fallback
            entries.append(EnglishEntry(date: entryDate, word1: word1, word2: word2))
        }

        completion(Timeline(entries: entries, policy: .atEnd))
    }
}

struct EnglishEntry: TimelineEntry {
    let date: Date
    let word1: EnglishWord
    let word2: EnglishWord
}

struct EnglishWordWidgetEntryView : View {
    var entry: EnglishProvider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            VStack(alignment: .leading, spacing: 12) {
                WordRow(word: entry.word1.word,
                        pronunciation: nil,
                        spanish: entry.word1.spanish,
                        color: .blue)

                if family != .systemSmall || entry.word2.word != entry.word1.word {
                    Divider().background(Color.blue.opacity(0.1))

                    WordRow(word: entry.word2.word,
                            pronunciation: nil,
                            spanish: entry.word2.spanish,
                            color: .blue)
                }
            }
            Spacer(minLength: 0)
        }
        .padding(12)
        .containerBackground(for: .widget) {
            ZStack {
                Color(.systemBackground)
                LinearGradient(colors: [Color.blue.opacity(0.05), Color.clear],
                               startPoint: .topLeading,
                               endPoint: .bottomTrailing)
            }
        }
    }
}

struct EnglishWordWidget: Widget {
    let kind: String = "EnglishWordWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: EnglishProvider()) { entry in
            EnglishWordWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Learn English")
        .description("Daily words to improve your English vocabulary.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
