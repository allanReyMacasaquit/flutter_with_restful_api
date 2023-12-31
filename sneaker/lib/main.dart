import 'package:flutter/material.dart';
import 'package:sneaker/pages/home_page.dart';

void main() {
  runApp(const SneakerApp());
}

class SneakerApp extends StatelessWidget {
  const SneakerApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Sneaker',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const Home(),
    );
  }
}
