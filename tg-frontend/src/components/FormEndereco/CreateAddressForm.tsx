import React from 'react';
import { Button, Input, Textarea, Grid, Modal, Snippet } from '@nextui-org/react';
import { useFormik } from "formik";
import * as yup from 'yup';

import api from '../../services/api';
import { Form, Div } from '../../styles/Cadastro/Cadastro';

function FormEndereco({ handleOnChange, userId }) {

  const formik = useFormik({
    initialValues: {
      cep: "",
      address: "",
      complement: "",
      city: "",
      number: "",
      state: "",
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
      create(values);
    }
  });

  function checkCep() {
    let cep = formik.values.cep;
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo === '') { return; }
    if (cepLimpo.length !== 8) { return; }

    fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      .then(res => res.json())
      .then(data => {
        formik.values.address = data.logradouro;
        formik.values.city = data.localidade;
        formik.values.state = data.uf;
      });
  }

  async function create({ cep, address, number, complement, city, state }) {
    await api.post("/usuario/endereco", {
      id_usuario: userId,
      cep,
      logradouro: address,
      numero: number,
      complemento: complement,
      cidade: city,
      estado: state,
    });
    handleOnChange(3);
  }

  return (
    <Form onSubmit={formik.handleSubmit} xs={12}>
      <h3 style={{ margin: 0, marginBottom: '1rem' }}>Endereço</h3>
      <Div style={{ flexDirection: 'column' }}>
        <Input
          fullWidth
          size="sm"
          id="cep"
          name="cep"
          type="text"
          label="Cep"
          onChange={formik.handleChange}
          onBlur={(e) => {
            checkCep();
          }}
          value={formik.values.cep}
          status={formik.touched.cep && formik.errors.cep ? 'error' : 'default'}
        />
        {formik.touched.cep && formik.errors.cep && (
          <div style={{ color: 'red' }}>{formik.errors.cep}</div>
        )}
      </Div>

      <Grid.Container gap={2}>
        <Grid xs={12} sm={8}>
          <Input
            fullWidth
            size="sm"
            id="address"
            name="address"
            type="text"
            label="Endereço"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            disabled
            status={formik.touched.address && formik.errors.address ? 'error' : 'default'}
          />
          {formik.touched.address && formik.errors.address && (
            <div style={{ color: 'red' }}>{formik.errors.address}</div>
          )}
        </Grid>

        <Grid xs={12} sm={4}>
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
      </Grid.Container>

      <Div style={{ flexDirection: 'column' }}>
        <Input
          fullWidth
          size="sm"
          id="complement"
          name="complement"
          type="text"
          label="Complemento"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.complement}
        />
      </Div>

      <Grid.Container gap={2}>
        <Grid xs={12} sm={8}>
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

        <Grid xs={12} sm={4}>
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
        Próximo
      </Button>
    </Form>
  );
}

export default FormEndereco;
