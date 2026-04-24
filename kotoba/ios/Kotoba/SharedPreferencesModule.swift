import Foundation

let KOTOBA_APP_GROUP = "group.com.juan098.Kotoba"

@objc(SharedPreferencesModule)
class SharedPreferencesModule: NSObject {

  @objc func setWordScores(_ language: String, scoresJson: String) {
    guard let defaults = UserDefaults(suiteName: KOTOBA_APP_GROUP) else { return }
    defaults.set(scoresJson, forKey: "wordScores_\(language)")
    defaults.synchronize()
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
