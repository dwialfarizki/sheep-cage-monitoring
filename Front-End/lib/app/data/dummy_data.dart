import 'package:intl/intl.dart';
import 'package:monitoring_kambing/app/data/chart_model.dart';
import 'package:monitoring_kambing/app/data/datatable_model.dart';
import 'package:monitoring_kambing/app/data/domba_model.dart';

class DummyData {
  static const _sheep = [
    ('Sheep A', 'DEMO-001', 18, 'Male', 42.6, 820, 28.4, 64.0, 'Healthy'),
    ('Sheep B', 'DEMO-002', 14, 'Female', 38.9, 760, 27.8, 68.0, 'Healthy'),
    ('Sheep C', 'DEMO-003', 22, 'Male', 47.2, 910, 29.1, 61.0, 'Healthy'),
    (
      'Sheep D',
      'DEMO-004',
      11,
      'Female',
      34.7,
      690,
      28.0,
      72.0,
      'Needs Monitoring'
    ),
    ('Sheep E', 'DEMO-005', 16, 'Male', 40.3, 800, 28.7, 66.0, 'Healthy'),
  ];

  static DateTime _time(int index) {
    return DateTime.now().subtract(Duration(hours: (4 - index) * 3));
  }

  static DateTime _dateOnly(DateTime value) {
    return DateTime(value.year, value.month, value.day);
  }

  static DateTime _demoMeasurementDate() => _dateOnly(DateTime.now());

  static bool _sameDate(DateTime left, DateTime right) {
    return left.year == right.year &&
        left.month == right.month &&
        left.day == right.day;
  }

  static (String, String, int, String, double, int, double, double, String)
      _sheepFor(String chipId) {
    return _sheep.firstWhere(
      (item) => item.$2 == chipId,
      orElse: () => _sheep.first,
    );
  }

  static String _format(DateTime value) {
    return DateFormat('yyyy-MM-dd HH:mm').format(value);
  }

  static List<Map<String, String>> sheepOptions() {
    return _sheep
        .map((item) => {
              'nama_domba': item.$1,
              'chip_id': item.$2,
            })
        .toList();
  }

  static List<Baris> sheepDetails() {
    final now = DateTime.now();
    return _sheep
        .map(
          (item) => Baris(
            id: item.$2,
            namaDomba: item.$1,
            usia: item.$3,
            jenisKelamin: item.$4,
            createdAt: now.subtract(const Duration(days: 30)),
            updatedAt: now,
            berat: item.$5,
            beratPakan: item.$6.toDouble(),
            suhu: item.$7,
            kelembapan: item.$8,
            tinggi: 71.0,
            kondisi: item.$9,
          ),
        )
        .toList();
  }

  static List<DataTableModel> sheepTable() {
    return _sheep
        .map(
          (item) => DataTableModel({
            'UID': item.$2,
            'Sheep Name': item.$1,
            'Age (Month)': item.$3.toString(),
            'Gender': item.$4,
            'Created At':
                _format(DateTime.now().subtract(const Duration(days: 30))),
          }),
        )
        .toList();
  }

  static List<ChartModel> weightDaily(String chipId, [DateTime? selectedDate]) {
    final date = _dateOnly(selectedDate ?? DateTime.now());
    final item = _sheepFor(chipId);
    return [
      ChartModel(
        id: 'weight-$chipId-${date.toIso8601String()}',
        chipId: chipId,
        berat: _sameDate(date, _demoMeasurementDate()) ? item.$5 : 0,
        createdAt: date.add(const Duration(hours: 12)),
      ),
    ];
  }

  static List<ChartModel> weightWeekly(String chipId,
      [DateTime? selectedDate]) {
    final anchor = _dateOnly(selectedDate ?? DateTime.now());
    final item = _sheepFor(chipId);
    return List.generate(7, (index) {
      final date = anchor.add(Duration(days: index - 3));
      return ChartModel(
        id: 'weight-week-$chipId-$index',
        chipId: chipId,
        berat: _sameDate(date, _demoMeasurementDate()) ? item.$5 : 0,
        createdAt: date,
      );
    });
  }

  static List<ChartModel> weightMonthly(String chipId,
      [DateTime? selectedDate]) {
    final anchor = _dateOnly(selectedDate ?? DateTime.now());
    final item = _sheepFor(chipId);
    final starts = [1, 8, 16, 23];
    return List.generate(4, (index) {
      final start = DateTime(anchor.year, anchor.month, starts[index]);
      final end = index == 3
          ? DateTime(anchor.year, anchor.month + 1, 1)
          : DateTime(anchor.year, anchor.month, starts[index + 1]);
      final hasData = _demoMeasurementDate()
              .isAfter(start.subtract(const Duration(seconds: 1))) &&
          _demoMeasurementDate().isBefore(end);
      return ChartModel(
        id: 'week-${index + 1}',
        chipId: chipId,
        berat: hasData ? item.$5 : 0,
        createdAt: start,
      );
    });
  }

  static List<DataTableModel> weightTable() {
    return _sheep
        .map(
          (item) => DataTableModel({
            'CHIP-ID': item.$2,
            'Sheep Name': item.$1,
            'Gender': item.$4,
            'Weight (KG)': item.$5.toStringAsFixed(1),
            'Created At': _format(_time(4)),
          }),
        )
        .toList();
  }

  static List<ChartModel> environmentDaily(String chipId,
      [DateTime? selectedDate]) {
    final date = _dateOnly(selectedDate ?? DateTime.now());
    final item = _sheepFor(chipId);
    return [
      ChartModel(
        id: 'environment-$chipId-${date.toIso8601String()}',
        chipId: chipId,
        suhu: _sameDate(date, _demoMeasurementDate()) ? item.$7 : 0,
        kelembaban: _sameDate(date, _demoMeasurementDate()) ? item.$8 : 0,
        createdAt: date.add(const Duration(hours: 12)),
      ),
    ];
  }

