import React, { useEffect, useState } from 'react'
import { Button, Container, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { FaEdit, FaPlus, FaQuestionCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'

const FornecedorList = () => {

  const apiUrl = import.meta.env.VITE_API_URL

  const [fornecedores, setFornecedores] = useState([])

  useEffect(() => {
    axios.get(`${apiUrl}/fornecedores`)
    .then(response => setFornecedores(response.data))
    .catch(error => console.error("Houve um problema para listar os fornecedores: ", error))

  }, [])

  return (
    <Container className='mt-5'>
      <h2 className='mb-4 d-flex align-items-center'>
        Lista de Fornecedores
        <OverlayTrigger
          placement='right'
          overlay={<Tooltip>Visualize, edite ou exclua um fornecedor</Tooltip>}
        >
          <span className='ms-2' style={{ cursor: 'pointer' }}>
            <FaQuestionCircle/>
          </span>

        </OverlayTrigger>
      </h2>

      <div className='mb-3'>
        <Button as={Link} to='/cadastrar-fornecedor' variant='primary'>
          <FaPlus className='me-2'/>
          Adicionar Fornecedor
        </Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            fornecedores.map(fornecedor => (
              <tr key={fornecedor.id}>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.tipoFornecedor}</td>
                <td>
                  <Button variant='warning' size='sm' className='me-2'>
                    <FaEdit className='me-1'/>Editar
                  </Button>
                  <Button variant='danger' size='sm' className='me-2'>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Container>
  )
}

export default FornecedorList