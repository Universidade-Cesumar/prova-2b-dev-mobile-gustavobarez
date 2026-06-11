import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export default function EmptyState({ loading }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{loading ? '⏳' : '📦'}</Text>
      <Text style={styles.title}>
        {loading ? 'Carregando estoque...' : 'Estoque vazio'}
      </Text>
      <Text style={styles.subtitle}>
        {loading
          ? 'Buscando materiais na API...'
          : 'Cadastre o primeiro material usando o botão abaixo.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  icon: { fontSize: 56, marginBottom: 16 },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
