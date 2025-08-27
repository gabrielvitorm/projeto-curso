import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { FaEdit, FaExclamationTriangle, FaPlus, FaQuestionCircle, FaTrash } from 'react-icons/fa'
import axios from 'axios'

const ClienteList = () => {

  const apiUrl = import.meta.env.VITE_API_URL
  const [clientes, setClientes] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [clienteSelecionado, setClienteSelecionado] = useState(null)

  useEffect(() => {
    axios.get(`${apiUrl}/clientes`)
    .then(response => setClientes(response.data))
    .catch(error => console.error("Houve um problema para listar os clientes: ", error))
  }, [])

  const fecharModal = () => {
    setModalAberto(false)
    setClienteSelecionado(null)
  }

  const abrirModal = (cliente) => {
    setClienteSelecionado(cliente)
    setModalAberto(true)
  }

  const excluirCliente = () => {
    axios.delete(`${apiUrl}/clientes/${clienteSelecionado.id}`)
    .then(() =>{
      setClientes(prev => prev.filter(f => f.id !== clienteSelecionado.id))
      fecharModal()
    })
    .catch(error => console.error("Houve um problema em deletar o cliente: ", error))
  }

  return (
    <Container className='mt-5'>
      <h2 className='mb-4 d-flex align-items-center'>
        Lista de Clientes
        <OverlayTrigger
          placement='right'
          overlay={<Tooltip>Lista de todos os clientes</Tooltip>}
        >
          <span className='ms-2' style={{ cursor: 'pointer' }}>
            <FaQuestionCircle/>
          </span>
        </OverlayTrigger>
      </h2>

      <div className='mb-3'>
        <Button as={Link} to="/cadastrar-cliente" variant='primary' className='mb-4'>
          <FaPlus className='me-2'/>
          Adicionar Cliente
        </Button>
        <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map(cliente =>(
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.endereco.cidade}</td>
                <td>
                  <Button as={Link} to={`/editar-cliente/${cliente.id}`} variant='warning' size='sm' className='me-2'>
                    <FaEdit className='me-1'/>
                    Editar
                  </Button>
                  <Button onClick={() => abrirModal(cliente)} variant='danger' size='sm' className='me-2'>
                    <FaTrash className='me-1'/>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      </div>

      <Modal show={modalAberto} onHide={fecharModal} centered>
        <Modal.Header>
          <Modal.Title>
            <FaExclamationTriangle className='text-danger me-2'/>
            Confirmar Exclusão
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o cliente: {' '} <strong>{clienteSelecionado?.nome}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secundary' onClick={fecharModal}>
            Cancelar
          </Button>
          <Button variant='danger' onClick={excluirCliente}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default ClienteList