import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  SafeAreaView, StatusBar, Alert, RefreshControl,
} from 'react-native';
import { COLORS, ENDPOINTS } from '../constants';
import MaterialCard from '../components/MaterialCard';
import CadastroModal from '../components/CadastroModal';
import EmptyState from '../components/EmptyState';

export default function HomeScreen() {
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchMateriais = async () => {
    try {
      const response = await fetch(ENDPOINTS.materiais);
      if (!response.ok) throw new Error('Erro na requisição');
      const data = await response.json();
      setMateriais(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o estoque. Verifique a URL do MockAPI.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchMateriais(); }, []);

  const handleRefresh = () => { setRefreshing(true); fetchMateriais(); };

  const handleMaterialCadastrado = (novo) => {
    setMateriais((prev) => [novo, ...prev]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>Laboratório de Enfermagem</Text>
          <Text style={styles.headerTitle}>Almoxarifado</Text>
        </View>
        <Text style={{ fontSize: 28 }}>🏥</Text>
      </View>

      <FlatList
        testID="lista-materiais"
        data={materiais}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MaterialCard item={item} />}
        contentContainerStyle={materiais.length === 0 ? { flex: 1 } : { paddingBottom: 100 }}
        ListEmptyComponent={<EmptyState loading={loading} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>＋</Text>
        <Text style={styles.fabLabel}>Novo Material</Text>
      </TouchableOpacity>

      <CadastroModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSucesso={handleMaterialCadastrado}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerEyebrow: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  headerTitle: { fontSize: 28, fontWeight: '900', color: '#FFFFFF' },
  fab: {
    position: 'absolute',
    bottom: 28, right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 8,
    gap: 8,
  },
  fabText: { fontSize: 22, color: '#fff', fontWeight: '300', lineHeight: 24 },
  fabLabel: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
