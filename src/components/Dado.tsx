import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface DadoProps {
  valor: number;
}

export default function Dado({ valor }: DadoProps) {
  const getImagemDado = (val: number) => {
    switch (val) {
      case 1: return require('../../assets/images/face1.jpeg');
      case 2: return require('../../assets/images/face2.jpeg');
      case 3: return require('../../assets/images/face3.jpeg');
      case 4: return require('../../assets/images/face4.jpeg');
      case 5: return require('../../assets/images/face5.jpeg');
      case 6: return require('../../assets/images/face6.jpeg');
      default: return require('../../assets/images/face1.jpeg');
    }
  };

  return <Image source={getImagemDado(valor)} style={styles.dadoImage} />;
}

const styles = StyleSheet.create({
  dadoImage: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    resizeMode: 'contain',
  },
});