import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { storage } from "../utils/storage";
import { Patient } from "../types";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { LogOut, Users, Calendar, FileText, Search } from "lucide-react";

export function ReceptionDashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!storage.isAuthenticated()) {
      navigate("/reception-login");
      return;
    }
    setPatients(storage.getPatients());
  }, [navigate]);

  const handleLogout = () => {
    storage.logout();
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  // Filtrar pacientes baseado no termo de pesquisa
  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase();
    return (
      patient.nome?.toLowerCase().includes(search) ||
      patient.prontuario?.toLowerCase().includes(search) ||
      patient.sus?.toLowerCase().includes(search) ||
      patient.cpf?.toLowerCase().includes(search) ||
      patient.fone?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Dashboard Recepção
            </h1>
            <p className="text-gray-600 mt-1">Gerenciamento de Pacientes</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
            <LogOut size={20} className="mr-2" />
            Sair
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Users size={32} />
              </div>
              <div>
                <p className="text-white/80 text-sm">Total de Pacientes</p>
                <p className="text-3xl font-bold">{patients.length}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Calendar size={32} />
              </div>
              <div>
                <p className="text-white/80 text-sm">Com Agendamento</p>
                <p className="text-3xl font-bold">
                  {patients.filter(p => p.dataEntrada).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <FileText size={32} />
              </div>
              <div>
                <p className="text-white/80 text-sm">Atendimentos Hoje</p>
                <p className="text-3xl font-bold">0</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Lista de Pacientes */}
        <Card>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Pacientes Cadastrados
            </h2>
            
            {/* Campo de Pesquisa */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Pesquisar por nome, prontuário, SUS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {patients.length === 0 ? (
            <div className="text-center py-12">
              <Users size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Nenhum paciente cadastrado ainda</p>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <Search size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Nenhum paciente encontrado</p>
              <p className="text-gray-400 text-sm mt-2">Tente buscar com outros termos</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Prontuário</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">SUS</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nascimento</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Telefone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Disciplina</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Responsável</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-sm font-bold text-blue-600">
                        {patient.prontuario}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">
                        {patient.nome}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {patient.sus}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {formatDate(patient.dataNascimento)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {patient.fone}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        {patient.disciplina ? (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {patient.disciplina}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">Não atribuída</span>
                        )}
                      </td>
                       <td className="px-4 py-4 text-sm">
                        {patient.responsavel ? (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {patient.responsavel}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">Não atribuída</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <Button
                          variant="primary"
                          onClick={() => navigate(`/patient/${patient.id}`)}
                          className="text-sm px-4 py-2"
                        >
                          Gerenciar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}