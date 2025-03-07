import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import Boton from '../components/Boton';

const CategoriaDetails = () => {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const consultar = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch('https://fakestoreapi.com/products/categories');
        if (!respuesta.ok) {
          throw new Error(`Error al realizar la petición: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setCategorias(datos);
        setCargando(false);
      } catch (error) {
        console.log('Error al obtener los datos: ', error);
        setCargando(false);
      }
    };
    consultar();
  }, []);

  const CategoriaItem = (props: any) => {
    return (
      <View style={styles.card}>
        <Text>{props.title}</Text>
        
        <Link href={`/productos/categoria/${props.title}`}>
          <Boton titulo="Ver Producto" />
        </Link>
      </View>
    );
  };

  const UnloadScreen = () => {
    return (
      <View style={styles.loadscreen}>
        <Text style={styles.titulo}>Cargando Categorías...</Text>
        <ActivityIndicator />
      </View>
    );
  };

  const LoadScreen = () => {
    return (
      <View style={styles.loadscreen}>
        <Text style={styles.titulo}>Categorias Disponibles</Text>
        <FlatList
          data={categorias}
          renderItem={({ item }) => (
            <CategoriaItem title={item} />
          )}
          keyExtractor={(item) => item}
          style={styles.flatlist}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cargando ? UnloadScreen() : LoadScreen()}
    </View>
  );
};

export default CategoriaDetails;

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
  link: {
    fontSize: 20,
    color: 'blue',
    margin: 10,
  },
});
