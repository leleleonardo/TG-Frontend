import React, { useState, useEffect } from 'react'
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, Button, Snackbar, Alert } from '@mui/material'
import { AccountBox, Email, Lock, LocalPhone } from '@mui/icons-material'
import api from '../../services/api'
import { DoubleItem, InputItem } from '../../styles/Cadastro'

function FormUsuario() {
    const [nome, setNome] = useState("")
    const [genero, setGenero] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [senha, setSenha] = useState("")
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

    useEffect(() => {
        getUsuario();
    }, [])

    async function getUsuario() {
        try {
            const result = await api.get('/usuario')
            setNome(result.data.nome)
            setGenero(result.data.genero)
            setEmail(result.data.email)
            setTelefone(result.data.telefone)
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error)
        }
    }

    async function atualizarDadosUsuario() {
        if (!nome) return showSnackbar('Nome é obrigatório.', 'warning')
        if (!genero) return showSnackbar('Gênero é obrigatório.', 'warning')
        if (!email) return showSnackbar('E-mail é obrigatório.', 'warning')
        if (!telefone) return showSnackbar('Telefone é obrigatório.', 'warning')

        try {
            const payload = senha
                ? { nome, genero, email, telefone, senha }
                : { nome, genero, email, telefone }

            await api.put('/usuario/editar', { data: payload })
            showSnackbar('Dados atualizados com sucesso!', 'success')

            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error)
            showSnackbar('Erro ao atualizar dados.', 'error')
        }
    }

    function showSnackbar(message, severity) {
        setSnackbar({ open: true, message, severity })
    }

    function handleCloseSnackbar(event, reason) {
        if (reason === 'clickaway') return
        setSnackbar({ ...snackbar, open: false })
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                style={{ width: '40%' }}
            >
                <Alert variant="filled" severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <form>
                <DoubleItem>
                    <Box>
                        <InputItem
                            style={{ width: '100%' }}
                            variant="filled"
                            label="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountBox />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box>
                        <FormControl variant="filled" style={{ width: 208 }}>
                            <InputLabel>Gênero</InputLabel>
                            <Select
                                value={genero}
                                onChange={e => setGenero(e.target.value)}
                            >
                                <MenuItem value="H">Homem</MenuItem>
                                <MenuItem value="M">Mulher</MenuItem>
                                <MenuItem value="O">Outro</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DoubleItem>

                <DoubleItem>
                    <Box>
                        <InputItem
                            style={{ width: '100%' }}
                            type="tel"
                            variant="filled"
                            label="Telefone"
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalPhone />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box>
                        <InputItem
                            style={{ width: '100%' }}
                            type="email"
                            variant="filled"
                            label="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </DoubleItem>

                <DoubleItem>
                    <Box>
                        <InputItem
                            style={{ width: '100%' }}
                            type="password"
                            variant="filled"
                            label="Senha (opcional)"
                            onChange={e => setSenha(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </DoubleItem>

                <Button
                    variant="contained"
                    size="large"
                    color="success"
                    sx={{ margin: 1 }}
                    onClick={atualizarDadosUsuario}
                >
                    <h4>ATUALIZAR</h4>
                </Button>
            </form>
        </>
    )
}

export default FormUsuario
