import 'package:flutter/material.dart';

class ProductDetailPage extends StatelessWidget {
  final String productName;

  const ProductDetailPage({super.key, required this.productName});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Product Detail'),
      ),
      body: Center(
        child: Text('Product Name: $productName'), // Display product details
      ),
    );
  }
}
