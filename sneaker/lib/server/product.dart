import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:sneaker/pages/product_detail_page.dart';

class Product extends StatelessWidget {
  const Product({Key? key}) : super(key: key);

  Future<List<dynamic>> fetchData() async {
    var url =
        Uri.parse('http://10.0.2.2:3005/product'); // Corrected the URL format
    try {
      var response = await http.get(url);

      if (response.statusCode == 200) {
        var data = json.decode(response.body);
        return data;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: FutureBuilder<List<dynamic>>(
        future: fetchData(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const CircularProgressIndicator(
              color: Color.fromARGB(255, 16, 97, 163),
              value: 10,
            );
          } else if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Text('No data available');
          } else {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                var product = snapshot.data![index];

                return GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ProductDetailPage(
                          productName: product['name'],
                        ),
                      ),
                    );
                  },
                  child: ListTile(
                    title: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('${product['name']}'), // Display the product name
                      ],
                    ),
                    leading: CircleAvatar(
                      backgroundImage: NetworkImage(
                        product['imageUrl'][0], // Use the first image URL
                      ),
                    ),
                    // Other ListTile properties like leading, trailing, etc.
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
