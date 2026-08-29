// lib/controllers/camera_controller.dart

import 'dart:async';
import 'package:flutter_vlc_player/flutter_vlc_player.dart';
import 'package:get/get.dart';
import 'package:monitoring_kambing/app/config/app_config.dart';

class CameraController extends GetxController {
  static const String _videoUrl =
      'https://gn99lq68-8080.asse.devtunnels.ms/video';

  late VlcPlayerController vlcController;
  final isInitialized = false.obs;
  final isLoading = true.obs;
  bool _isDisposed = false;
  bool _controllerCreated = false;

  @override
  void onInit() {
    super.onInit();
    if (AppConfig.useDummyData) {
      isLoading.value = false;
      return;
    }
    _initializePlayer();
  }

  void _initializePlayer() {
    vlcController = VlcPlayerController.network(
      _videoUrl,
      options: VlcPlayerOptions(
        http: VlcHttpOptions([VlcHttpOptions.httpReconnect(true)]),
        advanced: VlcAdvancedOptions([VlcAdvancedOptions.networkCaching(6000)]),
      ),
    );
    _controllerCreated = true;

    vlcController.addListener(() {
      if (_isDisposed) return;

      final playerValue = vlcController.value;

      print(
          "VLC State changed: playingState=${playerValue.playingState}, isInitialized=${playerValue.isInitialized}, hasError=${playerValue.hasError}, isBuffering=${playerValue.isBuffering}");
      // ====================================================

      if (playerValue.isInitialized && !isInitialized.value) {
        isInitialized.value = true;
        isLoading.value = false;
      } else if (playerValue.hasError ||
          playerValue.playingState == PlayingState.error) {
        if (isLoading.value) {
          isLoading.value = false;
        }
      }
    });

    // ================== TIMEOUT MANUAL ==================
    // If loading is still active after the timeout, show the error state.
    Future.delayed(const Duration(seconds: 2), () {
      if (isLoading.value && !_isDisposed) {
        print(
            ">>> TIMEOUT: Video did not start after 2 seconds. Stopping loading.");
        isLoading.value = false;
      }
    });
    // ====================================================
  }

  @override
  void onClose() {
    _isDisposed = true;
    if (_controllerCreated) {
      vlcController.dispose();
    }
    super.onClose();
  }
}
