export function validarRetirada(estoque, quantidade) {
  if (quantidade <= 0) return false;
  if (quantidade > estoque) return false;
  return true;
}
