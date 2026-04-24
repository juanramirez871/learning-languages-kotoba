import Foundation
import WidgetKit

private let KOTOBA_APP_GROUP = "group.com.juan098.Kotoba"
private let LOW_SCORE_POOL = 20

struct JapaneseWord: Codable {
    let japanese: String
    let pronounciation: String
    let spanish: String
}

struct EnglishWord: Codable {
    let word: String
    let spanish: String
}

class WordLoader {
    static func loadJapaneseWords() -> [JapaneseWord] {
        guard let url = Bundle.main.url(forResource: "japaneseWords", withExtension: "json") else {
            return []
        }
        do {
            let data = try Data(contentsOf: url)
            return try JSONDecoder().decode([JapaneseWord].self, from: data)
        } catch {
            print("Error loading Japanese words: \(error)")
            return []
        }
    }

    static func loadEnglishWords() -> [EnglishWord] {
        guard let url = Bundle.main.url(forResource: "englishWords", withExtension: "json") else {
            return []
        }
        do {
            let data = try Data(contentsOf: url)
            return try JSONDecoder().decode([EnglishWord].self, from: data)
        } catch {
            print("Error loading English words: \(error)")
            return []
        }
    }

    // Loads the saved word scores from the shared App Group UserDefaults.
    private static func loadScores(language: String) -> [String: Double] {
        guard let defaults = UserDefaults(suiteName: KOTOBA_APP_GROUP),
              let json = defaults.string(forKey: "wordScores_\(language)"),
              let data = json.data(using: .utf8),
              let scores = try? JSONSerialization.jsonObject(with: data) as? [String: Double]
        else { return [:] }
        return scores
    }

    // Returns a random word from the pool of the 20 lowest-scoring Japanese words.
    static func pickLowScoreJapanese() -> JapaneseWord? {
        let words = loadJapaneseWords()
        guard !words.isEmpty else { return nil }
        let scores = loadScores(language: "japanese")
        let pool = words
            .sorted { (scores[$0.japanese] ?? 0) < (scores[$1.japanese] ?? 0) }
            .prefix(LOW_SCORE_POOL)
        return pool.randomElement()
    }

    // Returns a random word from the pool of the 20 lowest-scoring English words.
    static func pickLowScoreEnglish() -> EnglishWord? {
        let words = loadEnglishWords()
        guard !words.isEmpty else { return nil }
        let scores = loadScores(language: "english")
        let pool = words
            .sorted { (scores[$0.word] ?? 0) < (scores[$1.word] ?? 0) }
            .prefix(LOW_SCORE_POOL)
        return pool.randomElement()
    }
}
