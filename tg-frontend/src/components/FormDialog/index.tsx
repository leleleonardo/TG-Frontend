import React, { useState } from 'react';
import { Button, Modal, Textarea, Snippet } from '@nextui-org/react';
import { BorderColor } from '@mui/icons-material';
import api from '../../services/api';

export default function FormDialog({ idConsulta }) {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [newDate, setNewDate] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  async function changeDate() {
    await api.put('/consulta/changeDate', { id_consulta: idConsulta, new_date: newDate });
    handleClick1();
  }

  return (
    <div>
      {open1 && (
        <Modal isOpen={open1} onClose={handleClose1} placement="top-center" size="sm">
          <Modal.Body>
            <Snippet variant="flat" color="success">
              Data Atualizada.
            </Snippet>
          </Modal.Body>
        </Modal>
      )}

      <Button auto size="small" onClick={handleClickOpen} icon={<BorderColor />} />
      
      <Modal open={open} onClose={handleClose} aria-labelledby="dialog-title">
        <Modal.Header>
          <h3 id="dialog-title">Nova Data</h3>
        </Modal.Header>
        <Modal.Body>
          <p>Selecione a nova data da consulta.</p>
          <h6>{newDate}</h6>
          <input type="datetime-local" id="meeting-time" onChange={e => setNewDate(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button auto color="primary" onClick={changeDate}>
            Alterar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
