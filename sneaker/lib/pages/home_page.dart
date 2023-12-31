import 'package:flutter/material.dart';
import 'package:sneaker/server/product.dart';

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: const Padding(
            padding: EdgeInsets.all(8.0),
            child: Center(
              child: Text(
                'Sneaker',
                style: TextStyle(
                  // Add styles for the text if needed
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ),
        body: const Product());
  }
}