  static List<ChartModel> environmentWeekly(String chipId,
      [DateTime? selectedDate]) {
    final anchor = _dateOnly(selectedDate ?? DateTime.now());
    final item = _sheepFor(chipId);
    return List.generate(7, (index) {
      final date = anchor.add(Duration(days: index - 3));
      final hasData = _sameDate(date, _demoMeasurementDate());
      return ChartModel(
        id: 'environment-week-$chipId-$index',
        chipId: chipId,
        suhu: hasData ? item.$7 : 0,
        kelembaban: hasData ? item.$8 : 0,
        createdAt: date,
      );
    });
  }

  static List<ChartModel> environmentMonthly(String chipId,
      [DateTime? selectedDate]) {
    final anchor = _dateOnly(selectedDate ?? DateTime.now());
    final item = _sheepFor(chipId);
    final starts = [1, 8, 16, 23];
    return List.generate(4, (index) {
      final start = DateTime(anchor.year, anchor.month, starts[index]);
      final end = index == 3
          ? DateTime(anchor.year, anchor.month + 1, 1)
          : DateTime(anchor.year, anchor.month, starts[index + 1]);
      final hasData = _demoMeasurementDate()
              .isAfter(start.subtract(const Duration(seconds: 1))) &&
          _demoMeasurementDate().isBefore(end);
      return ChartModel(
        id: 'environment-month-$index',
        chipId: chipId,
        suhu: hasData ? item.$7 : 0,
        kelembaban: hasData ? item.$8 : 0,
        createdAt: start,
      );
    });
  }

  static List<DataTableModel> environmentTable() {
    return _sheep
        .map(
          (item) => DataTableModel({
            'CHIP-ID': item.$2,
            'Temperature (°C)': item.$7.toStringAsFixed(1),
            'Humidity (%)': item.$8.toStringAsFixed(1),
            'Created At': _format(_time(4)),
          }),
        )
        .toList();
  }

  static List<ChartModel> feedDaily(String chipId, [DateTime? selectedDate]) {
    final date = _dateOnly(selectedDate ?? DateTime.now());
    final item = _sheepFor(chipId);
    return [
      ChartModel(
        id: 'feed-$chipId-${date.toIso8601String()}',
        chipId: chipId,
        beratPakan:
            _sameDate(date, _demoMeasurementDate()) ? item.$6.toDouble() : 0,
        beratPakanmentah: _sameDate(date, _demoMeasurementDate())
            ? item.$6.toDouble() + 120
            : 0,
        createdAt: date.add(const Duration(hours: 12)),
      ),
    ];
  }

  static List<ChartModel> feedWeekly(String chipId, [DateTime? selectedDate]) {
    final anchor = _dateOnly(selectedDate ?? DateTime.now());
    final item = _sheepFor(chipId);
    return List.generate(7, (index) {
      final date = anchor.add(Duration(days: index - 3));
      final hasData = _sameDate(date, _demoMeasurementDate());
      return ChartModel(
        id: 'feed-week-$chipId-$index',
        chipId: chipId,
        beratPakan: hasData ? item.$6.toDouble() : 0,
        beratPakanmentah: hasData ? item.$6.toDouble() + 120 : 0,
        createdAt: date,
      );
    });
  }

  static List<ChartModel> feedMonthly(String chipId, [DateTime? selectedDate]) {
    final anchor = _dateOnly(selectedDate ?? DateTime.now());
    final item = _sheepFor(chipId);
    final starts = [1, 8, 16, 23];
    return List.generate(4, (index) {
      final start = DateTime(anchor.year, anchor.month, starts[index]);
      final end = index == 3
          ? DateTime(anchor.year, anchor.month + 1, 1)
          : DateTime(anchor.year, anchor.month, starts[index + 1]);
      final hasData = _demoMeasurementDate()
              .isAfter(start.subtract(const Duration(seconds: 1))) &&
          _demoMeasurementDate().isBefore(end);
      return ChartModel(
        id: 'feed-month-$index',
        chipId: chipId,
        beratPakan: hasData ? item.$6.toDouble() : 0,
        beratPakanmentah: hasData ? item.$6.toDouble() + 120 : 0,
        createdAt: start,
      );
    });
  }

  static List<DataTableModel> feedTable() {
    return _sheep
        .map(
          (item) => DataTableModel({
            'CHIP-ID': item.$2,
            'Sheep Name': item.$1,
            'Gender': item.$4,
            'Food Weight (Gram)': (item.$6 - 40).toStringAsFixed(0),
            'Raw Food Weight (Gram)': (item.$6 + 120).toStringAsFixed(0),
            'Created At': _format(_time(4)),
          }),
        )
        .toList();
  }

  static List<ChartModel> gyroSeries(String chipId) {
    return List.generate(
      5,
      (index) => ChartModel(
        id: 'gyro-$index',
        chipId: chipId,
        mean_x: 0.12 + index * 0.08,
        mean_y: 0.22 + index * 0.05,
        mean_z: 0.42 - index * 0.03,
        createdAt: _time(index),
      ),
    );
  }

  static List<DataTableModel> gyroTable() {
    return _sheep
        .map(
          (item) => DataTableModel({
            'CHIP-ID': item.$2,
            'Sheep Name': item.$1,
            'Gender': item.$4,
            'X': '0.12',
            'Y': '0.22',
            'Z': '0.42',
            'Condition': item.$9,
            'Created At': _format(_time(4)),
          }),
        )
        .toList();
  }
}
