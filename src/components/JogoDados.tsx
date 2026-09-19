import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Dado from './Dado'; 

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosA, setDadosA] = useState([1, 1]);
  const [dadosB, setDadosB] = useState([1, 1]);
  const [somaA, setSomaA] = useState(0);
  const [somaB, setSomaB] = useState(0);
  const [vitoriasA, setVitoriasA] = useState(0);
  const [vitoriasB, setVitoriasB] = useState(0);
  
  const [turno, setTurno] = useState('A'); 
  const [resultadoRodada, setResultadoRodada] = useState('');

  const rolarDados = () => {
    return [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    ];
  };

  const jogarA = () => {
    const novosDados = rolarDados();
    setDadosA(novosDados);
    setSomaA(novosDados[0] + novosDados[1]);
    setTurno('B');
  };

  const jogarB = () => {
    const novosDados = rolarDados();
    const novaSomaB = novosDados[0] + novosDados[1];
    
    setDadosB(novosDados);
    setSomaB(novaSomaB);

    let msg = '';
    if (somaA > novaSomaB) {
      msg = 'Jogador A Venceu a Rodada';
      setVitoriasA(v => v + 1);
    } else if (novaSomaB > somaA) {
      msg = 'Jogador B Venceu a Rodada';
      setVitoriasB(v => v + 1);
    } else {
      msg = 'Rodada Empatada';
    }
    
    setResultadoRodada(msg);

    if (rodada >= 5) {
      setTurno('FIM_JOGO');
    } else {
      setTurno('FIM_RODADA');
    }
  };

  const proximaRodada = () => {
    setRodada(r => r + 1);
    setTurno('A');
    setResultadoRodada('');
    setSomaA(0);
    setSomaB(0);
  };

  const reiniciarJogo = () => {
    setRodada(1);
    setDadosA([1, 1]);
    setDadosB([1, 1]);
    setSomaA(0);
    setSomaB(0);
    setVitoriasA(0);
    setVitoriasB(0);
    setTurno('A');
    setResultadoRodada('');
  };

  const getVencedorGeral = () => {
    if (vitoriasA > vitoriasB) return 'JOGADOR A VENCEU A PARTIDA!';
    if (vitoriasB > vitoriasA) return 'JOGADOR B VENCEU A PARTIDA!';
    return 'PARTIDA TERMINOU EM EMPATE!';
  };

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Rodada {rodada}</Text>

      <View style={styles.jogadoresContainer}>
        <View style={styles.colunaJogador}>
          <View style={styles.dadosContainer}>
            <Dado valor={dadosA[0]} />
            <Dado valor={dadosA[1]} />
          </View>
          <Text style={styles.textoJogador}>Jogador A</Text>
          {turno !== 'A' && somaA > 0 && (
            <Text style={styles.textoSoma}>Soma: {somaA}</Text>
          )}
        </View>

        <View style={styles.colunaJogador}>
          <View style={styles.dadosContainer}>
            <Dado valor={dadosB[0]} />
            <Dado valor={dadosB[1]} />
          </View>
          <Text style={styles.textoJogador}>Jogador B</Text>
          {(turno === 'FIM_RODADA' || turno === 'FIM_JOGO') && somaB > 0 && (
            <Text style={styles.textoSoma}>Soma: {somaB}</Text>
          )}
        </View>
      </View>

      <Text style={styles.resultadoRodada}>{resultadoRodada}</Text>

      {turno === 'FIM_JOGO' && (
        <View style={styles.fimJogoContainer}>
          <Text style={styles.resultadoFinal}>{getVencedorGeral()}</Text>
          <Text style={styles.placar}>
            Placar: A ({vitoriasA}) x B ({vitoriasB})
          </Text>
          <TouchableOpacity style={styles.botaoAcao} onPress={reiniciarJogo}>
            <Text style={styles.textoBotaoAcao}>Jogar Novamente</Text>
          </TouchableOpacity>
        </View>
      )}

      {turno !== 'FIM_JOGO' && (
        <View style={styles.controlesContainer}>
          <View style={styles.botoesJogarRow}>
            <TouchableOpacity
              style={[styles.botaoJogar, turno !== 'A' && styles.botaoDesabilitado]}
              onPress={jogarA}
              disabled={turno !== 'A'}
            >
              <Text style={styles.textoBotaoJogar}>Jogar Dado A</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botaoJogar, turno !== 'B' && styles.botaoDesabilitado]}
              onPress={jogarB}
              disabled={turno !== 'B'}
            >
              <Text style={styles.textoBotaoJogar}>Jogar Dado B</Text>
            </TouchableOpacity>
          </View>

          {turno === 'FIM_RODADA' && (
            <TouchableOpacity style={styles.botaoAcao} onPress={proximaRodada}>
              <Text style={styles.textoBotaoAcao}>Próxima Rodada</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  jogadoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  colunaJogador: {
    alignItems: 'center',
    flex: 1,
  },
  dadosContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textoJogador: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoSoma: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  resultadoRodada: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9534f',
    marginVertical: 20,
    textAlign: 'center',
    height: 25, 
  },
  controlesContainer: {
    width: '100%',
    alignItems: 'center',
  },
  botoesJogarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  botaoJogar: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
  },
  botaoDesabilitado: {
    backgroundColor: '#ccc',
    borderColor: '#aaa',
  },
  textoBotaoJogar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoAcao: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  textoBotaoAcao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fimJogoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  resultadoFinal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#28a745',
    textAlign: 'center',
    marginBottom: 10,
  },
  placar: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});