import validarCPF from "../cpf/validar-cpf";
import { describe, it, expect } from 'vitest';

describe('Cenário: Partição de equivalência', () => {


  it('Dado que o CPF "111.111.111-11" é inserido, Então o sistema deve REJEITAR como falso', () => {
    const resultado = validarCPF("111.111.111-11");
    expect(resultado).toBe(false);
  });
});

describe('Cenário: Análise de Valor Limite', () => {
  it('Dado que o CPF "111.111.111-1" que tem 10 dígitos é inserido, Então o sistema deve REJEITAR como falso (Valor Limite - 1)', () => {
    const resultado = validarCPF("111.111.111-1");
    expect(resultado).toBe(false);
  });

   it('Dado que o CPF "111.111.111-111" que tem 12 dígitos é inserido, Então o sistema deve REJEITAR como verdadeiro (Valor Limite + 1)', () => {
    const resultado = validarCPF("111.111.111-111");
    expect(resultado).toBe(false);
  });
});