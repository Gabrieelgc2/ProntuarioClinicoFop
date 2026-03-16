import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { UserRound, Building2 } from "lucide-react";
import universityImage from "../../assets/Fop.png";

export function Home() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url('${universityImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay escuro para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
           FOP - Prontuário Clínico
          </h1>
      
        </div>

        {/* Botões de Escolha */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/patient-registration")}
            className="w-full bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-6 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <UserRound size={32} />
              <span className="text-2xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Paciente
              </span>
            </div>
            <p className="text-white/80 text-sm">Cadastre suas informações</p>
          </button>

          <button
            onClick={() => navigate("/reception-login")}
            className="w-full bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-6 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Building2 size={32} />
              <span className="text-2xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Recepção
              </span>
            </div>
            <p className="text-white/80 text-sm">Acesso administrativo</p>
          </button>
        </div>
      </div>
    </div>
  );
}