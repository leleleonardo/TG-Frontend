import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Spinner } from "@nextui-org/react";

interface Agendamento {
  id: number;
  data: string;
  paciente: {
    nome: string;
  };
  profissional: {
    nome: string;
  };
  especialidade: string;
  status: string;
}

export default function Agenda() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock dos dados
  useEffect(() => {
    const mockData: Agendamento[] = [
      {
        id: 1,
        data: "2025-04-13T10:00:00",
        paciente: { nome: "Maria Silva" },
        profissional: { nome: "Dr. João Souza" },
        especialidade: "Cardiologia",
        status: "Confirmado",
      },
      {
        id: 2,
        data: "2025-04-13T14:30:00",
        paciente: { nome: "Carlos Oliveira" },
        profissional: { nome: "Dra. Ana Lima" },
        especialidade: "Dermatologia",
        status: "Pendente",
      },
    ];

    setTimeout(() => {
      setAgendamentos(mockData);
      setLoading(false);
    }, 1000); // Simula carregamento
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4 text-[#76884E]">Agenda de Consultas</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner color="primary" />
        </div>
      ) : agendamentos.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agendamentos.map((item) => (
            <Card key={item.id} className="bg-white shadow-md">
              <CardHeader className="font-medium text-md text-[#76884E]">
                {item.paciente.nome}
              </CardHeader>
              <CardBody className="text-sm text-zinc-700 flex flex-col gap-1">
                <p><strong>Profissional:</strong> {item.profissional.nome}</p>
                <p><strong>Especialidade:</strong> {item.especialidade}</p>
                <p><strong>Data:</strong> {new Date(item.data).toLocaleString()}</p>
                <p><strong>Status:</strong> {item.status}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
