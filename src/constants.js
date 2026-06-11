// ATENÇÃO: Substitua pela URL do seu MockAPI!
export const MOCKAPI_BASE_URL = 'https://SEU_ID_AQUI.mockapi.io';

export const ENDPOINTS = {
  materiais: `${MOCKAPI_BASE_URL}/materiais`,
};

export const CATEGORIAS = [
  { label: 'Material de Consumo (Descartável)', value: 'consumo' },
  { label: 'Material Permanente (Equipamento)', value: 'permanente' },
];

export const COLORS = {
  primary: '#0F4C81',
  primaryLight: '#1A6DBF',
  primaryDark: '#0A3560',
  accent: '#00A86B',
  accentLight: '#00C47D',
  danger: '#D93025',
  warning: '#F5A623',
  background: '#F0F4F8',
  surface: '#FFFFFF',
  surfaceAlt: '#E8EEF5',
  textPrimary: '#1A2B3C',
  textSecondary: '#5A7184',
  textMuted: '#8FA5BA',
  border: '#C8D8E8',
  divider: '#DDE8F0',
};
