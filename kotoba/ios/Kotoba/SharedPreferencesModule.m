#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SharedPreferencesModule, NSObject)

RCT_EXTERN_METHOD(setWordScores:(NSString *)language scoresJson:(NSString *)scoresJson)

@end
