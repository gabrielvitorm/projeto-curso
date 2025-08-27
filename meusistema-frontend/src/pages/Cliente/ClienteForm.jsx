import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { FaQuestionCircle } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

const ClienteForm = () => {

  const { id } = useParams()
  const apiUrl = import.meta.env.VITE_API_URL

  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: 'Brasil'
    }
  })

  const handleEndereco = (campo, valor) =>{
    setCliente((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, [campo]: valor}
    }))
  }

  const handleCepChange = (e) =>{
    handleEndereco('cep', e.target.value)
  }

  useEffect(() => {
    const cep = cliente.endereco.cep.replace(/\D/g, '')
    if(cep.length === 8){
      axios.get(`https://viacep.com.br/ws/${cep}/json`)
      .then(response => {
        handleEndereco ('logradouro', response.data.logradouro)
        handleEndereco ('bairro', response.data.bairro)
        handleEndereco ('cidade', response.data.localidade)
        handleEndereco ('estado', response.data.estado)
      })
    }
  }, [cliente.endereco.cep])

  const handleSubmit = (e) =>{
    e.preventDefault()

    const clienteData = {
      ...cliente,
      cpf: cliente.cpf.replace(/[^\d]/g, '')
    }

    const request = id
    ? axios.put(`${apiUrl}/clientes/${id}`, clienteData)
    : axios.post(`${apiUrl}/clientes`, clienteData)
  }

  return (
    <Container className='mt-4'>
      <h2 className='mb-4 d-flex align-itens-center'>
        {
          id ? "Atualizar Cliente" : "Cadastrar Cliente"
        }
        <OverlayTrigger
          placement='right'
          overlay={<Tooltip>Preencha os dados do cliente</Tooltip>}
        >
          <span className='ms-2' style={{ cursor: 'pointer'}}>
            <FaQuestionCircle />
          </span>
        </OverlayTrigger>
      </h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type='text'
            value={cliente.nome}
            onChange={(e) => setCliente({...cliente, nome: e.target.value})}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type='email'
            value={cliente.email}
            onChange={(e) => setCliente({...cliente, email: e.target.value})}
            required
          />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className='mb-3'>
              <Form.Label>CPF:</Form.Label>
              <Form.Control 
                type='text'
                placeholder='999.999.999-99'
                value={cliente.cpf}
                onChange={(e) => setCliente({...cliente, cpf: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3'>
              <Form.Label>Telefone</Form.Label>
              <Form.Control 
                type='text'
                placeholder='(83) 9 9999-9999'
                value={cliente.numero}
                onChange={(e) => setCliente({...cliente, telefone: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className='mb-3'>
              <Form.Label>CEP</Form.Label>
              <Form.Control 
                type='text'
                placeholder='58000-000'
                value={cliente.endereco.cep}
                onChange={handleCepChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form.Group className='mb-3'>
              <Form.Label>Logradouro</Form.Label>
              <Form.Control 
                type='text'
                value={cliente.endereco.logradouro}
                onChange={(e) => handleEndereco('logradouro', e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className='mb-3'>
              <Form.Label>Número:</Form.Label>
              <Form.Control
                type='text'
                value={cliente.endereco.numero}
                onChange={(e) => handleEndereco('numero', e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form.Group className='mb-3'>
              <Form.Label>Complemento</Form.Label>
              <Form.Control 
                type='text'
                value={cliente.endereco.complemento}
                onChange={(e) => handleEndereco('complemento', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className='mb-3'>
              <Form.Label>Bairro:</Form.Label>
              <Form.Control 
                type='text'
                value={cliente.endereco.bairro}
                onChange={(e) => handleEndereco('bairro', e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3'>
              <Form.Label>Cidade:</Form.Label>
              <Form.Control 
                type='text'
                value={cliente.endereco.cidade}
                onChange={(e) => handleEndereco('cidade', e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Estado:</Form.Label>
              <Form.Control
                type='text'
                value={cliente.endereco.estado}
                onChange={(e) => handleEndereco('estado', e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>País:</Form.Label>
              <Form.Control
                type='text'
                value={cliente.endereco.pais}
                onChange={(e) => handleEndereco('pais', e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant='primary' type='submit' className='mt-2'>
          {
            id ? "Atulizar" : "Cadastrar"
          }
        </Button>
      </Form>
    </Container>
    
  )
}

export default ClienteForm