/**
 * Valida o Cartão Nacional de Saúde (CNS) seguindo as regras oficiais:
 * 1. Números iniciados em 1 ou 2 (Definitivos)
 * 2. Números iniciados em 5, 7, 8 ou 9 (Provisórios)
 */
export function validarSUS(cns: string): boolean {
  const cnsLimpo = cns.replace(/\D/g, "");

  if (cnsLimpo.length !== 15) return false;

  const primeiroDigito = cnsLimpo[0];

  // --- Rotina para números que iniciam com 1 ou 2 ---
  if (primeiroDigito === "1" || primeiroDigito === "2") {
    const pis = cnsLimpo.substring(0, 11);
    let soma = 0;

    for (let i = 0; i < 11; i++) {
      soma += parseInt(pis[i]) * (15 - i);
    }

    let resto = soma % 11;
    let dv = 11 - resto;

    if (dv === 11) dv = 0;

    let resultado = "";
    if (dv === 10) {
      soma += 2;
      resto = soma % 11;
      dv = 11 - resto;
      resultado = pis + "001" + Math.floor(dv);
    } else {
      resultado = pis + "000" + Math.floor(dv);
    }

    if(cnsLimpo!= resultado){
        return false;
    }
    else {
        return true;
    }
  }

  // --- Rotina para números que iniciam com 5, 7, 8 ou 9 ---
  if (["5", "7", "8", "9"].includes(primeiroDigito)) {
    let soma = 0;
    for (let i = 0; i < 15; i++) {
      soma += parseInt(cnsLimpo[i]) * (15 - i);
    }

    let resto = soma % 11;

    if(resto!= 0){
        return false;   
    }
    else {
        return true;
    }
  }

  return false;
}