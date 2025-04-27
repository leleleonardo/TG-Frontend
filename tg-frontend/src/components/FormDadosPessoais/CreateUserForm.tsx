'use client';

import { Input, Button, Select, SelectItem, DatePicker, Card } from "@nextui-org/react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { parseDate } from "@internationalized/date";

import api from '../../services/api'

import {
    Form,
    Div,
} from '../../styles/Cadastro/Cadastro'

function CreateUserForm({ handleOnChange, handleOnSetUserId, type }) {

    const formik = useFormik({
        initialValues: {
            name: "",
            birthDate: "",
            gender: "",
            telephone: "",
            email: "",
            password: "",
            confirmPassword: "",
            tipo: type
        },
        validationSchema: yup.object({
            name: yup.string().required("O campo é obrigatório."),
            birthDate: yup.string().required("O campo é obrigatório."),
            gender: yup.string().required("O campo é obrigatório."),
            telephone: yup.string().required("O campo é obrigatório."),
            email: yup.string().email("E-mail inválido.").required("O campo é obrigatório."),
            password: yup.string().required("O campo é obrigatório."),
            confirmPassword: yup.string().required("O campo é obrigatório."),
        }),
        onSubmit: (values) => {
            create(values)
        }
    });

    async function create({ name, birthDate, gender, telephone, email, password }) {
        let res
        if (type === "Medico") {
            res = await api.post("/usuario/createUser", {
                nome: name,
                dt_nascimento: birthDate,
                genero: gender,
                telefone: telephone,
                email,
                senha: password,
                tipo: type,
                aguardando_validacao: 1
            });
        } else {
            res = await api.post("/usuario/createUser", {
                nome: name,
                dt_nascimento: birthDate,
                genero: gender,
                telefone: telephone,
                email,
                senha: password,
                tipo: type
            });
        }

        handleOnSetUserId(res.data.id)
        handleOnChange(2)
    }

    return (
        <Form onSubmit={formik.handleSubmit}>
            <h3 style={{ margin: 0, marginBottom: '1rem' }}>Dados Pessoais</h3>

            <Div style={{ flexDirection: 'column' }}>
                <Input
                    fullWidth
                    isInvalid={formik.touched.name && !!formik.errors.name}
                    errorMessage={formik.touched.name && formik.errors.name}
                    label="Nome"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
            </Div>

            <Div>
                <DatePicker
                    label="Data de Nascimento"
                    id="birthDate"
                    name="birthDate"
                    variant="bordered"
                    fullWidth
                    isInvalid={formik.touched.birthDate && !!formik.errors.birthDate}
                    errorMessage={formik.touched.birthDate && formik.errors.birthDate}
                    value={formik.values.birthDate ? parseDate(formik.values.birthDate) : null}
                    onChange={(date) => {
                        const formattedDate = date.toString(); // DateObject para ISOString (yyyy-mm-dd)
                        formik.setFieldValue("birthDate", formattedDate);
                    }}
                />
            </Div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Div style={{ flex: 1, flexDirection: 'column', minWidth: '200px' }}>
                    <Select
                        label="Gênero"
                        id="gender"
                        name="gender"
                        variant="bordered"
                        fullWidth
                        isInvalid={formik.touched.gender && !!formik.errors.gender}
                        errorMessage={formik.touched.gender && formik.errors.gender}
                        onChange={(e) => formik.setFieldValue('gender', e.target.value)}
                        onBlur={formik.handleBlur}
                        selectedKeys={formik.values.gender ? [formik.values.gender] : []}
                    >
                        <SelectItem key="H" value="H">Homem</SelectItem>
                        <SelectItem key="M" value="M">Mulher</SelectItem>
                        <SelectItem key="O" value="O">Outro</SelectItem>
                    </Select>
                </Div>

                <Div style={{ flex: 1, flexDirection: 'column', minWidth: '200px' }}>
                    <Input
                        fullWidth
                        isInvalid={formik.touched.telephone && !!formik.errors.telephone}
                        errorMessage={formik.touched.telephone && formik.errors.telephone}
                        label="Telefone"
                        id="telephone"
                        name="telephone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.telephone}
                    />
                </Div>
            </div>

            <Div style={{ flexDirection: 'column' }}>
                <Input
                    fullWidth
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    errorMessage={formik.touched.email && formik.errors.email}
                    label="E-mail"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
            </Div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Div style={{ flex: 1, flexDirection: 'column', minWidth: '200px' }}>
                    <Input
                        fullWidth
                        type="password"
                        isInvalid={formik.touched.password && !!formik.errors.password}
                        errorMessage={formik.touched.password && formik.errors.password}
                        label="Senha"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                </Div>

                <Div style={{ flex: 1, flexDirection: 'column', minWidth: '200px' }}>
                    <Input
                        fullWidth
                        type="password"
                        isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                        errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        label="Confirme a Senha"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                    />
                </Div>
            </div>

            <Button
                fullWidth
                color="primary"
                variant="solid"
                type="submit"
                style={{ marginTop: '1.5rem' }}
            >
                Próximo
            </Button>
        </Form>
    )
}

export default CreateUserForm;
