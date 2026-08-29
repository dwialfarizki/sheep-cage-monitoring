import 'dart:async';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:monitoring_kambing/app/data/chart_model.dart';
import 'package:monitoring_kambing/app/data/datatable_model.dart';
import 'package:monitoring_kambing/app/data/datatable_model_month.dart';
import 'package:monitoring_kambing/app/data/datatable_model_week.dart';
import 'package:monitoring_kambing/app/data/dummy_data.dart';
import 'package:monitoring_kambing/app/config/app_config.dart';

class IndeksLingkunganController extends GetxController {
  Timer? timer;
  int totalPage = 1;
  int currentPage = 1;

  final GetConnect _http = GetConnect();
  final listColumnTable = [
    'CHIP-ID',
    'Temperature (°C)',
    'Humidity (%)',
    'Created At',
  ].obs;

  late TextEditingController tanggalLahirController;
  Rx<DateTime?> selectedDate = Rx<DateTime?>(null);

  String? tanggalLahirValidator(String? value) {
    if (value == null || value.isEmpty) {
      return "Birth date cannot be empty";
    } else {
      return null;
    }
  }

  void updateSelectedDate(DateTime? date) {
    selectedDate.value = date;
    if (selectedSheep.value != null && selectedTimeRange.value != null) {
      fetchIndeksData();
    }
  }

  final RxList<DataTableModel> listDataTable = <DataTableModel>[].obs;
  final RxList<DataTableModelMonth> listDataTableMonth =
      <DataTableModelMonth>[].obs;
  final RxList<DataTableModelWeek> listDataTableWeek =
      <DataTableModelWeek>[].obs;
  final RxList<ChartModel> dataList = <ChartModel>[].obs;

  final RxList<ChartModel> suhuList = <ChartModel>[].obs;
  final RxList<ChartModel> kelembapanList = <ChartModel>[].obs;

  final Rx<String?> selectedSheep = Rx<String?>(null);
  final Rx<String?> selectedTimeRange = Rx<String?>(null);

  final RxList<Map<String, String>> sheepList = <Map<String, String>>[].obs;

  var selectedHistory = "Current".obs;
  var isFetching = false.obs;
  var isLoading = true.obs;

  late String _baseUrl;
  late String _chipEndpoint;
  late String _ahtEndpoint;
  late String _ahtDailyEndpoint;
  late String _ahtWeeklyEndpoint;
  late String _ahtMonthlyEndpoint;

  @override
  void onInit() {
    super.onInit();

    _baseUrl = AppConfig.env('BASE_URL', AppConfig.defaultBaseUrl);
    _chipEndpoint = AppConfig.env('CHIP_ENDPOINT', '/api/chip');
    _ahtEndpoint = AppConfig.env('AHT_ENDPOINT', '/api/aht');
    _ahtDailyEndpoint = AppConfig.env('AHT_DAILY_ENDPOINT', '/api/aht/daily');
    _ahtWeeklyEndpoint =
        AppConfig.env('AHT_WEEKLY_ENDPOINT', '/api/aht/weekly');
    _ahtMonthlyEndpoint =
        AppConfig.env('AHT_MONTHLY_ENDPOINT', '/api/aht/monthly');

    tanggalLahirController = TextEditingController();
    if (AppConfig.useDummyData) {
      _loadDummyData();
      return;
    }
    fetchSheepData();
    fetchIndeksData();
    fetchDataTable(currentPage);

    timer ??= Timer.periodic(
      const Duration(seconds: 5),
      (Timer t) => fetchIndeksData(),
    );
  }

  void _loadDummyData() {
    final options = DummyData.sheepOptions();
    sheepList.assignAll(options);
    selectedSheep.value = null;
    selectedDate.value = null;
    selectedTimeRange.value = null;
    tanggalLahirController.clear();
    dataList.clear();
    listDataTable.assignAll(DummyData.environmentTable());
    isLoading.value = false;
    currentPage = 1;
    totalPage = 1;
  }

  @override
  void dispose() {
    timer?.cancel();
    tanggalLahirController.dispose();
    super.dispose();
  }

  void handlerSwitch(bool value) {
    isFetching.value = value;
  }

  void handlerDropdownSheep(String? sheep) {
    if (sheep != null && sheep.isNotEmpty) {
      selectedSheep.value = sheep;
      if (selectedTimeRange.value != null) {
        fetchIndeksData();
      }
    } else {
      print("Invalid sheep selected: $sheep");
    }
  }

  void handlerDropdownTimeRange(String? range) {
    selectedTimeRange.value = range;
    print('Selected Time Range: $range');
    if (selectedSheep.value != null) {
      fetchIndeksData();
    }
  }

  void handlerDropdownHistory(String? history) {
    selectedHistory.value = history ?? 'Current';
  }

