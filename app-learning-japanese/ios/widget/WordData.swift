import Foundation
import WidgetKit

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
}
