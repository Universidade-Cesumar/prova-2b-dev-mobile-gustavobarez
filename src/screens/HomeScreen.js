import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  SafeAreaView, StatusBar,
} from 'react-native';
import { COLORS } from '../constants';
import MaterialCard from '../components/MaterialCard';
import EmptyState from '../components/EmptyState';

export default function HomeScreen() {
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(false);

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
