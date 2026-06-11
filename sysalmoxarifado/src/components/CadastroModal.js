import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Modal, ScrollView,
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { COLORS, CATEGORIAS, ENDPOINTS } from '../constants';

export default function CadastroModal({ visible, onClose, onSucesso }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState('consumo');
  const [dataValidade, setDataValidade] = useState('');
  const [loading, setLoading] = useState(false);

  const limpar = () => { setNome(''); setQuantidade(''); setCategoria('consumo'); setDataValidade(''); };

  const handleCadastrar = async () => {
    if (!nome.trim()) { Alert.alert('Campo obrigatório', 'Informe o nome do material.'); return; }
    if (!quantidade || isNaN(Number(quantidade)) || Number(quantidade) < 0) {
      Alert.alert('Campo inválido', 'Informe uma quantidade válida.'); return;
    }
    setLoading(true);
    try {
      const response = await fetch(ENDPOINTS.materiais, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nome.trim(),
          quantidade: Number(quantidade),
          categoria,
          dataValidade: dataValidade.trim() || '',
        }),
      });
      if (!response.ok) throw new Error('Erro ao cadastrar');
      const criado = await response.json();
      onSucesso(criado);
      limpar();
      onClose();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar. Verifique a URL do MockAPI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.overlay} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>Novo Material</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Nome do Material *</Text>
              <TextInput
                testID="input-nome"
                style={styles.input}
                placeholder="Ex: Seringa 10ml..."
                placeholderTextColor={COLORS.textMuted}
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.fieldGroup}>
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
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Categoria</Text>
              <View style={styles.categoriaRow}>
                {CATEGORIAS.map((cat) => (
                  <TouchableOpacity
                    key={cat.value}
                    style={[styles.catOption, categoria === cat.value && styles.catOptionSelected]}
                    onPress={() => setCategoria(cat.value)}
                  >
                    <Text style={[styles.catText, categoria === cat.value && styles.catTextSelected]}>
                      {cat.value === 'consumo' ? '🧪 Consumo' : '🔧 Permanente'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Data de Validade</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 2026-12-31"
                placeholderTextColor={COLORS.textMuted}
                value={dataValidade}
                onChangeText={setDataValidade}
              />
            </View>
            <TouchableOpacity
              testID="btn-cadastrar"
              style={[styles.btnCadastrar, loading && styles.btnDisabled]}
              onPress={handleCadastrar}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.btnCadastrarText}>✔  Cadastrar Material</Text>
              }
            </TouchableOpacity>
            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 20, paddingBottom: 32, maxHeight: '90%',
  },
  handle: {
    width: 40, height: 4, backgroundColor: COLORS.border,
    borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 4,
  },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 16, borderBottomWidth: 1,
    borderBottomColor: COLORS.divider, marginBottom: 16,
  },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: COLORS.surfaceAlt, alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { fontSize: 14, color: COLORS.textSecondary, fontWeight: '700' },
  fieldGroup: { marginBottom: 18 },
  label: {
    fontSize: 13, fontWeight: '700', color: COLORS.textSecondary,
    marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  input: {
    backgroundColor: COLORS.background, borderWidth: 1.5,
    borderColor: COLORS.border, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 15, color: COLORS.textPrimary,
  },
  categoriaRow: { flexDirection: 'row', gap: 10 },
  catOption: {
    flex: 1, paddingVertical: 12, borderRadius: 10,
    borderWidth: 1.5, borderColor: COLORS.border,
    backgroundColor: COLORS.background, alignItems: 'center',
  },
  catOptionSelected: { borderColor: COLORS.primary, backgroundColor: '#E6EEF9' },
  catText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  catTextSelected: { color: COLORS.primary },
  btnCadastrar: {
    backgroundColor: COLORS.primary, borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', marginTop: 8, elevation: 4,
  },
  btnDisabled: { opacity: 0.6 },
  btnCadastrarText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
