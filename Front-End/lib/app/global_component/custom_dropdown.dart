import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';

class CustomDropdown extends StatelessWidget {
  final Rx<String?> selectedValue;
  final Function(String?) onChanged;
  final RxList<dynamic> items;
  final String hintText;
  final bool isMap;

  const CustomDropdown({
    super.key,
    required this.selectedValue,
    required this.onChanged,
    required this.items,
    required this.hintText,
    this.isMap = true,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: Color.fromARGB(255, 166, 212, 209)),
        borderRadius: BorderRadius.circular(6),
        gradient: const LinearGradient(
          colors: [
            Color.fromARGB(255, 185, 187, 224),
            Color.fromARGB(255, 167, 215, 149),
          ],
        ),
        boxShadow: const [
          BoxShadow(
            color: Color.fromARGB(255, 96, 99, 102),
            blurRadius: 5,
            spreadRadius: 1,
            offset: Offset(4, 1),
          ),
        ],
      ),
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
        ),
        margin: const EdgeInsets.all(0.5),
        child: DropdownButtonHideUnderline(
          child: GestureDetector(
            onTap: () {
              FocusScope.of(context).unfocus();
            },
            child: Obx(() {
              final availableItems = items.toList();
              if (isMap) {
                availableItems.sort((a, b) => a['nama_domba']
                    .toString()
                    .toLowerCase()
                    .compareTo(b['nama_domba'].toString().toLowerCase()));
              }

              return DropdownButton<String>(
                dropdownColor: Colors.white,
                borderRadius: BorderRadius.circular(10),
                isDense: true,
                value: availableItems.any((item) => isMap
                        ? item['chip_id'] == selectedValue.value
                        : item == selectedValue.value)
                    ? selectedValue.value
                    : null,
                icon: const Icon(Icons.arrow_drop_down),
                alignment: Alignment.center,
                padding: EdgeInsets.all(10),
                iconSize: 20,
                elevation: 10,
                hint: Align(
                  alignment: Alignment.center,
                  child: Text(
                    hintText,
                    style: GoogleFonts.ramabhadra(
                      color: Colors.black54,
                      fontWeight: FontWeight.normal,
                      fontSize: 14,
                    ),
                  ),
                ),
                style: GoogleFonts.ramabhadra(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
                onChanged: (value) {
                  if (value != null) {
                    selectedValue.value = value;
                    onChanged(value);
                  }
                },
                items: availableItems.isNotEmpty
                    ? availableItems.map<DropdownMenuItem<String>>((item) {
                        return DropdownMenuItem<String>(
                          value: isMap ? item['chip_id'] : item,
                          child: Text(isMap ? item['nama_domba']! : item),
                        );
                      }).toList()
                    : const <DropdownMenuItem<String>>[],
                selectedItemBuilder: (BuildContext context) {
                  return availableItems.map<Widget>((item) {
                    return Text(isMap ? item['nama_domba']! : item);
                  }).toList();
                },
              );
            }),
          ),
        ),
      ),
    );
  }
}
