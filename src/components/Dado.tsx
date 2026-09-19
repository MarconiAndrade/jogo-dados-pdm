import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface DadoProps {
  valor: number;
}

export default function Dado({ valor }: DadoProps) {
  const getImagemDado = (val: number) => {
    switch (val) {
      case 1: return require('../../assets/images/face1.png');
      case 2: return require('../../assets/images/face2.png');
      case 3: return require('../../assets/images/face3.png');
      case 4: return require('../../assets/images/face4.png');
      case 5: return require('../../assets/images/face5.png');
      case 6: return require('../../assets/images/face6.png');
      default: return require('../../assets/images/face1.png');
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