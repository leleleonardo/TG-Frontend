'use client'

import { useState, useEffect } from 'react'
import { Input, Button } from '@nextui-org/react'
import { toast } from 'sonner'
import { MonitorWeight, Height, PestControl, Coronavirus, SmokingRooms, Medication } from '@mui/icons-material'
import api from '@/services/api'

export default function FormPaciente() {
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [alergia, setAlergia] = useState('')
  const [doenca, setDoenca] = useState('')
  const [vicio, setVicio] = useState('')
  const [medicamento, setMedicamento] = useState('')

  useEffect(() => {
    getPaciente()
  }, [])

  async function getPaciente() {
    try {
      const result = await api.get('/paciente')
      setPeso(result.data.peso || '')
      setAltura(result.data.altura || '')
      setAlergia(result.data.alergia || '')
      setDoenca(result.data.doenca_cronica || '')
      setVicio(result.data.vicio || '')
      setMedicamento(result.data.medicamento || '')
    } catch (error) {
      toast.error('Erro ao carregar dados do paciente')
    }
  }

  async function atualizarPaciente() {
    if (!peso) {
      toast.warning('Peso é obrigatório.')
      return
    }

    if (!altura) {
      toast.warning('Altura é obrigatória.')
      return
    }

    try {
      await api.put('/paciente', { peso, altura, alergia, doenca_cronica: doenca, vicio, medicamento })
      toast.success('Paciente atualizado com sucesso!')
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Erro ao atualizar paciente')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-6">
        <Input
          label="Peso"
          variant="bordered"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          startContent={<MonitorWeight />}
          className="w-72"
        />
        <Input
          label="Altura"
          variant="bordered"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          startContent={<Height />}
          className="w-72"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <Input
          label="Alergia(s)"
          variant="bordered"
          value={alergia}
          onChange={(e) => setAlergia(e.target.value)}
          startContent={<PestControl />}
          className="w-72"
        />
        <Input
          label="Doença(s) crônica(s)"
          variant="bordered"
          value={doenca}
          onChange={(e) => setDoenca(e.target.value)}
          startContent={<Coronavirus />}
          className="w-72"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <Input
          label="Vício(s)"
          variant="bordered"
          value={vicio}
          onChange={(e) => setVicio(e.target.value)}
          startContent={<SmokingRooms />}
          className="w-72"
        />
        <Input
          label="Medicamento(s)"
          variant="bordered"
          value={medicamento}
          onChange={(e) => setMedicamento(e.target.value)}
          startContent={<Medication />}
          className="w-72"
        />
      </div>

      <Button color="success" size="lg" onClick={atualizarPaciente}>
        Atualizar
      </Button>
    </div>
  )
}
