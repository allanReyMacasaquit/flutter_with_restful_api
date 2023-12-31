import 'package:flutter/material.dart';

Widget buildNavigationButton(BuildContext context, String text, Widget page) {
  return ElevatedButton(
    onPressed: () {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => page),
      );
    },
    child: Text('Go to $text'),
  );
}
