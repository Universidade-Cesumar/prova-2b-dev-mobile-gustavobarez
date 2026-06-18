import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, ENDPOINTS } from "../constants";
import { validarRetirada } from "../../../src/utils/validacoes";

export default function MaterialCard({ item, onUpdate, onDelete }) {
  const [qtdRetirada, setQtdRetirada] = useState('');

  const handleBaixar = async () => {
    const quantidade = Number(qtdRetirada);
    if (!validarRetirada(Number(item.quantidade), quantidade)) {
      Alert.alert('Erro', 'Quantidade inválida para retirada');
      return;
    }
    try {
      const novaQtd = Number(item.quantidade) - quantidade;
      const response = await fetch(`${ENDPOINTS.materiais}/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, quantidade: novaQtd }),
      });
      if (!response.ok) throw new Error('Erro ao atualizar');
      const atualizado = await response.json();
      onUpdate && onUpdate(atualizado);
      setQtdRetirada('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a baixa');
    }
  };

  const handleExcluir = async () => {
    try {
      const response = await fetch(`${ENDPOINTS.materiais}/${item.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao excluir');
      onDelete && onDelete(item.id);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o item');
    }
  };

  const isConsumo = item.categoria === "consumo";
  const isZerado = Number(item.quantidade) === 0;

  return (
    <View style={[styles.card, isZerado && styles.cardZerado]}>
      <View
        style={[
          styles.sidebar,
          { backgroundColor: isConsumo ? COLORS.accent : COLORS.primary },
        ]}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.nome} numberOfLines={2}>
              {item.name}
            </Text>
            <View
              style={[
                styles.badge,
                { backgroundColor: isConsumo ? "#E6F7F1" : "#E6EEF9" },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  { color: isConsumo ? COLORS.accent : COLORS.primary },
                ]}
              >
                {isConsumo ? "🧪 Consumo" : "🔧 Permanente"}
              </Text>
            </View>
          </View>
          <View style={[styles.qtdBox, isZerado && styles.qtdBoxZerado]}>
            <Text style={[styles.qtdNum, isZerado && styles.qtdNumZerado]}>
              {item.quantidade}
            </Text>
            <Text style={[styles.qtdLabel, isZerado && styles.qtdLabelZerado]}>
              {isZerado ? "ZERADO" : "unid."}
            </Text>
          </View>
        </View>
        {isZerado && (
          <Text style={styles.alertaZerado}>
            ⛔ Este item está zerado no estoque!
          </Text>
        )}
        <View style={styles.actions}>
          <TextInput
            testID="input-retirada"
            style={styles.inputRetirada}
            value={qtdRetirada}
            onChangeText={setQtdRetirada}
            placeholder="Qtd"
            keyboardType="numeric"
          />
          <TouchableOpacity testID="btn-baixar" style={styles.btnBaixar} onPress={handleBaixar}>
            <Text style={styles.btnText}>Baixar</Text>
          </TouchableOpacity>
          <TouchableOpacity testID="btn-excluir" style={styles.btnExcluir} onPress={handleExcluir}>
            <Text style={styles.btnText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
  },
  cardZerado: { borderWidth: 1, borderColor: COLORS.danger },
  sidebar: { width: 5 },
  content: { flex: 1, padding: 14 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: { flex: 1, marginRight: 12 },
  nome: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: { fontSize: 11, fontWeight: "600" },
  qtdBox: {
    alignItems: "center",
    backgroundColor: "#E6F7F1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 60,
  },
  qtdBoxZerado: { backgroundColor: "#FDECEB" },
  qtdNum: { fontSize: 22, fontWeight: "800", color: COLORS.accent },
  qtdNumZerado: { color: COLORS.danger, fontSize: 18 },
  qtdLabel: {
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  qtdLabelZerado: { color: COLORS.danger, fontSize: 9 },
  alertaZerado: {
    fontSize: 12,
    color: COLORS.danger,
    fontWeight: "700",
    marginTop: 8,
  },
});
