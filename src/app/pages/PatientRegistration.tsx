import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2, FileText } from "lucide-react";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { storage } from "../utils/storage";
import { patientSchema, PatientFormFields } from "../types/schema.ts";

export function PatientRegistration() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedProntuario, setGeneratedProntuario] = useState("");
  const data = new Date().toISOString().split('T')[0];
  console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm <PatientFormFields> ({
    resolver: zodResolver(patientSchema),
    // 'onBlur' valida quando o usuário sai do campo, 
    // 'onChange' valida enquanto digita. Escolha o que preferir:
    mode: "onBlur", 
  });

  const onSubmit = async (data: PatientFormFields) => {
    try {
      // Simulação de carregamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const patient = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      };

      storage.savePatient(patient);

      // Recupera o prontuário gerado pela lógica do seu storage
      const patients = storage.getPatients();
      const savedPatient = patients[patients.length - 1];
      
      setGeneratedProntuario(savedPatient.prontuario);
      setShowSuccess(true);

      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 size={64} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastro Realizado!</h2>
          <p className="text-gray-600 mb-4">As informações foram salvas com sucesso.</p>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="text-blue-600" size={24} />
              <span className="text-sm font-medium text-gray-600">Seu Prontuário</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{generatedProntuario}</p>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Cadastro de Paciente
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Preencha as informações pessoais do paciente
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1">
              <Input
                type="text"
                label="Nome Completo"
                placeholder="Digite o nome completo"
                {...register("nome")}
                error={errors.nome?.message}
              />
            </div>

            <div className="space-y-1">
              <Input
                label="Número do SUS"
                placeholder="000 0000 0000 0000"
                {...register("sus")}
                error={errors.sus?.message}
              />
            </div>

            <div className="space-y-1">
              <Input
                label="Data de Nascimento"
                type="date"
                min="1901-01-01"
                max={data}
                {...register("dataNascimento")}
                error={errors.dataNascimento?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Input
                  label="CPF"
                  placeholder="000.000.000-00"
                  {...register("cpf")}
                  error={errors.cpf?.message}
                />
              </div>

              <div className="space-y-1">
                <Input
                  label="RG (opcional)"
                  placeholder="00.000.000-0"
                  {...register("rg")}
                  error={errors.rg?.message}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Input
                label="Telefone"
                type="tel"
                placeholder="(00) 00000-0000"
                {...register("fone")}
                error={errors.fone?.message}
              />
            </div>

            <div className="space-y-1">
              <Input
                label="Nome da Mãe"
                placeholder="Digite o nome completo da mãe"
                {...register("nomeMae")}
                error={errors.nomeMae?.message}
              />
            </div>

            <Button type="submit" fullWidth variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Cadastrar"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}