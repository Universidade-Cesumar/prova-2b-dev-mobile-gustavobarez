import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  SafeAreaView, StatusBar, Alert, RefreshControl,
} from 'react-native';
import { COLORS, ENDPOINTS } from '../constants';
import MaterialCard from '../components/MaterialCard';
import EmptyState from '../components/EmptyState';

export default function HomeScreen() {
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    fetchMateriais();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMateriais();
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});
