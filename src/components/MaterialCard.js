import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export default function MaterialCard({ item }) {
  const isConsumo = item.categoria === 'consumo';

  return (
    <View style={styles.card}>
      <View style={[styles.sidebar, { backgroundColor: isConsumo ? COLORS.accent : COLORS.primary }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.nome} numberOfLines={2}>{item.nome}</Text>
            <View style={[styles.badge, { backgroundColor: isConsumo ? '#E6F7F1' : '#E6EEF9' }]}>
              <Text style={[styles.badgeText, { color: isConsumo ? COLORS.accent : COLORS.primary }]}>
                {isConsumo ? '🧪 Consumo' : '🔧 Permanente'}
              </Text>
            </View>
          </View>
          <View style={styles.qtdBox}>
            <Text style={styles.qtdNum}>{item.quantidade}</Text>
            <Text style={styles.qtdLabel}>unid.</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  sidebar: { width: 5 },
  content: { flex: 1, padding: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerLeft: { flex: 1, marginRight: 12 },
  nome: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 5 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  qtdBox: {
    alignItems: 'center',
    backgroundColor: '#E6F7F1',
    borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8, minWidth: 60,
  },
  qtdNum: { fontSize: 22, fontWeight: '800', color: COLORS.accent },
  qtdLabel: { fontSize: 10, color: COLORS.accent, fontWeight: '600', textTransform: 'uppercase' },
});
