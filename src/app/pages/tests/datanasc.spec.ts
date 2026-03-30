import { patientSchema } from "../../types/schema";
import { describe, it, expect } from 'vitest';

describe("Partição de equivalênia: Data de nascimento", () => {
  const schemaData = patientSchema.shape.dataNascimento;

  it("deve aceitar uma data do passado (ex: 1995)", () => {
    const resultado = schemaData.safeParse("1995/05/20");
    expect(resultado.success).toBe(true);
  });

  it("deve rejeitar uma data limite antes de 1901", () => {
    const resultado = schemaData.safeParse("1900/01/01")
    expect(resultado.success).toBe(false);
  })

  it("deve rejeitar uma dia inexistente", () => {
    const resultado = schemaData.safeParse("1900-01-32");
    expect(resultado.success).toBe(false);
  });

});