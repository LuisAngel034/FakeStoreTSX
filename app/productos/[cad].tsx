import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

const CategoryProductDetail = () => {
  const { categoria } = useLocalSearchParams();

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

  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${categoria}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const data = await response.json();
        setProductos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category products:', error);
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoria]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando productos...</Text>
        <ActivityIndicator />
      </View>
    );
  }

  if (productos.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No se encontraron productos para esta categoría.</Text>
      </View>
    );
  }

  const ProductoItem = ({ item }: { item: Producto }) => {
    return (
      <View style={styles.card}>
        <Text>{item.title}</Text>
        <Text>Precio: ${item.price}</Text>
        <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
        <Text>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Productos en la categoría: {categoria}</Text>
      <FlatList
        data={productos}
        renderItem={({ item }) => <ProductoItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatlist}
      />
    </View>
  );
};

export default CategoryProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: '90%',
  },
  flatlist: {
    width: '100%',
  },
});
