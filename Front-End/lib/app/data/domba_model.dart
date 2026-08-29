class DombaModels {
  final List<Baris> data;

  DombaModels({required this.data});

  factory DombaModels.fromJson(Map<String, dynamic> json) {
    var dataList = <Baris>[];
    if (json['data'] != null) {
      if (json['data'] is List) {
        dataList =
            (json['data'] as List).map((item) => Baris.fromJson(item)).toList();
      } else if (json['data'] is Map<String, dynamic>) {
        dataList.add(Baris.fromJson(json['data']));
      }
    }
    return DombaModels(data: dataList);
  }
}

class Baris {
  final String id;
  final String namaDomba;
  final int usia;
  final String jenisKelamin;
  final DateTime createdAt;
  final DateTime updatedAt;
  final double? berat;
  final double? beratPakan;
  final double? suhu;
  final double? kelembapan;
  final double? tinggi;
  final String kondisi;

  Baris({
    required this.id,
    required this.namaDomba,
    required this.usia,
    required this.jenisKelamin,
    required this.createdAt,
    required this.updatedAt,
    this.berat,
    this.beratPakan,
    this.suhu,
    this.kelembapan,
    this.tinggi,
    required this.kondisi,
  });

  factory Baris.fromJson(Map<String, dynamic> json) {
    final rawAge = json['usia'];
    final parsedBirthDate = rawAge is String ? DateTime.tryParse(rawAge) : null;
    final ageInMonths = rawAge is num
        ? rawAge.toInt()
        : parsedBirthDate == null
            ? 0
            : ((DateTime.now().difference(parsedBirthDate).inDays) / 30)
                .floor();
    final now = DateTime.now();

    DateTime parseDate(dynamic value) {
      return DateTime.tryParse(value?.toString() ?? '') ?? now;
    }

    return Baris(
      id: json['id']?.toString() ?? '',
      namaDomba: json['nama_domba']?.toString() ?? '',
      usia: ageInMonths,
      jenisKelamin: json['jenis_kelamin']?.toString() ?? '',
      createdAt: parseDate(json['createdAt']),
      updatedAt: parseDate(json['updatedAt']),
      berat: json['berat'] != null
          ? double.tryParse(json['berat'].toString())
          : null,
      beratPakan: json['berat_pakan'] != null
          ? double.tryParse(json['berat_pakan'].toString())
          : null,
      suhu: json['suhu'] != null
          ? double.tryParse(json['suhu'].toString())
          : null,
      kelembapan: json['kelembapan'] != null
          ? double.tryParse(json['kelembapan'].toString())
          : null,
      tinggi: json['tinggi'] != null
          ? double.tryParse(json['tinggi'].toString())
          : null,
      kondisi: json['classification']?.toString() ?? 'N/A',
    );
  }
}
