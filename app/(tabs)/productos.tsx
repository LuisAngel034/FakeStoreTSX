import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import Boton from '../components/Boton';

const productoDetails = () => {
  const [Productos, setProductos] = useState<any[]>([]);
  const [Cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const consultar = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch('https://fakestoreapi.com/products');
        if (!respuesta.ok) {
          throw new Error('Error al realizar la peticion: ${respuesta.status}');
        }
        const datos = await respuesta.json();
        setProductos(datos);
        setCargando(false);
      } catch (error) {
        console.log('Error al obtener los datos: ', error);
        setCargando(false);
      }
    };
    consultar();
  }, []);

  const ProductoItem = (props: any) => {
    return (
      <View style={styles.card}>
        <Text>Producto: {props.title}</Text>
        <Text>Descripción: {props.description}</Text>
        <Image source={{ uri: props.image }} style={{ height: 100, width: 100 }} />
        <Link href={`/productos/${props.id}`}>
          <Boton titulo="Ver Detalles..." />
        </Link>
      </View>
    );
  };

  const UnloadScreen = () => {
    return (
      <View style={styles.loadscreen}>
        <Text style={styles.titulo}>Cargando Datos...</Text>
        <ActivityIndicator />
      </View>
    );
  };

  const LoadScreen = () => {
    return (
      <View style={styles.loadscreen}>
        <Text style={styles.titulo}>Productos Disponibles</Text>
        <FlatList
          data={Productos}
          renderItem={({ item }) => (
            <ProductoItem
              title={item.title}
              description={item.description}
              image={item.image}
              id={item.id}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatlist}
        />
      </View>
    );
  };

  return <View style={styles.container}>{Cargando ? UnloadScreen() : LoadScreen()}</View>;
};

export default productoDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  flatlist: {
    width: '100%',
  },
  loadscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
