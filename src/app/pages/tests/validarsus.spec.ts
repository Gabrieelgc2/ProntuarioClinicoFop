import { validarSUS } from "../sus/validar-sus";
import { describe, it, expect } from 'vitest';

describe("Algoritmo de Validação CNS (SUS)", () => {
  
  describe("CNS Definitivo (Inicia com 1 ou 2)", () => {
    it("deve aceitar um CNS definitivo válido", () => {
      expect(validarSUS("208112105140006")).toBe(true); 
    });

    it("deve rejeitar se o dígito verificador calculado for diferente", () => {
      expect(validarSUS("208112105140005")).toBe(false);
    });
  });

  describe("CNS Provisório (Inicia com 7, 8 ou 9)", () => {
    it("deve aceitar um CNS provisório válido", () => {

      expect(validarSUS("748 1004 5923 0001")).toBe(true);
    });

    it("deve rejeitar CNS provisório com soma inválida", () => {
      expect(validarSUS("700000000000001")).toBe(false);
    });
  });

  describe("Validações de Formato", () => {
    it("deve rejeitar se tiver menos de 15 dígitos", () => {
      expect(validarSUS("12345")).toBe(false);
    });

    it("deve rejeitar se o primeiro dígito for inválido (ex: 3 ou 4)", () => {
      expect(validarSUS("300000000000001")).toBe(false);
    });

    it("deve validar mesmo que o usuário envie com espaços ou pontos", () => {
      expect(validarSUS("208 1121 05140 006")).toBe(true);
    });

    it("deve validar CNS válido com DV = 11", () => {
        expect(validarSUS("123456789010000")).toBe(true);
    })

    it("deve validar CNS válido com DV = 10", () => {
        expect(validarSUS("123456789100018")).toBe(true);
    })
  });
});