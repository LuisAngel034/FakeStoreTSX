import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

const ProductDetail = () => {
    const { id } = useLocalSearchParams();
  
    type Producto = {
      id: number;
      title: string;
      price: number;
      description: string;
      category: string;
      image: string;
      rating: {
        rate: number;
        count: number;
      };
    };
  
    const [product, setProduct] = useState<Producto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchProduct = async () => {
        if (!id) {
          console.error("No se proporcionó un ID de producto.");
          setLoading(false);
          return;
        }
  
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
          const data = await response.json();
          setProduct(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product details:', error);
          setLoading(false);
        }
      };
  
      fetchProduct();
    }, [id]);
  
    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Esperando datos...</Text>
          <ActivityIndicator />
        </View>
      );
    }
  
    if (!product) {
      return (
        <View style={styles.container}>
          <Text>No se encontraron detalles del producto.</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <Text>Producto: {product.title}</Text>
        <Text>Precio: ${product.price}</Text>
        <Text>Descripción: {product.description}</Text>
        <Image source={{ uri: product.image }} style={{ width: 200, height: 200 }} />
      </View>
    );
  };
  

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
