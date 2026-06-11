import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export default function MaterialCard({ item }) {
  const isConsumo = item.categoria === 'consumo';
  const isZerado = Number(item.quantidade) === 0;

  return (
    <View style={[styles.card, isZerado && styles.cardZerado]}>
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
          <View style={[styles.qtdBox, isZerado && styles.qtdBoxZerado]}>
            <Text style={[styles.qtdNum, isZerado && styles.qtdNumZerado]}>
              {item.quantidade}
            </Text>
            <Text style={[styles.qtdLabel, isZerado && styles.qtdLabelZerado]}>
              {isZerado ? 'ZERADO' : 'unid.'}
            </Text>
          </View>
        </View>
        {isZerado && (
          <Text style={styles.alertaZerado}>⛔ Este item está zerado no estoque!</Text>
        )}
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
  cardZerado: { borderWidth: 1, borderColor: COLORS.danger },
  sidebar: { width: 5 },
  content: { flex: 1, padding: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerLeft: { flex: 1, marginRight: 12 },
  nome: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 5 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  qtdBox: {
    alignItems: 'center', backgroundColor: '#E6F7F1',
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, minWidth: 60,
  },
  qtdBoxZerado: { backgroundColor: '#FDECEB' },
  qtdNum: { fontSize: 22, fontWeight: '800', color: COLORS.accent },
  qtdNumZerado: { color: COLORS.danger, fontSize: 18 },
  qtdLabel: { fontSize: 10, color: COLORS.accent, fontWeight: '600', textTransform: 'uppercase' },
  qtdLabelZerado: { color: COLORS.danger, fontSize: 9 },
  alertaZerado: { fontSize: 12, color: COLORS.danger, fontWeight: '700', marginTop: 8 },
});
