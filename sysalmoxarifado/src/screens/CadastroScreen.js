import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, ActivityIndicator, Alert,
  SafeAreaView, StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, CATEGORIAS, ENDPOINTS } from "../constants";

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState("consumo");
  const [dataValidade, setDataValidade] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastrar = async () => {
    if (!nome.trim()) { Alert.alert("Campo obrigatório", "Informe o nome do material."); return; }
    if (!quantidade || isNaN(Number(quantidade)) || Number(quantidade) < 0) {
      Alert.alert("Campo inválido", "Informe uma quantidade válida."); return;
    }
    setLoading(true);
    try {
      const response = await fetch(ENDPOINTS.materiais, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome.trim(),
          quantidade: Number(quantidade),
          categoria,
          dataValidade: dataValidade.trim() || "",
        }),
      });
      if (!response.ok) throw new Error("Erro ao cadastrar");
      Alert.alert("Sucesso", "Material cadastrado!", [{ text: "OK", onPress: () => navigation.goBack() }]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Material</Text>
      </View>
      <ScrollView style={styles.form} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Nome do Material *</Text>
        <TextInput
          testID="input-nome"
          style={styles.input}
          placeholder="Ex: Seringa 10ml..."
          placeholderTextColor={COLORS.textMuted}
          value={nome}
          onChangeText={setNome}
        />
        <Text style={styles.label}>Quantidade *</Text>
        <TextInput
          testID="input-quantidade"
          style={styles.input}
          placeholder="Ex: 50"
          placeholderTextColor={COLORS.textMuted}
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoriaRow}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity
              key={cat.value}
              style={[styles.catOption, categoria === cat.value && styles.catSelected]}
              onPress={() => setCategoria(cat.value)}
            >
              <MaterialCommunityIcons
                name={cat.value === "consumo" ? "flask" : "wrench"}
                size={18}
                color={categoria === cat.value ? COLORS.primary : COLORS.textSecondary}
              />
              <Text style={[styles.catText, categoria === cat.value && styles.catTextSelected]}>
                {cat.value === "consumo" ? "Consumo" : "Permanente"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Data de Validade</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 2026-12-31"
          placeholderTextColor={COLORS.textMuted}
          value={dataValidade}
          onChangeText={setDataValidade}
        />
        <TouchableOpacity
          testID="btn-cadastrar"
          style={[styles.btnCadastrar, loading && { opacity: 0.6 }]}
          onPress={handleCadastrar}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : (
            <View style={styles.btnContent}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#fff" />
              <Text style={styles.btnText}>Cadastrar Material</Text>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#fff" },
  form: { padding: 20 },
  label: {
    fontSize: 13, fontWeight: "700", color: COLORS.textSecondary,
    marginBottom: 8, marginTop: 16, textTransform: "uppercase", letterSpacing: 0.5,
  },
  input: {
    backgroundColor: COLORS.surface, borderWidth: 1.5,
    borderColor: COLORS.border, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 15, color: COLORS.textPrimary,
  },
  categoriaRow: { flexDirection: "row", gap: 10 },
  catOption: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 12, borderRadius: 10, gap: 6,
    borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.surface,
  },
  catSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.surfaceAlt },
  catText: { fontSize: 13, fontWeight: "600", color: COLORS.textSecondary },
  catTextSelected: { color: COLORS.primary },
  btnCadastrar: {
    backgroundColor: COLORS.primary, borderRadius: 12,
    paddingVertical: 16, alignItems: "center", marginTop: 24, elevation: 4,
  },
  btnContent: { flexDirection: "row", alignItems: "center", gap: 8 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
