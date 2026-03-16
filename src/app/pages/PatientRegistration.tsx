import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { storage } from "../utils/storage";
import { Patient } from "../types";
import { ArrowLeft, CheckCircle2, FileText } from "lucide-react";

export function PatientRegistration() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedProntuario, setGeneratedProntuario] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    sus: "",
    dataNascimento: "",
    cpf: "",
    rg: "",
    fone: "",
    nomeMae: "",
  });
  
  // Essa função é executada toda vez que o usuário digita em um input.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if(name === "cpf"){
      
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const patient = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    storage.savePatient(patient);
    
    // Buscar o prontuário gerado
    const patients = storage.getPatients();
    const savedPatient = patients[patients.length - 1];
    setGeneratedProntuario(savedPatient.prontuario);
    
    setShowSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 size={64} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Cadastro Realizado!
          </h2>
          <p className="text-gray-600 mb-4">Suas informações foram salvas com sucesso.</p>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="text-blue-600" size={24} />
              <span className="text-sm font-medium text-gray-600">Seu Prontuário</span>
            </div>
            <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {generatedProntuario}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Voltar</span>
        </button>

        <Card>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Cadastro de Paciente
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Preencha suas informações pessoais
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nome Completo"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Digite seu nome completo"
            />

            <Input
              label="Número do SUS"
              name="sus"
              value={formData.sus}
              onChange={handleChange}
              required
              placeholder="000 0000 0000 0000"
            />

            <Input
              label="Data de Nascimento"
              name="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
                placeholder="000.000.000-00"
              />

              <Input
                label="RG"
                name="rg"
                value={formData.rg}
                onChange={handleChange}
                required
                placeholder="00.000.000-0"
              />
            </div>

            <Input
              label="Telefone"
              name="fone"
              type="tel"
              value={formData.fone}
              onChange={handleChange}
              required
              placeholder="(00) 00000-0000"
            />

            <Input
              label="Nome da Mãe"
              name="nomeMae"
              value={formData.nomeMae}
              onChange={handleChange}
              required
              placeholder="Digite o nome completo da mãe"
            />

            <Button type="submit" fullWidth variant="primary">
              Cadastrar
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}