  Future<void> fetchSheepData() async {
    if (AppConfig.useDummyData) {
      sheepList.assignAll(DummyData.sheepOptions());
      isLoading.value = false;
      return;
    }
    isLoading.value = true;
    try {
      int page = 1;
      final Set<String> seenChipIds = {};
      final List<Map<String, String>> allSheep = [];

      while (true) {
        final response = await _http.get(
          '$_baseUrl$_chipEndpoint',
          query: {'page': page.toString()},
        );

        if (response.statusCode == 200) {
          final data = response.body['data']['rows'];
          for (var item in data) {
            final chipId = item['id']?.toString();
            if (chipId != null &&
                chipId.isNotEmpty &&
                !seenChipIds.contains(chipId)) {
              seenChipIds.add(chipId);
              allSheep.add({
                'nama_domba': item['nama_domba'].toString(),
                'chip_id': chipId,
              });
            }
          }
          final totalPages = response.body['pagination']['totalPages'];
          if (page >= totalPages) break;
          page++;
        } else {
          throw Exception("Failed to load sheep data");
        }
      }

      sheepList.assignAll(allSheep);
      sheepList.refresh();

      if (selectedSheep.value == null && allSheep.isNotEmpty) {
        selectedSheep.value = null;
      }
    } catch (e) {
      print("Error fetching sheep data: $e");
    } finally {
      isLoading.value = false;
    }
  }

  void fetchListDomba() async {
    if (AppConfig.useDummyData) {
      sheepList.assignAll(DummyData.sheepOptions());
      return;
    }
    try {
      final response = await _http.get('$_baseUrl$_chipEndpoint');
      if (response.statusCode == 200) {
        final data = response.body['data']['rows'];
        final Set<String> seenChipIds = {};
        sheepList.clear();
        for (var item in data) {
          final chipId = item['id']?.toString();
          if (chipId != null &&
              chipId.isNotEmpty &&
              !seenChipIds.contains(chipId)) {
            seenChipIds.add(chipId);
            sheepList.add({
              'nama_domba': item['nama_domba'].toString(),
              'chip_id': chipId,
            });
          }
        }
        sheepList.sort((a, b) => a['nama_domba']!.compareTo(b['nama_domba']!));
      } else {
        throw Exception('Failed to load sheep list');
      }
    } catch (e) {
      print("Error fetching sheep list: $e");
    }
  }

  Future<void> fetchDailyData(DateTime selectedDate) async {
    if (AppConfig.useDummyData) {
      final chipId = selectedSheep.value ?? DummyData.sheepOptions().first['chip_id']!;
      dataList.assignAll(DummyData.environmentDaily(chipId, selectedDate));
      listDataTable.assignAll(DummyData.environmentTable());
      return;
    }
    try {
      final String formattedDate =
          DateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").format(selectedDate);
      final String chipId = selectedSheep.value ?? '';
      final String url = '$_baseUrl$_ahtDailyEndpoint/$formattedDate/$chipId';
      final response = await _http.get(url);

      if (response.statusCode == 200) {
        final data = response.body['data'];
        if (data == null || data.isEmpty) {
          _showEmptyDailyPoint(selectedDate);
          return;
        }

        listDataTable.clear();
        dataList.clear();

        for (var item in data) {
          final chartModel = ChartModel(
            id: item['id'].toString(),
            suhu: double.tryParse(item['suhu'].toString()) ?? 0.0,
            kelembaban: double.tryParse(item['kelembapan'].toString()) ?? 0.0,
            chipId: item['chip_id'],
            createdAt:
                DateTime.parse(item['createdAt']).add(const Duration(hours: 7)),
          );

          listDataTable.add(DataTableModel({
            'CHIP-ID': item['chip_id'].toString(),
            'Temperature (°C)': item['suhu'].toString(),
            'Humidity (%)': item['kelembapan'].toString(),
            'Created At':
                DateFormat('yyyy-MM-dd HH:mm').format(chartModel.createdAt),
          }));

          dataList.add(chartModel);
        }
        dataList.sort((a, b) => a.createdAt.compareTo(b.createdAt));
        dataList.refresh();
      } else {
        _showEmptyDailyPoint(selectedDate);
        throw Exception('Failed to load daily data');
      }
    } catch (e) {
      _showEmptyDailyPoint(selectedDate);
      print('Error fetching daily data: $e');
    }
  }

