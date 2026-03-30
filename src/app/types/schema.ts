import { z } from "zod";
import validarCPF from "../pages/cpf/validar-cpf";
import { validarSUS } from "../pages/sus/validar-sus";
export const NOME_REGEX = /^[A-Za-zÀ-ÿ\s]+$/;
export const patientSchema = z.object({
  nome: // A-Z      -> Letras maiúsculas simples
    // a-z      -> Letras minúsculas simples
    // À-ÿ      -> Letras acentuadas e Ç (maiúsculas e minúsculas)
    // \s       -> Espaços entre os nomes
  z.string().min(3, "O nome deve ter no mínimo 3 caracteres").
      max(100, "O nome deve ter no máximo 100 caracteres")
      .regex(NOME_REGEX, "Apenas letras, acentos e espaços são permitidos"),
  sus: z.string()
    .min(15, "O Cartão SUS possui 15 dígitos")
    .refine((val) => validarSUS(val), "SUS inválido"),
  dataNascimento: z.string()
    .min(1, "Data é obrigatória")
    .refine((val) => {
      const data = new Date(val);
      const min = new Date("1901-01-01");
      const max = new Date();
      return data >= min && data <= max;
    }),
  cpf: z.string()
    .transform(val => val.replace(/\D/g, '')) // Limpa antes de validar
    .refine((val) => val.length === 11, "O CPF deve ter 11 dígitos")
    .refine((val) => validarCPF(val), "CPF inválido"),
  rg: z.string().min(5, "RG inválido"),
  fone: z.string()
    // CT06: (Vazio) -> Rejeitar / Erro
    .min(1, "O campo de telefone é obrigatório")

    // CT05: (11) ABCDE-FFFF -> Rejeitar / Erro
    .refine((val) => !/[a-zA-Z]/.test(val), "Telefone não pode conter letras")
    .transform(val => val.replace(/\D/g, ''))
    .superRefine((val, ctx) => {

      if (val[2] === "9") {
        // Regra de Celular (11 dígitos)
        if (val.length < 11) {
          ctx.addIssue({
            code: "custom",
            message: "Celular muito curto (mínimo 11 dígitos)",
            // 0,1,2,3,4,5,6,7,8,9,10
          });
        }
        else if (val.length > 11) {
          ctx.addIssue({
            code: "custom",
            message: "Celular muito longo (máximo 11 dígitos)",
            // 12,13,14,15...
          });
        }
      } else {
        // Regra de Fixo (10 dígitos)
        if (val.length !== 10) {
          ctx.addIssue({
            code: "custom",
            message: "Telefone fixo deve ter 10 dígitos",
          });
        }
      }
    }),
  nomeMae: z.string().min(3, "Nome da mãe é obrigatório"),
});

export type PatientFormFields = z.infer<typeof patientSchema>;


/*
Se a data de nascimento for menor que 18, 
então coloque o nome do pai ou mãe.
*/