import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { storage } from "../utils/storage";
import { Patient, Disciplina } from "../types";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ArrowLeft, Save, User, Calendar, Phone, FileText } from "lucide-react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

const disciplinas: Disciplina[] = [
  "Odontopediatria",
  "Clínica Integral I",
  "Clínica Integral II",
  "Clínica Integral III",
];

export function PatientDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [disciplina, setDisciplina] = useState<string>("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!storage.isAuthenticated()) {
      navigate("/reception-login");
      return;
    }

    if (id) {
      const foundPatient = storage.getPatientById(id);
      if (foundPatient) {
        setPatient(foundPatient);
        setDisciplina(foundPatient.disciplina || "");
        setDataEntrada(foundPatient.dataEntrada || "");
        setDataSaida(foundPatient.dataSaida || "");
        setResponsavel(foundPatient.responsavel || "");
      }
    }
  }, [id, navigate]);

  const handleSave = () => {
    if (id) {
      console.log("Salvando dados:", { disciplina, dataEntrada, dataSaida, responsavel });
      
      storage.updatePatient(id, {
        disciplina,
        dataEntrada,
        dataSaida,
        responsavel,
      });
      
      // Atualizar o estado local do paciente buscando do storage
      const updatedPatient = storage.getPatientById(id);
      console.log("Paciente atualizado:", updatedPatient);
      
      if (updatedPatient) {
        setPatient(updatedPatient);
      }
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  if (!patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <Card>
          <p className="text-gray-600">Paciente não encontrado</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/reception-dashboard")}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Voltar ao Dashboard</span>
        </button>

        {saved && (
          <div className="mb-4 p-4 bg-emerald-100 border border-emerald-300 rounded-lg text-emerald-800 text-center font-medium">
            ✓ Informações salvas com sucesso!
          </div>
        )}

        {/* Informações do Paciente */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <User size={32} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {patient.nome}
              </h1>
              <p className="text-gray-600">Prontuário: <span className="font-semibold text-blue-600">{patient.prontuario}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Número SUS</p>
              <p className="font-semibold text-gray-800">{patient.sus}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Data de Nascimento</p>
              <p className="font-semibold text-gray-800">{formatDate(patient.dataNascimento)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">CPF</p>
              <p className="font-semibold text-gray-800">{patient.cpf}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">RG</p>
              <p className="font-semibold text-gray-800">{patient.rg}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Telefone</p>
              <p className="font-semibold text-gray-800">{patient.fone}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Nome da Mãe</p>
              <p className="font-semibold text-gray-800">{patient.nomeMae}</p>
            </div>
          </div>

          {/* Informações Clínicas */}
          {(patient.disciplina || patient.dataEntrada || patient.dataSaida || patient.responsavel) && (
            <>
              <div className="mt-6 mb-3">
                <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Informações Clínicas
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patient.disciplina && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Disciplina</p>
                    <p className="font-semibold text-blue-700">{patient.disciplina}</p>
                  </div>
                )}
                {patient.dataEntrada && (
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="text-sm text-gray-600 mb-1">Data de Entrada</p>
                    <p className="font-semibold text-emerald-700">{formatDate(patient.dataEntrada)}</p>
                  </div>
                )}
                {patient.dataSaida && (
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-600 mb-1">Data de Saída</p>
                    <p className="font-semibold text-orange-700">{formatDate(patient.dataSaida)}</p>
                  </div>
                )}
                {patient.responsavel && (
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Responsável</p>
                    <p className="font-semibold text-purple-700">{patient.responsavel}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </Card>

        {/* Atribuições Clínicas */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText size={28} className="text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Atribuições Clínicas
            </h2>
          </div>

          <div className="space-y-6">
            {/* Toggle de Disciplinas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Disciplina
              </label>
              <ToggleGroup.Root
                type="single"
                value={disciplina}
                onValueChange={(value) => value && setDisciplina(value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {disciplinas.map((disc) => (
                  <ToggleGroup.Item
                    key={disc}
                    value={disc}
                    className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                      disciplina === disc
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                        : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {disc}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Data de Entrada"
                type="date"
                value={dataEntrada}
                onChange={(e) => setDataEntrada(e.target.value)}
              />
              <Input
                label="Data de Saída"
                type="date"
                value={dataSaida}
                onChange={(e) => setDataSaida(e.target.value)}
              />
            </div>

            {/* Responsável */}
            <Input
              label="Responsável pelo Paciente"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              placeholder="Nome do profissional responsável"
            />

            {/* Botão Salvar */}
            <Button
              onClick={handleSave}
              fullWidth
              variant="primary"
              className="flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Salvar Informações
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}