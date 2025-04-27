// src/components/CardConsulta.tsx
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Snackbar, Chip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "lucide-react"; // Ícones modernos
import dayjs from "dayjs";

import api from "../../services/api";
import Prontuario from "../Prontuario";
import FormProntuario from "../Prontuario/FormProntuario";

interface CardConsultaProps {
  id_consulta: string;
  id_especialidade: string;
  id_medico: string;
  id_paciente: string;
  status: string;
  data: string;
  url_consulta: string;
}

export default function CardConsulta({ id_consulta, id_especialidade, id_medico, id_paciente, status, data, url_consulta }: CardConsultaProps) {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState<any>({});
  const [medico, setMedico] = useState<any>({});
  const [especialidade, setEspecialidade] = useState<any>({});
  const [typeUser, setTypeUser] = useState<string>("");
  const [limitTime, setLimitTime] = useState<string>("");
  const [agora, setAgora] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");

  const consultaModal = useDisclosure();
  const prontuarioModal = useDisclosure();
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [pacienteRes, medicoRes, especialidadeRes, typeUserRes] = await Promise.all([
        api.get(`/paciente/getPaciente/${id_paciente}`),
        api.get(`/medico/getDoctor/${id_medico}`),
        api.get(`/medico/getSpecialtie/${id_especialidade}`),
        api.get("/usuario/getType")
      ]);
      setPaciente(pacienteRes.data);
      setMedico(medicoRes.data);
      setEspecialidade(especialidadeRes.data);
      setTypeUser(typeUserRes.data.tipo);
      setFormattedDate(dayjs(data).format("DD/MM/YYYY HH:mm:ss"));
      setLimitTime(dayjs(data).subtract(1, "hour").format("DD/MM/YYYY HH:mm:ss"));
      setAgora(dayjs().format("DD/MM/YYYY HH:mm:ss"));
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  async function cancelarConsulta() {
    if (window.confirm("Deseja realmente cancelar a consulta?")) {
      await api.put(`/consulta/cancelar/${id_consulta}`);
      showSnackbar("Consulta cancelada com sucesso!");
      setTimeout(() => window.location.reload(), 3000);
    }
  }

  async function removerConsulta() {
    if (window.confirm("Deseja realmente excluir?")) {
      try {
        await api.delete(`/admin/consultas/deletar/${id_consulta}`);
        showSnackbar("Consulta excluída com sucesso!");
        setTimeout(() => window.location.reload(), 3000);
      } catch (err) {
        console.error("Erro ao excluir:", err);
      }
    }
  }

  function showSnackbar(message: string) {
    setSnackbarMsg(message);
    setSnackbarOpen(true);
  }

  async function done() {
    await api.put(`/consulta/done/${id_consulta}`);
  }

  return (
    <>
      <Card className="max-w-xs m-4 shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <h3 className="text-lg font-bold">Data</h3>
          <p>{status !== "Cancelado" ? formattedDate : "Cancelada"}</p>
        </CardHeader>

        <CardBody className="space-y-2">
          <Chip color="default" size="sm" variant="flat">
            Status: {status}
          </Chip>
          {typeUser === "Medico" && <p><strong>Paciente:</strong> {paciente.nome}</p>}
          {typeUser === "Paciente" && <p><strong>Médico:</strong> {medico.nome}</p>}
          <p><strong>Especialidade:</strong> {especialidade.nome}</p>
        </CardBody>

        <CardFooter className="flex justify-center gap-2">
          {(typeUser === "Medico" || typeUser === "Admin") && status === "Livre" && (
            <Button size="sm" color="secondary" onClick={() => navigate(`/consulta/editar/${id_consulta}`)}>
              <Edit size={16} />
            </Button>
          )}

          {typeUser === "Admin" && (
            <Button size="sm" color="danger" onClick={removerConsulta}>
              <Delete size={16} />
            </Button>
          )}

          {typeUser === "Medico" && (
            <Button size="sm" onClick={prontuarioModal.onOpen}>
              Prontuário
            </Button>
          )}

          {(status === "Agendado" && agora <= limitTime) && (
            <Button size="sm" color="warning" onClick={cancelarConsulta}>
              Cancelar
            </Button>
          )}

          {(status === "Agendado" &&
            agora >= dayjs(data).subtract(10, "minute").format("DD/MM/YYYY HH:mm:ss") &&
            agora <= dayjs(data).add(1, "hour").format("DD/MM/YYYY HH:mm:ss")
          ) && (
            <Button size="sm" color="primary" onClick={() => {
              consultaModal.onOpen();
              if (typeUser === "Paciente") {
                setTimeout(done, 60000);
              }
            }}>
              Acessar Consulta
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Modal Consulta */}
      <Modal isOpen={consultaModal.isOpen} onClose={consultaModal.onClose} size="5xl">
        <ModalContent>
          <ModalHeader className="flex justify-end">
            <Button color="danger" size="sm" onClick={consultaModal.onClose}>
              Fechar
            </Button>
          </ModalHeader>
          <ModalBody className="flex flex-col md:flex-row gap-4">
            <iframe src={`https://meet.jit.si/${url_consulta}`} frameBorder="0" width="100%" height="500" allow="microphone; camera"></iframe>
            {typeUser === "Medico" && (
              <FormProntuario id_paciente={id_paciente} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal Prontuário */}
      <Modal isOpen={prontuarioModal.isOpen} onClose={prontuarioModal.onClose} size="5xl">
        <ModalContent>
          <ModalHeader className="flex justify-end">
            <Button color="danger" size="sm" onClick={prontuarioModal.onClose}>
              Fechar
            </Button>
          </ModalHeader>
          <ModalBody>
            <Prontuario idPaciente={id_paciente} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Snackbar */}
      <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)}>
        <div className="bg-green-500 text-white px-4 py-2 rounded">
          {snackbarMsg}
        </div>
      </Snackbar>
    </>
  );
}
