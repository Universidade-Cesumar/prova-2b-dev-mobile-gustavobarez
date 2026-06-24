import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import EmptyState from "../components/EmptyState";
import MaterialCard from "../components/MaterialCard";
import { COLORS, ENDPOINTS } from "../constants";

export default function HomeScreen({ navigation }) {
  const [materiais, setMateriais] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Busca todos os materiais do estoque via GET
  const fetchMateriais = async () => {
    try {
      const response = await fetch(ENDPOINTS.materiais);
      if (!response.ok) throw new Error("Erro na requisição");
      const data = await response.json();
      setMateriais(data);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar o estoque. Verifique a URL do MockAPI.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMateriais();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMateriais();
  };

  const handleUpdate = (atualizado) => {
    setMateriais((prev) => prev.map((m) => m.id === atualizado.id ? atualizado : m));
  };

  const handleDelete = (id) => {
    setMateriais((prev) => prev.filter((m) => m.id !== id));
  };

  const filtrados = materiais.filter(m => m.name.toLowerCase().includes(busca.toLowerCase()));
  const totalItens = filtrados.length;
  const itensZerados = materiais.filter(
    (m) => Number(m.quantidade) === 0,
  ).length;
  const itensConsumo = materiais.filter(
    (m) => m.categoria === "consumo",
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryDark}
      />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>Laboratório de Enfermagem</Text>
          <Text style={styles.headerTitle}>Almoxarifado</Text>
        </View>
        <MaterialCommunityIcons name="hospital-box" size={32} color="#fff" />
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: "#E8F5E9" }]}>
          <MaterialCommunityIcons name="package-variant" size={20} color={COLORS.primary} />
          <Text style={[styles.statNum, { color: COLORS.primary }]}>{totalItens}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: itensZerados > 0 ? "#FFEBEE" : "#FFF3E0" }]}>
          <MaterialCommunityIcons name="alert-circle" size={20} color={itensZerados > 0 ? COLORS.danger : COLORS.warning} />
          <Text style={[styles.statNum, { color: itensZerados > 0 ? COLORS.danger : COLORS.warning }]}>{itensZerados}</Text>
          <Text style={styles.statLabel}>Zerados</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#E3F2FD" }]}>
          <MaterialCommunityIcons name="flask" size={20} color="#1976D2" />
          <Text style={[styles.statNum, { color: "#1976D2" }]}>{itensConsumo}</Text>
          <Text style={styles.statLabel}>Consumo</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#F3E5F5" }]}>
          <MaterialCommunityIcons name="wrench" size={20} color="#7B1FA2" />
          <Text style={[styles.statNum, { color: "#7B1FA2" }]}>{totalItens - itensConsumo}</Text>
          <Text style={styles.statLabel}>Permanente</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color={COLORS.textMuted} />
        <TextInput
          testID="input-busca"
          style={styles.searchInput}
          placeholder="Buscar material..."
          placeholderTextColor={COLORS.textMuted}
          value={busca}
          onChangeText={setBusca}
        />
        <Text testID="total-itens" style={styles.totalText}>{totalItens}</Text>
      </View>

      <FlatList
        testID="lista-materiais"
        data={filtrados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MaterialCard item={item} onUpdate={handleUpdate} onDelete={handleDelete} />}
        contentContainerStyle={
          filtrados.length === 0 ? { flex: 1 } : { paddingBottom: 100 }
        }
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

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <MaterialCommunityIcons name="plus" size={22} color="#fff" />
        <Text style={styles.fabLabel}>Novo Material</Text>
      </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerEyebrow: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  headerTitle: { fontSize: 28, fontWeight: "900", color: "#FFFFFF" },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    gap: 2,
  },
  statNum: { fontSize: 18, fontWeight: "900" },
  statLabel: {
    fontSize: 9,
    color: COLORS.textSecondary,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  totalText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primary,
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fab: {
    position: "absolute",
    bottom: 28,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 8,
    gap: 8,
  },
  fabLabel: { color: "#fff", fontWeight: "800", fontSize: 15 },
});
