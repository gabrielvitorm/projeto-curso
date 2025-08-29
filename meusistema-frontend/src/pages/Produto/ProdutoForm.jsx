import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Form, OverlayTrigger, Row, Tooltip, Button, Modal } from 'react-bootstrap'
import { FaCheckCircle, FaQuestion, FaQuestionCircle } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

const ProdutoForm = () => {

  const apiUrl = import.meta.env.VITE_API_URL
  const { id } = useParams()
  const [modalAberto, setModalAberto] = useState(false)
  const [fornecedorBackEnd, setFornecedorBackEnd] = useState([])
  const navigate = useNavigate()
  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    descricao: '',
    quantidadeEstoque: '',
    fornecedorId: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const produtoData = { ...produto }

    const request = id
      ? axios.put(`${apiUrl}/produtos/${id}`, produtoData)
      : axios.post(`${apiUrl}/produtos`, produtoData)

    request.then(() => setModalAberto(true))
      .catch(error => console.error("Houve um problema ao Cadastrar/editar um produto", error))
  }

  useEffect(() => {
    axios.get(`${apiUrl}/fornecedores`)
      .then(response => setFornecedorBackEnd(response.data))
      .catch(error => console.error("Erro ao listar fornecedores", error));
  }, [apiUrl]);

  useEffect(() => {
    if (id) {
      axios.get(`${apiUrl}/produtos/${id}`)
        .then(response => setProduto(response.data))
        .catch(error => console.error("Houve um erro ao carregar um produto: ", error))
    }
  }, [id])

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary"
    >
      <Row className="w-100 px-3">
        <Col
          xs={12}
        >
          <Card className="rounded-4 shadow-sm mx-auto" style={{ width: "90%" }}>
            <Card.Body className="p-4 p-sm-5">
              <Card.Title className="mb-1 text-center">
                <div className="d-flex align-items-center gap-2">
                  <h2 className="mb-0">
                    {id ? "Atualizar Produto" : "Cadastrar Produto"}
                  </h2>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Preencha os dados do cliente</Tooltip>}
                  >
                    <span className="ms-2" style={{ cursor: "pointer" }}>
                      <FaQuestionCircle />
                    </span>
                  </OverlayTrigger>
                </div>
              </Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label className='mb-3'>Nome do Produto:</Form.Label>
                  <Form.Control
                    className='mb-2'
                    type='text'
                    value={produto.nome}
                    onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={2}>
                    <Form.Label className='mb-3'>Id do Cliente:</Form.Label>
                    <Form.Select
                      value={produto.fornecedorId}
                      onChange={(e) => setProduto({ ...produto, fornecedorId: e.target.value })}
                      required
                    >
                      <option value="" >Selecione...</option>
                      {fornecedorBackEnd.map((fornecedor) => (
                        <option key={fornecedor.id} value={fornecedor.id}>
                          {fornecedor.id} - {fornecedor.nome}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label className='mb-3'>Preço do Produto:</Form.Label>
                      <Form.Control
                        className='mb-2'
                        type='text'
                        value={produto.preco}
                        onChange={(e) => setProduto({ ...produto, preco: parseFloat(e.target.value) })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label className='mb-3'>Quantidade de Estoque</Form.Label>
                      <Form.Control
                        className='mb-2'
                        type='text'
                        value={produto.quantidadeEstoque}
                        onChange={(e) => setProduto({ ...produto, quantidadeEstoque: parseFloat(e.target.value) })}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label className='mb-3'>Descrição:</Form.Label>
                  <Form.Control
                    className='mb-2'
                    type='text-area'
                    value={produto.descricao}
                    onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
                  />
                </Form.Group>
                <Row>
                  <Col md={12}>
                    <Button type='submit' className='w-100 mt-3 pt-3 pb-3'>
                      {
                        id
                          ? "Atualizar Produto"
                          : "Cadastrar Produto"
                      }
                    </Button>
                  </Col>
                </Row>

                <Modal show={modalAberto} onHide={() => { setModalAberto(false); navigate('/listar-produtos') }}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <FaCheckCircle className='text-success me-2' />
                      Sucesso!
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {
                      id
                        ? "Produto atualizado com sucesso!"
                        : "Produto cadastrado com sucesso!"
                    }
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='success' onClick={() => navigate("/listar-produtos")}>
                      Fechar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default ProdutoForm