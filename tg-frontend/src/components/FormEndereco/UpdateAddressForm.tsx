import React, { useState } from 'react';
import { Input, Button, Snackbar, Textarea, Grid, Modal, Alert } from '@nextui-org/react';
import { useFormik } from "formik";
import * as yup from 'yup';

import api from '../../services/api';
import { Form, Div } from '../../styles/Cadastro/Cadastro';

function UpdateAddressForm({ toggleModal, cep, address, complement, city, number, state }) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      cep: cep,
      address: address,
      complement: complement,
      city: city,
      number: number,
      state: state,
    },
    validationSchema: yup.object({
      cep: yup
        .string()
        .required("O campo é obrigatório."),
      address: yup
        .string()
        .required("O campo é obrigatório."),
      complement: yup
        .string(),
      city: yup
        .string()
        .required("O campo é obrigatório."),
      number: yup
        .string()
        .required("Obrigatório."),
      state: yup
        .string()
        .required("O campo é obrigatório."),
    }),
    onSubmit: (values) => {
      update(values);
    }
  });

  function checkCep() {
    let cep = formik.values.cep;
    const cepLimpo = cep.replace(/\D/g, '');
    fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      .then(res => res.json())
      .then(data => {
        formik.values.address = data.logradouro;
        formik.values.city = data.localidade;
        formik.values.state = data.uf;
      });
  }

  async function update({ cep, number, complement, city, state }) {
    await api.put("/usuario/endereco", {
      cep,
      numero: number,
      complemento: complement,
      cidade: city,
      estado: state,
    });
    handleClick();
    setTimeout(() => {
      toggleModal();
    }, 3000);
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        style={{ width: '40%' }}
      >
        <Alert variant="filled" severity="success" onClose={handleClose} sx={{ width: '100%' }}>
          Endereço Atualizado.
        </Alert>
      </Snackbar>
      <Form style={{ width: '70vw' }} onSubmit={formik.handleSubmit} xs={12}>
        <h3 style={{ margin: 0, marginBottom: '1rem' }} align="center">Editar Endereço</h3>
        <Div style={{ flexDirection: 'column' }}>
          <Input
            fullWidth
            size="sm"
            id="cep"
            name="cep"
            type="text"
            label="Cep"
            onChange={formik.handleChange}
            onBlur={checkCep}
            value={formik.values.cep}
            status={formik.touched.cep && formik.errors.cep ? 'error' : 'default'}
          />
          {formik.touched.cep && formik.errors.cep && (
            <div style={{ color: 'red' }}>{formik.errors.cep}</div>
          )}
        </Div>

        <Grid.Container gap={2}>
          <Grid xs={12}>
            <Input
              fullWidth
              size="sm"
              id="number"
              name="number"
              type="text"
              label="Número"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.number}
              status={formik.touched.number && formik.errors.number ? 'error' : 'default'}
            />
            {formik.touched.number && formik.errors.number && (
              <div style={{ color: 'red' }}>{formik.errors.number}</div>
            )}
          </Grid>

          <Grid xs={12}>
            <Textarea
              fullWidth
              size="sm"
              id="complement"
              name="complement"
              label="Complemento"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.complement}
            />
          </Grid>

          <Grid xs={12}>
            <Input
              fullWidth
              size="sm"
              id="city"
              name="city"
              type="text"
              label="Cidade"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              disabled
              status={formik.touched.city && formik.errors.city ? 'error' : 'default'}
            />
            {formik.touched.city && formik.errors.city && (
              <div style={{ color: 'red' }}>{formik.errors.city}</div>
            )}
          </Grid>

          <Grid xs={12}>
            <Input
              fullWidth
              size="sm"
              id="state"
              name="state"
              type="text"
              label="Estado"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
              disabled
              status={formik.touched.state && formik.errors.state ? 'error' : 'default'}
            />
            {formik.touched.state && formik.errors.state && (
              <div style={{ color: 'red' }}>{formik.errors.state}</div>
            )}
          </Grid>
        </Grid.Container>

        <Button fullWidth auto onClick={formik.handleSubmit}>
          Atualizar
        </Button>
      </Form>
    </>
  );
}

export default UpdateAddressForm;
