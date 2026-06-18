import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { validarRetirada } from './src/utils/validacoes';

export default function App() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [busca, setBusca] = useState('');
  const [materiais, setMateriais] = useState([]);

  const handleCadastrar = () => {
    if (!nome.trim() || !quantidade.trim()) return;
    setMateriais(prev => [...prev, { id: String(Date.now()), name: nome, quantidade }]);
    setNome('');
    setQuantidade('');
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
