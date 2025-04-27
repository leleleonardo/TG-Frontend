import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import api from '../../services/api';

import {
  Form,
  Div,
} from '../../styles/Cadastro/Cadastro';

import { Input, Button, Select, SelectItem, Spacer, Modal, ModalBody, ModalHeader, ModalFooter, useDisclosure, Snippet } from "@nextui-org/react";

function UpdateUserForm({ toggleModal, name, gender, telephone, email }) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: name,
      gender: gender,
      telephone: telephone,
      email: email,
    },
    validationSchema: yup.object({
      name: yup.string().required('O campo é obrigatório.'),
      gender: yup.string().required('O campo é obrigatório.'),
      telephone: yup.string().required('O campo é obrigatório.'),
      email: yup.string().email('E-mail inválido.').required('O campo é obrigatório.'),
    }),
    onSubmit: (values) => {
      update(values);
    }
  });

  async function update({ name, gender, telephone, email }) {
    await api.put("/usuario/updateDadosPessoais", {
      nome: name,
      genero: gender,
      telefone: telephone,
      email
    });
    handleClick();
    setTimeout(() => {
      toggleModal();
    }, 3000);
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Modal isOpen={open} onClose={handleClose} placement="top-center" size="sm">
          <ModalHeader>Sucesso</ModalHeader>
          <ModalBody>
            <Snippet variant="flat" color="success">
              Dados atualizados com sucesso!
            </Snippet>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={handleClose}>
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
      )}

      <Form style={{ width: '70vw' }} onSubmit={formik.handleSubmit}>
        <h3 style={{ margin: 0, marginBottom: '1rem', textAlign: 'center' }}>Editar Dados Pessoais</h3>

        <Div style={{ flexDirection: 'column' }}>
          <Input
            fullWidth
            isInvalid={formik.touched.name && !!formik.errors.name}
            id="name"
            name="name"
            type="text"
            label="Nome"
            variant="bordered"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            errorMessage={formik.touched.name && formik.errors.name}
          />
        </Div>

        <Spacer y={4} />

        <Div>
          <Select
            fullWidth
            id="gender"
            name="gender"
            label="Gênero"
            variant="bordered"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            selectedKeys={[formik.values.gender]}
            isInvalid={formik.touched.gender && !!formik.errors.gender}
            errorMessage={formik.touched.gender && formik.errors.gender}
          >
            <SelectItem key="H" value="H">
              Homem
            </SelectItem>
            <SelectItem key="M" value="M">
              Mulher
            </SelectItem>
            <SelectItem key="O" value="O">
              Outro
            </SelectItem>
          </Select>
        </Div>

        <Spacer y={4} />

        <Div>
          <Input
            fullWidth
            isInvalid={formik.touched.telephone && !!formik.errors.telephone}
            id="telephone"
            name="telephone"
            type="text"
            label="Telefone"
            variant="bordered"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telephone}
            errorMessage={formik.touched.telephone && formik.errors.telephone}
          />
        </Div>

        <Spacer y={4} />

        <Div style={{ flexDirection: 'column' }}>
          <Input
            fullWidth
            isInvalid={formik.touched.email && !!formik.errors.email}
            id="email"
            name="email"
            type="email"
            label="E-mail"
            variant="bordered"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            errorMessage={formik.touched.email && formik.errors.email}
          />
        </Div>

        <Spacer y={4} />

        <Button
          fullWidth
          color="primary"
          onClick={formik.handleSubmit}
          style={{ marginBottom: '1rem' }}
        >
          Atualizar
        </Button>
      </Form>
    </>
  );
}

export default UpdateUserForm;
