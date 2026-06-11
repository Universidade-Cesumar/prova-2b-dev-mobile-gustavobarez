import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export default function MaterialCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.nome}>{item.nome}</Text>
        <View style={styles.qtdBox}>
          <Text style={styles.qtdNum}>{item.quantidade}</Text>
          <Text style={styles.qtdLabel}>unid.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nome: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 12,
  },
  qtdBox: {
    alignItems: 'center',
    backgroundColor: '#E6F7F1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 60,
  },
  qtdNum: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.accent,
  },
  qtdLabel: {
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
