import * as React from 'react'
import { useState, useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import dayjs from 'dayjs'
import api from '../../services/api'

const columns = [
  { id: 'especialidade', label: 'Especialidade', minWidth: 170 },
  { id: 'paciente', label: 'Paciente', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'dt_hr_consulta', label: 'Data', minWidth: 170 },
]

export default function DoctorsAppointmentHistory() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rows, setRows] = useState([])

  useEffect(() => {
    getAppointments()

    const interval = setInterval(getAppointments, 60000)

    return () => clearInterval(interval) // cleanup do intervalo
  }, [])

  async function getAppointments() {
    try {
      const result = await api.get('/consultas/getDoctorAppointments')
      setRows(result.data)
    } catch (error) {
      console.error('Erro ao buscar consultas:', error)
    }
  }

  function handleChangePage(event, newPage) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="Tabela de histórico de consultas">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    let value = row[column.id]

                    if (column.id === 'dt_hr_consulta' && value) {
                      value = dayjs(value).format('DD/MM/YYYY')
                    }

                    return (
                      <TableCell key={column.id}>
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
