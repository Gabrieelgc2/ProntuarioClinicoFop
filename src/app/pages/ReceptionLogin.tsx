import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { storage } from "../utils/storage";
import { ArrowLeft, Lock } from "lucide-react";

export function ReceptionLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "admin123") {
      storage.setAuth(true);
      navigate("/reception-dashboard");
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Voltar</span>
        </button>

        <Card>
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-100 rounded-full">
              <Lock size={40} className="text-indigo-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Acesso à Recepção
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Digite a senha para continuar
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
              placeholder="Digite a senha"
              error={error}
            />

            <Button type="submit" fullWidth variant="primary">
              Entrar
            </Button>
          </form>

        </Card>
      </div>
    </div>
  );
}
