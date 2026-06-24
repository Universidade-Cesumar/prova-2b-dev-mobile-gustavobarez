import { useState, useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, ENDPOINTS } from "../constants";
import { validarRetirada } from "../utils/validacoes";

function Toast({ message, type, onHide }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(2500),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => onHide());
  }, []);

  return (
    <Animated.View style={[styles.toast, type === 'error' ? styles.toastError : styles.toastSuccess, { opacity }]}>
      <Text style={styles.toastText}>{type === 'error' ? '✕' : '✓'} {message}</Text>
    </Animated.View>
  );
}

export default function MaterialCard({ item, onUpdate, onDelete }) {
  const [qtdRetirada, setQtdRetirada] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => setToast({ message, type });

  const handleBaixar = async () => {
    const quantidade = Number(qtdRetirada);
    if (!validarRetirada(Number(item.quantidade), quantidade)) {
      showToast('Quantidade inválida para retirada', 'error');
      return;
    }
    try {
      const novaQtd = Number(item.quantidade) - quantidade;
      const response = await fetch(`${ENDPOINTS.materiais}/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: item.name, quantidade: novaQtd, categoria: item.categoria }),
      });
      if (!response.ok) throw new Error('Erro');
      const atualizado = await response.json();
      onUpdate && onUpdate(atualizado);
      setQtdRetirada('');
      showToast(`Retirada de ${quantidade} realizada`, 'success');
    } catch (error) {
      showToast('Erro ao realizar a baixa', 'error');
    }
  };

  const handleExcluir = async () => {
    try {
      const response = await fetch(`${ENDPOINTS.materiais}/${item.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro');
      onDelete && onDelete(item.id);
    } catch (error) {
      showToast('Erro ao excluir o item', 'error');
    }
  };

  const isConsumo = item.categoria === "consumo";
  const isZerado = Number(item.quantidade) === 0;
  const isCritico = Number(item.quantidade) < 10;

  return (
    <View
      style={[styles.card, isCritico && styles.cardCritico]}
      {...(isCritico && { accessibilityLabel: "estoque-critico" })}
    >
      <View style={[styles.sidebar, { backgroundColor: isCritico ? COLORS.danger : (isConsumo ? COLORS.accent : COLORS.primary) }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.nome} numberOfLines={2}>{item.name}</Text>
            <View style={[styles.badge, { backgroundColor: isConsumo ? "#E6F7F1" : "#E6EEF9" }]}>
              <Text style={[styles.badgeText, { color: isConsumo ? COLORS.accent : COLORS.primary }]}>
                {isConsumo ? "🧪 Consumo" : "🔧 Permanente"}
              </Text>
            </View>
          </View>
          <View style={[styles.qtdBox, isZerado && styles.qtdBoxZerado]}>
            <Text style={[styles.qtdNum, isZerado && styles.qtdNumZerado]}>{item.quantidade}</Text>
            <Text style={[styles.qtdLabel, isZerado && styles.qtdLabelZerado]}>{isZerado ? "ZERADO" : "unid."}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Quantidade</Text>
            <TextInput
              testID="input-retirada"
              style={styles.fieldInput}
              value={qtdRetirada}
              onChangeText={setQtdRetirada}
              placeholder="10"
              placeholderTextColor={COLORS.textMuted}
            />
          </View>
          <TouchableOpacity testID="btn-baixar" style={styles.btnBaixar} onPress={handleBaixar}>
            <MaterialCommunityIcons name="arrow-down-circle" size={16} color="#fff" />
            <Text style={styles.btnText}>Baixar</Text>
          </TouchableOpacity>
          <TouchableOpacity testID="btn-excluir" style={styles.btnExcluir} onPress={handleExcluir}>
            <MaterialCommunityIcons name="trash-can" size={16} color="#fff" />
            <Text style={styles.btnText}>Excluir</Text>
          </TouchableOpacity>
        </View>

        {toast && (
          <Toast message={toast.message} type={toast.type} onHide={() => setToast(null)} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", backgroundColor: COLORS.surface, borderRadius: 12, marginHorizontal: 16, marginVertical: 6, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3, overflow: "hidden" },
  cardZerado: { borderWidth: 1.5, borderColor: COLORS.danger },
  cardCritico: { backgroundColor: "#FFF0F0", borderWidth: 1.5, borderColor: "#FFCDD2" },
  sidebar: { width: 5 },
  content: { flex: 1, padding: 14 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  headerLeft: { flex: 1, marginRight: 12 },
  nome: { fontSize: 15, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 5 },
  badge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: "600" },
  qtdBox: { alignItems: "center", backgroundColor: "#E6F7F1", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, minWidth: 60 },
  qtdBoxZerado: { backgroundColor: "#FDECEB" },
  qtdNum: { fontSize: 22, fontWeight: "800", color: COLORS.accent },
  qtdNumZerado: { color: COLORS.danger, fontSize: 18 },
  qtdLabel: { fontSize: 10, color: COLORS.accent, fontWeight: "600", textTransform: "uppercase" },
  qtdLabelZerado: { color: COLORS.danger, fontSize: 9 },
  actions: { flexDirection: "row", alignItems: "flex-end", marginTop: 12, gap: 8 },
  fieldGroup: { flex: 1 },
  fieldLabel: { fontSize: 11, fontWeight: "700", color: COLORS.textSecondary, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 },
  fieldInput: { backgroundColor: COLORS.background, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, fontSize: 14, color: COLORS.textPrimary },
  btnBaixar: { backgroundColor: COLORS.accent, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10, flexDirection: "row", alignItems: "center", gap: 4 },
  btnExcluir: { backgroundColor: COLORS.danger, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10, flexDirection: "row", alignItems: "center", gap: 4 },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  toast: { position: "absolute", bottom: 8, right: 8, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, elevation: 5 },
  toastSuccess: { backgroundColor: COLORS.accent },
  toastError: { backgroundColor: COLORS.danger },
  toastText: { color: "#fff", fontSize: 12, fontWeight: "700" },
});
