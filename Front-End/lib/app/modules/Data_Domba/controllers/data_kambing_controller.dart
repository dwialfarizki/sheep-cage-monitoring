import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:monitoring_kambing/app/data/datatable_model.dart';
import 'package:monitoring_kambing/app/data/dummy_data.dart';
import 'package:monitoring_kambing/app/config/app_config.dart';

class DataKambingController extends GetxController {
  late TextEditingController namaDombaController;
  late TextEditingController chipIdController;
  late TextEditingController tanggalLahirController;
  final listDataTable = <DataTableModel>[].obs;
  Rx<DateTime?> selectedDate = Rx<DateTime?>(null);
  final _http = GetConnect(); // Use GetConnect instead of Dio
  int currentPage = 1;
  int totalPage = 1;

  final Rx<String?> selectedJenisKelamin = Rx<String?>(null);
  final RxList<String> listDomba = <String>[].obs;

  void addDomba(String name) {
    listDomba.add(name);
  }

  void clearDombaList() {
    listDomba.clear();
  }

  void handlerDropdownJenisKelamin(String? jenisKelamin) {
    selectedJenisKelamin.value = jenisKelamin;
  }

  final List<String> listDropdownJenisKelamin = [
    "Male",
    "Female",
  ];
  final listColumnDataTable = [
    'UID',
    'Sheep Name',
    'Age (Month)',
    'Gender',
    'Created At',
  ].obs;

  late String _baseUrl;
  late String _chipEndpoint;
  late String _rfidGetEndpoint;

  @override
  void onInit() {
    super.onInit();
    _baseUrl = AppConfig.env('BASE_URL', AppConfig.defaultBaseUrl);
    _chipEndpoint = AppConfig.env('CHIP_ENDPOINT', '/api/chip');
    _rfidGetEndpoint = AppConfig.env('RFID', '/api/rfid/get');
    namaDombaController = TextEditingController();
    chipIdController = TextEditingController();
    tanggalLahirController = TextEditingController();
    fetchDataTable(currentPage);
    fetchChipId();
  }

  void fetchChipId() async {
    if (AppConfig.useDummyData) {
      chipIdController.text = DummyData.sheepOptions().first['chip_id']!;
      return;
    }
    try {
      final response = await _http.get('$_baseUrl$_rfidGetEndpoint');
      if (response.statusCode == 200) {
        chipIdController.text = response.body['data']['chip_id'];
      } else {
        throw Exception('Failed to load chip ID');
      }
    } catch (e) {
      chipIdController.text = 'Failed To Fetch Chip ID';
    }
  }

  void postData() async {
    if (chipIdController.text.isEmpty) {
      print("Chip ID is empty");
      Get.snackbar("Error", "Chip ID cannot be empty");
      return;
    }
    if (namaDombaController.text.isEmpty) {
      print("Sheep name is empty");
      Get.snackbar("Error", "Sheep name cannot be empty");
      return;
    }
    if (selectedDate.value == null) {
      print("Birth date is empty");
      Get.snackbar("Error", "Birth date cannot be empty");
      return;
    }
    if (selectedJenisKelamin.value == null) {
      print("Gender is empty");
      Get.snackbar("Error", "Gender cannot be empty");
      return;
    }

    final payload = {
      'id': chipIdController.text,
      'nama_domba': namaDombaController.text,
      'usia': selectedDate.value!.toIso8601String(),
      'jenis_kelamin': selectedJenisKelamin.value,
    };

    if (AppConfig.useDummyData) {
      listDataTable.insert(
        0,
        DataTableModel({
          'UID': payload['id'],
          'Sheep Name': payload['nama_domba'],
          'Age (Month)': 'Demo',
          'Gender': payload['jenis_kelamin'],
          'Created At': DateTime.now().toIso8601String(),
        }),
      );
      Get.snackbar('Demo mode', 'Sheep data was added to the local table.');
      return;
    }

    print("Payload: $payload");
    print("Headers: {'Content-Type': 'application/json'}");

    try {
      final response = await _http.post(
        '$_baseUrl$_chipEndpoint',
        jsonEncode(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        print("Data sent successfully");
        Get.defaultDialog(
          title: "Success",
          middleText: "Data added successfully",
          textConfirm: "OK",
          confirmTextColor: Colors.white,
          onConfirm: () {
            Get.back();
            fetchDataTable(currentPage);
          },
        );
      } else {
        print('Failed to post data: ${response.body}');
        Get.snackbar("Error", "Failed to add data: ${response.body}");
      }
    } catch (e) {
      print('Error posting data: $e');
      Get.snackbar("Error", "An error occurred: $e");
    }
  }

  void fetchDataTable(int page) async {
    if (AppConfig.useDummyData) {
      listDataTable.assignAll(DummyData.sheepTable());
      currentPage = 1;
      totalPage = 1;
      return;
    }
    try {
      final response = await _http
          .get("$_baseUrl$_chipEndpoint", query: {'page': page.toString()});
      if (response.statusCode == 200) {
        final data = response.body;
        print(response.body);
        listDataTable.clear();
        for (var item in data['data']['rows']) {
          listDataTable.add(DataTableModel({
            'UID': item['id'],
            'Sheep Name': item['nama_domba'],
            'Age (Month)': item['usia'].toString(),
            'Gender': item['jenis_kelamin'],
            'Created At': item['createdAt'],
          }));
        }
        currentPage = page;
        totalPage = data['pagination']['totalPages'];
      } else {
        throw Exception("Failed to Fetch Data");
      }
    } catch (e) {
      print(e);
      throw Exception("Failed to fetch data");
    }
  }

  void fetchNextPage() {
    if (currentPage < totalPage) {
      fetchDataTable(currentPage + 1);
    }
  }

  void fetchPreviousPage() {
    if (currentPage > 1) {
      fetchDataTable(currentPage - 1);
    }
  }

  String? chipIDValidator(String? value) {
    if (value == null || value.isEmpty) {
      return "Chip ID cannot be empty";
    } else {
      return null;
    }
  }

  String? namaDombaValidator(String? value) {
    if (value == null || value.isEmpty) {
      return "Sheep name cannot be empty";
    } else {
      return null;
    }
  }

  String? tanggalLahirValidator(String? value) {
    if (value == null || value.isEmpty) {
      return "Birth date cannot be empty";
    } else {
      return null;
    }
  }

  void updateSelectedDate(DateTime? date) {
    selectedDate.value = date;
  }

  @override
  void dispose() {
    namaDombaController.dispose();
    chipIdController.dispose();
    tanggalLahirController.dispose();
    super.dispose();
  }
}
