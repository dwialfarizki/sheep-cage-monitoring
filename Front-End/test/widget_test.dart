import 'package:flutter_test/flutter_test.dart';
import 'package:monitoring_kambing/app/data/domba_model.dart';
import 'package:monitoring_kambing/app/data/dummy_data.dart';

void main() {
  test('demo data exposes five sheep', () {
    expect(DummyData.sheepOptions(), hasLength(5));
    expect(DummyData.sheepDetails(), hasLength(5));
  });

  test('sheep age accepts the backend ISO birth date', () {
    final result = Baris.fromJson({
      'id': 'demo-id',
      'nama_domba': 'Sheep Test',
      'usia': '2024-01-01T00:00:00.000Z',
      'jenis_kelamin': 'Male',
      'createdAt': '2024-01-01T00:00:00.000Z',
      'updatedAt': '2024-01-01T00:00:00.000Z',
    });

    expect(result.usia, greaterThan(0));
    expect(result.namaDomba, 'Sheep Test');
  });

  test('analytics windows keep their expected number of points', () {
    final anchor = DateTime.now();
    final weekly = DummyData.weightWeekly('DEMO-001', anchor);
    final monthly = DummyData.weightMonthly('DEMO-001', anchor);

    expect(DummyData.weightDaily('DEMO-001', anchor), hasLength(1));
    final emptyDaily = DummyData.weightDaily(
      'DEMO-001',
      anchor.subtract(const Duration(days: 1)),
    );
    expect(emptyDaily, hasLength(1));
    expect(emptyDaily.single.berat, 0);
    final emptyFeedDaily = DummyData.feedDaily(
      'DEMO-001',
      anchor.subtract(const Duration(days: 1)),
    );
    final emptyEnvironmentDaily = DummyData.environmentDaily(
      'DEMO-001',
      anchor.subtract(const Duration(days: 1)),
    );
    expect(emptyFeedDaily, hasLength(1));
    expect(emptyFeedDaily.single.beratPakan, 0);
    expect(emptyEnvironmentDaily, hasLength(1));
    expect(emptyEnvironmentDaily.single.suhu, 0);
    expect(emptyEnvironmentDaily.single.kelembaban, 0);
    expect(weekly, hasLength(7));
    expect(weekly.where((point) => point.berat == 0), hasLength(6));
    expect(monthly, hasLength(4));
  });
}
