import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Modal, ScrollView,
} from 'react-native';
import { COLORS } from '../constants';

export default function CadastroModal({ visible, onClose, onSucesso }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
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
                style={styles.input}
                testID="input-nome"
                placeholder="Ex: Seringa 10ml..."
                placeholderTextColor={COLORS.textMuted}
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Quantidade *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 50"
                placeholderTextColor={COLORS.textMuted}
                value={quantidade}
                onChangeText={setQuantidade}
              />
            </View>

            <TouchableOpacity style={styles.btnCadastrar} onPress={onClose}>
              <Text style={styles.btnCadastrarText}>Cadastrar Material</Text>
            </TouchableOpacity>
            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
    maxHeight: '90%',
  },
  handle: {
    width: 40, height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12, marginBottom: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    marginBottom: 16,
  },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: COLORS.surfaceAlt,
    alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { fontSize: 14, color: COLORS.textSecondary, fontWeight: '700' },
  fieldGroup: { marginBottom: 18 },
  label: {
    fontSize: 13, fontWeight: '700',
    color: COLORS.textSecondary, marginBottom: 8,
    textTransform: 'uppercase', letterSpacing: 0.5,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1.5, borderColor: COLORS.border,
    borderRadius: 10, paddingHorizontal: 14,
    paddingVertical: 13, fontSize: 15, color: COLORS.textPrimary,
  },
  btnCadastrar: {
    backgroundColor: COLORS.primary,
    borderRadius: 12, paddingVertical: 16,
    alignItems: 'center', marginTop: 8,
  },
  btnCadastrarText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
