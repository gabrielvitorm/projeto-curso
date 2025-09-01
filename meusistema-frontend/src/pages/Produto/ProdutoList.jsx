import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, OverlayTrigger, Tooltip, Button, Table, Modal } from 'react-bootstrap'
import { FaEdit, FaExclamationTriangle, FaPlus, FaQuestionCircle, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ProdutoList = () => {

  const apiUrl = import.meta.env.VITE_API_URL

  const [produtos, setProdutos] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)

  useEffect(() => {
    axios.get(`${apiUrl}/produtos`)
      .then(res => setProdutos(res.data))
      .catch(err => console.error("Houve um problema para listar os produtos", err))
  }, [])

  const fecharModal = () => {
    setModalAberto(false)
    setProdutoSelecionado(null)
  }

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto)
    setModalAberto(true)
  }

  const excluirProduto = () => {
    axios.delete(`${apiUrl}/produtos/${produtoSelecionado.id}`)
      .then(() => {
        setProdutos(prev => prev.filter(f => f.id !== produtoSelecionado.id))
        fecharModal()
      })
  }

  return (
    <Container className='mt-5'>
      <h2 className='mb-4 d-flex align-items-center'>
        Lista de Produtos
        <OverlayTrigger
          placement='right'
          overlay={<Tooltip>Visualize, edite ou exclua um produto</Tooltip>}
        >
          <span className='ms-2' style={{ cursor: 'pointer' }}>
            <FaQuestionCircle />
          </span>

        </OverlayTrigger>
      </h2>

      <div className='mb-4'>
        <Button as={Link} to='/cadastrar-produto' variant='primary'>
          <FaPlus className='me-2' />
          Adicionar Produto
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Quantidade de Estoque</th>
            <th>Preço</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            produtos.map(produto => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.quantidadeEstoque}</td>
                <td>{produto.preco}</td>
                <td>{produto.descricao}</td>
                <td>
                  <Button as={Link} to={`/editar-produto/${produto.id}`} variant='warning' size='sm' className='me-2'>
                    <FaEdit className='me-1' />
                    Editar
                  </Button>
                  <Button variant='danger' size='sm' className='me-2' onClick={() => abrirModal(produto)}>
                    <FaTrash className='me-1' />
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>

      <Modal show={modalAberto} onHide={fecharModal} centered>
        <Modal.Header>
          <Modal.Title>
            <FaExclamationTriangle
              className='text-danger me-2'
            />
            Confirmar Exclusão
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o produto: {' '}<strong>{produtoSelecionado?.nome}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secundary' onClick={fecharModal}>
            Cancelar
          </Button>
          <Button variant='danger' onClick={excluirProduto}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default ProdutoList