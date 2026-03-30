import { describe, it, expect } from 'vitest';
import { NOME_REGEX, patientSchema } from '../../types/schema';

describe("Cenário: Partição de equivalência - Usuário insere nome completo corretamente ", () => {

    it('Dado que o nome completo é válido, então o resultado deve ser verdadeiro', () => {
        expect(NOME_REGEX.test("Ana Silva")).toBe(true);
    })

    it('Usuário insere nome completo errado com números e letras', () => {
        expect(NOME_REGEX.test("Ana123")).toBe(false);
    })
})

describe("Cenário: Validação de Limites - Campo Nome", () => {
  const nomeSchema = patientSchema.shape.nome;

  it("deve rejeitar nomes com menos de 3 caracteres (Valor Limite Inferior - 1)", () => {
    const resultado = nomeSchema.safeParse("Ab");
    expect(resultado.success).toBe(false);
    
    if (!resultado.success) {
      expect(resultado.error.issues[0].message).toBe("O nome deve ter no mínimo 3 caracteres");
    }
  });

  it("deve aceitar nomes com exatamente 3 caracteres (Valor Limite)", () => {
    const resultado = nomeSchema.safeParse("Ana");
    expect(resultado.success).toBe(true);
  });

   it("deve aceitar nomes com exatamente 4 caracteres (Acima do Limite Inferior)", () => {
    const resultado = nomeSchema.safeParse("Anaa");
    expect(resultado.success).toBe(true);
  });


  it("deve aceitar nomes com exatamente 99 caracteres (Valor Limite Superior - 1)", () => {
    const nomeLongo = "a".repeat(99);
    const resultado = nomeSchema.safeParse(nomeLongo);
    expect(resultado.success).toBe(true);
  });


  it("deve aceitar nomes com exatamente 100 caracteres (Valor Limite Superior)", () => {
    const nomeLongo = "a".repeat(100);
    const resultado = nomeSchema.safeParse(nomeLongo);
    expect(resultado.success).toBe(true);
  });

  it("deve rejeitar nomes com 101 caracteres (Valor Limite Superior + 1)", () => {
    const nomeMuitoLongo = "a".repeat(101);
    const resultado = nomeSchema.safeParse(nomeMuitoLongo);
    expect(resultado.success).toBe(false);
  });
});