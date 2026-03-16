export interface Patient {
  id: string;
  prontuario: string;
  nome: string;
  sus: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  fone: string;
  nomeMae: string;
  disciplina?: string;
  dataEntrada?: string;
  dataSaida?: string;
  responsavel?: string;
  createdAt: string;
}

export type Disciplina = 
  | "Odontopediatria" 
  | "Clínica Integral I" 
  | "Clínica Integral II" 
  | "Clínica Integral III";