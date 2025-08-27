import React from 'react'
import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaQuestionCircle } from 'react-icons/fa'

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
    </Container>
  )
}

export default FornecedorList