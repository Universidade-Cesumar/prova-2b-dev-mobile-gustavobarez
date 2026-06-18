const { validarRetirada } = require('../src/utils/validacoes');

describe('validarRetirada', () => {
  test('permite retirada menor que estoque', () => {
    expect(validarRetirada(10, 5)).toBe(true);
  });

  test('permite retirada igual ao estoque', () => {
    expect(validarRetirada(10, 10)).toBe(true);
  });

  test('bloqueia retirada maior que estoque', () => {
    expect(validarRetirada(5, 10)).toBe(false);
  });

  test('bloqueia quantidade negativa', () => {
    expect(validarRetirada(10, -1)).toBe(false);
  });

  test('bloqueia quantidade zero', () => {
    expect(validarRetirada(10, 0)).toBe(false);
  });
});
