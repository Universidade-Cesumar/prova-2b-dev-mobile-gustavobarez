import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { validarRetirada } from './src/utils/validacoes';

export default function App() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [busca, setBusca] = useState('');
  const [materiais, setMateriais] = useState([]);
  const [retiradas, setRetiradas] = useState({});

  const handleCadastrar = () => {
    if (!nome.trim() || !quantidade.trim()) return;
    setMateriais(prev => [...prev, { id: String(Date.now()), name: nome, quantidade: Number(quantidade) }]);
    setNome('');
    setQuantidade('');
  };

  const handleBaixar = (item) => {
    const qtdRetirada = Number(retiradas[item.id] || 0);
    if (!validarRetirada(item.quantidade, qtdRetirada)) {
      Alert.alert('Erro', 'Quantidade inválida para retirada');
      return;
    }
    setMateriais(prev => prev.map(m => m.id === item.id ? { ...m, quantidade: m.quantidade - qtdRetirada } : m));
    setRetiradas(prev => ({ ...prev, [item.id]: '' }));
  };

  const handleExcluir = (id) => {
    setMateriais(prev => prev.filter(m => m.id !== id));
  };

  const filtrados = materiais.filter(m => m.name.toLowerCase().includes(busca.toLowerCase()));

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput testID="input-nome" value={nome} onChangeText={setNome} placeholder="Nome" />
      <TextInput testID="input-quantidade" value={quantidade} onChangeText={setQuantidade} placeholder="Quantidade" keyboardType="numeric" />
      <TouchableOpacity testID="btn-cadastrar" onPress={handleCadastrar}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
      <TextInput testID="input-busca" value={busca} onChangeText={setBusca} placeholder="Buscar" />
      <Text testID="total-itens">{filtrados.length}</Text>
      <FlatList testID="lista-materials" data={filtrados} keyExtractor={item => item.id} renderItem={({ item }) => <Text>{item.name}</Text>} />
    </View>
  );
}
