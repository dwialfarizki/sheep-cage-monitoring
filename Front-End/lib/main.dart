// lib/main.dart

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'app/config/app_config.dart';
import 'app/routes/app_pages.dart';
import 'http_overrides.dart'
    if (dart.library.html) 'http_overrides_stub.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  if (!kIsWeb && AppConfig.allowInsecureCertificates) {
    configureHttpOverrides();
  }

  // `.env` is optional in demo builds. Backend builds can provide it locally.
  try {
    await dotenv.load(fileName: '.env');
  } catch (_) {
    // Defaults in AppConfig keep the application usable without this file.
  }

  runApp(
    GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: "Modern Farming | STAS-RG",
      initialRoute: AppPages.initial,
      getPages: AppPages.routes,
    ),
  );
}
