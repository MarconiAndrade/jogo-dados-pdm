import React from 'react';
import { StyleSheet, View } from 'react-native';
import JogoDados from '../components/JogoDados'; 

export default function App() {
  return (
    <View style={styles.container}>
      <JogoDados />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});