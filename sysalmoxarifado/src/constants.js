import { MOCKAPI_BASE_URL } from "@env";

export const ENDPOINTS = {
  materiais: `${MOCKAPI_BASE_URL}/materiais`,
};

export const CATEGORIAS = [
  { label: "Material de Consumo (Descartável)", value: "consumo" },
  { label: "Material Permanente (Equipamento)", value: "permanente" },
];

export const COLORS = {
  primary: "#32CD32",
  primaryLight: "#7CFC00",
  primaryDark: "#228B22",
  accent: "#2E8B57",
  accentLight: "#3CB371",
  danger: "#DC3545",
  warning: "#FFC107",
  background: "#F5FFF5",
  surface: "#FFFFFF",
  surfaceAlt: "#E8F5E9",
  textPrimary: "#1B2E1B",
  textSecondary: "#4A6B4A",
  textMuted: "#8AAB8A",
  border: "#C8E6C9",
  divider: "#DCE8DC",
};
