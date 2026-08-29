import 'package:get/get.dart';

class SensorController extends GetxController {
  var sensorList = <Map<String, String>>[].obs;

  @override
  void onInit() {
    super.onInit();
    fetchSensorData();
  }

  void fetchSensorData() {
    sensorList.value = [
      {
        'imageUrl': 'assets/images/sensor/RaFID.png',
        'nama_sensor': 'RFID',
        'penjelasan':
            'The MFRC522 RFID sensor reads and writes data to RFID cards using wireless radio communication between the tag and reader. It is popular for access control, item identification, and tracking systems.'
      },
      {
        'imageUrl': 'assets/images/sensor/loadcellBadan.png',
        'nama_sensor': 'Body Load Cell',
        'penjelasan':
            'A load cell measures the force or weight of an object through elastic deformation. A strain gauge detects resistance changes caused by the applied load and converts them into an electrical signal. An amplifier may be used to strengthen the signal before it is processed by a microcontroller or computer.'
      },
      {
        'imageUrl': 'assets/images/sensor/loadcellpakan.png',
        'nama_sensor': 'Feed Load Cell',
        'penjelasan':
            'A load cell measures weight or pressure by converting the applied force into a measurable signal. Its analog or digital output can be processed by computers and microcontrollers. Its fast response makes it suitable for real-time measurement applications.'
      },
      {
        'imageUrl': 'assets/images/sensor/aht.png',
        'nama_sensor': 'AHT20',
        'penjelasan':
            'The AHT20 is a digital temperature and humidity sensor with an accurate I2C interface. It is reliable, easy to use, and suitable for environmental monitoring, HVAC, and IoT applications. Its high resolution and automatic calibration help improve measurement precision.'
      },
      {
        'imageUrl': 'assets/images/sensor/mpu.png',
        'nama_sensor': 'MPU6050',
        'penjelasan':
            'The behavior detection system uses the MPU6050 accelerometer and gyroscope to measure rotation (Roll, Pitch, Yaw) and acceleration (AccX, AccY, AccZ). A Kalman filter improves angle accuracy. Movement is detected from significant RateRoll and RatePitch changes, and the data is sent to the server through HTTP POST for analysis.'
      },
    ];
  }
}
