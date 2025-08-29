import React from 'react'
import FornecedorForm from './pages/Fornecedor/FornecedorForm'
import FornecedorList from './pages/Fornecedor/FornecedorList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inicial from './pages/Inicial'
import Menu from './components/Menu'
import ClienteForm from './pages/Cliente/ClienteForm'
import ClienteList from './pages/Cliente/ClienteList'
import ProdutoForm from './pages/Produto/ProdutoForm'
import ProdutoList from './pages/Produto/ProdutoList'

const App = () => {
  return (
    <BrowserRouter>
    <Menu/>
      <Routes>
        <Route path='/' element={<Inicial />}/>
        <Route path='/cadastrar-fornecedor' element={<FornecedorForm />} />
        <Route path='/listar-fornecedores' element={<FornecedorList />} />
        <Route path='/editar-fornecedor/:id' element={<FornecedorForm />} />
        <Route path='/cadastrar-cliente' element={<ClienteForm />} />
        <Route path='/listar-clientes' element={<ClienteList />} />
        <Route path='/cadastrar-produto' element={<ProdutoForm />} />
        <Route path='/listar-produtos' element={<ProdutoList/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App