// BDD: Descrição do Comportamento
describe('Funcionalidade: Validação de CPF', () => {
  
  describe('Cenário: Usuário insere um CPF com formato válido', () => {
    it('Dado que o CPF "529.982.247-25" é inserido, Então o resultado deve ser VERDADEIRO', () => {
      const resultado = validarCPF("529.982.247-25");
      expect(resultado).toBe(true);
    });
  });

  describe('Cenário: Usuário insere um CPF com dígitos repetidos', () => {
    it('Dado que o CPF "111.111.111-11" é inserido, Então o sistema deve REJEITAR como falso', () => {
      const resultado = validarCPF("111.111.111-11");
      expect(resultado).toBe(false);
    });
  });
});