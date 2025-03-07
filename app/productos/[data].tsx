import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Data = () => {
  const { producto } = useLocalSearchParams();
  const productoJson = JSON.parse(producto + '');

  return (
    <View>
      <Text>Detalles del producto: {productoJson.title}</Text>
    </View>
  );
};

export default Data;

const styles = StyleSheet.create({});
