// src/app/configuracoes/components/FormEndereco.tsx

"use client";

import { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Spacer } from "@nextui-org/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import api from "@/services/api";

export default function FormEndereco() {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function getEndereco() {
      try {
        const { data } = await api.get("/usuario/endereco");
        setCep(data.cep || "");
        setNumero(data.numero || "");
        setComplemento(data.complemento || "");
        setCidade(data.cidade || "");
        setEstado(data.estado || "");
      } catch (error) {
        toast.error("Erro ao carregar endereço");
      } finally {
        setLoading(false);
      }
    }

    getEndereco();
  }, []);

  async function checkCep() {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();
      if (data.erro) {
        toast.error("CEP inválido");
        return;
      }
      setLogradouro(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");
    } catch {
      toast.error("Erro ao buscar CEP");
    }
  }

  async function atualizarEndereco() {
    if (!cep || !numero || !cidade || !estado) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setSaving(true);

    try {
      await api.put("/usuario/endereco", {
        cep,
        numero,
        complemento,
        cidade,
        estado,
      });

      toast.success("Endereço atualizado com sucesso!");
    } catch {
      toast.error("Erro ao atualizar endereço");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto p-4">
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="CEP"
            variant="bordered"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={checkCep}
            isRequired
          />

          <Input
            label="Número"
            variant="bordered"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            isRequired
          />

          <Input
            label="Logradouro"
            variant="bordered"
            value={logradouro}
            isDisabled
          />

          <Input
            label="Complemento"
            variant="bordered"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />

          <Input
            label="Bairro"
            variant="bordered"
            value={bairro}
            isDisabled
          />

          <Input
            label="Cidade"
            variant="bordered"
            value={cidade}
            isDisabled
            isRequired
          />

          <Input
            label="Estado"
            variant="bordered"
            value={estado}
            isDisabled
            isRequired
          />
        </div>

        <Spacer y={6} />

        <Button
          color="success"
          size="lg"
          fullWidth
          onClick={atualizarEndereco}
          isLoading={saving}
        >
          Atualizar Endereço
        </Button>
      </CardBody>
    </Card>
  );
}
