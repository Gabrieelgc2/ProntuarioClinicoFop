function validarCPF(cpf: string): boolean {
  // 1. Limpeza e Verificação Básica
  const cpfLimpo = cpf.replace(/\D/g, ''); // Remove tudo que não é número  

  if (cpfLimpo.length !== 11) return false;

  // 2. Bloqueio de números repetidos (Ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

  // 3. Cálculo dos Dígitos Verificadores
  const calcularDigito = (corpoCpf: string, pesoInicial: number): number => {
    let soma = 0;
    for (let i = 0; i < corpoCpf.length; i++) {
      soma += parseInt(corpoCpf[i]) * (pesoInicial - i);
    }

    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  // Validar o primeiro dígito (usa os 9 primeiros números com peso começando em 10)
  const digito1 = calcularDigito(cpfLimpo.substring(0, 9), 10);
  if (digito1 !== parseInt(cpfLimpo[9])) return false;

  // Validar o segundo dígito (usa os 10 primeiros números com peso começando em 11)
  const digito2 = calcularDigito(cpfLimpo.substring(0, 10), 11);
  if (digito2 !== parseInt(cpfLimpo[10])) return false;

  return true;
}

// Exemplo de uso:
console.log(validarCPF("529.982.247-25")); // true
console.log(validarCPF("11111111111"));    // false