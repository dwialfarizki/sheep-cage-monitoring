import 'package:flutter_dotenv/flutter_dotenv.dart';

/// Runtime configuration for the demo and production data sources.
///
/// The demo build is enabled by default so the app can be opened without a
/// running API. Use `--dart-define=USE_DUMMY_DATA=false` to use the backend.
class AppConfig {
  static const bool useDummyData = bool.fromEnvironment(
    'USE_DUMMY_DATA',
    defaultValue: true,
  );

  static const bool allowInsecureCertificates = bool.fromEnvironment(
    'ALLOW_INSECURE_CERTIFICATES',
    defaultValue: false,
  );

  static const String defaultBaseUrl = 'https://modernfarming-api.vercel.app';

  static String env(String key, String fallback) {
    if (!dotenv.isInitialized) {
      return fallback;
    }
    return dotenv.env[key] ?? fallback;
  }
}
