import React from 'react'
import { Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaPlus, FaQuestionCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const FornecedorList = () => {
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
    </Container>
  )
}

export default FornecedorList