  Future<void> fetchWeeklyData(DateTime selectedDate) async {
    if (AppConfig.useDummyData) {
      final chipId = selectedSheep.value ?? DummyData.sheepOptions().first['chip_id']!;
      dataList.assignAll(DummyData.environmentWeekly(chipId, selectedDate));
      return;
    }
    try {
      final String formattedDate =
          DateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").format(selectedDate);
      final String chipId = selectedSheep.value ?? '';
      final String url = '$_baseUrl$_ahtWeeklyEndpoint/$formattedDate/$chipId';
      final response = await _http.get(url);

      if (response.statusCode == 200) {
        final data = response.body['data'];
        if (data == null || data.isEmpty) {
          listDataTableWeek.clear();
          dataList.clear();
          return;
        }

        listDataTableWeek.clear();
        dataList.clear();

        for (var item in data) {
          final chartModel = ChartModel(
            id: item['date'],
            suhu: double.tryParse(item['averageSuhu'].toString()) ?? 0.0,
            kelembaban:
                double.tryParse(item['averageKelembapan'].toString()) ?? 0.0,
            chipId: chipId,
            createdAt: DateTime.parse(item['date']),
          );
          dataList.add(chartModel);
        }
        dataList.refresh();
      } else {
        throw Exception('Failed to load weekly data');
      }
    } catch (e) {
      print('Error fetching weekly data: $e');
    }
  }

  Future<void> fetchMonthlyData(DateTime selectedDate) async {
    if (AppConfig.useDummyData) {
      final chipId = selectedSheep.value ?? DummyData.sheepOptions().first['chip_id']!;
      dataList.assignAll(DummyData.environmentMonthly(chipId, selectedDate));
      return;
    }
    try {
      final String formattedDate =
          DateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").format(selectedDate);
      final String chipId = selectedSheep.value ?? '';
      final String url = '$_baseUrl$_ahtMonthlyEndpoint/$formattedDate/$chipId';
      final response = await _http.get(url);

      if (response.statusCode == 200) {
        final data = response.body['averageValues'];
        if (data == null || data.isEmpty) {
          listDataTableMonth.clear();
          dataList.clear();
          return;
        }

        listDataTableMonth.clear();
        dataList.clear();

        for (var item in data) {
          final avgSuhu = double.tryParse(item['avgSuhu'].toString()) ?? 0.0;
          final avgKelembapan =
              double.tryParse(item['avgKelembapan'].toString()) ?? 0.0;

          final chartModel = ChartModel(
            id: item['week'].toString(),
            suhu: avgSuhu,
            kelembaban: avgKelembapan,
            chipId: chipId,
            createdAt: selectedDate,
          );

          listDataTableMonth.add(DataTableModelMonth({
            chartModel.id.toString(): avgSuhu,
          }));

          dataList.add(chartModel);
        }
        dataList.refresh();
      } else {
        throw Exception('Failed to load monthly data');
      }
    } catch (e) {
      print('Error fetching monthly data: $e');
    }
  }

  void fetchIndeksData() async {
    try {
      if (selectedSheep.value == null || selectedTimeRange.value == null) {
        dataList.clear();
        return;
      }

      final String timeRange = selectedTimeRange.value ?? 'Daily';
      final date = selectedDate.value ?? DateTime.now();

      if (timeRange == 'Daily') {
        await fetchDailyData(date);
      } else if (timeRange == 'Weekly') {
        await fetchWeeklyData(date);
      } else if (timeRange == 'Monthly') {
        await fetchMonthlyData(date);
      }
    } catch (e) {
      print('Error fetching Indeks data: $e');
    }
  }

  DateTime get activeDate => selectedDate.value ?? DateTime.now();

  void _showEmptyDailyPoint(DateTime date) {
    dataList.assignAll([
      ChartModel(
        id: 'empty-environment-${date.toIso8601String()}',
        chipId: selectedSheep.value ?? '',
        suhu: 0,
        kelembaban: 0,
        createdAt: date,
      ),
    ]);
  }

  void fetchDataTable(int page) async {
    if (AppConfig.useDummyData) {
      listDataTable.assignAll(DummyData.environmentTable());
      currentPage = 1;
      totalPage = 1;
      return;
    }
    try {
      final response = await _http.get(
        '$_baseUrl$_ahtEndpoint',
        query: {'page': page.toString()},
      );
      if (response.statusCode == 200) {
        final data = response.body;
        listDataTable.clear();
        for (var item in data['data']['rows']) {
          listDataTable.add(DataTableModel({
            'CHIP-ID': item['chip_id'].toString(),
            'Temperature (°C)': item['suhu']?.toString(),
            'Humidity (%)': item['kelembapan']?.toString(),
            'Created At': item['createdAt']?.toString(),
          }));
        }
        currentPage = page;
        totalPage = data['pagination']['totalPages'];
      } else {
        throw Exception('Failed to load data');
      }
    } catch (e) {
      print('Error fetching data table: $e');
    }
  }

  void resetState() {
    if (AppConfig.useDummyData) {
      selectedSheep.value = null;
      selectedTimeRange.value = null;
      selectedDate.value = null;
      _loadDummyData();
      return;
    }
    selectedSheep.value = null;
    selectedTimeRange.value = null;
    selectedDate.value = null;
    tanggalLahirController.clear();
    listDataTable.clear();
    listDataTableWeek.clear();
    dataList.clear();
    fetchSheepData();
    fetchIndeksData();
    fetchDataTable(currentPage);
  }
}
