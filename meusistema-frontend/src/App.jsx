import React from 'react'
import FornecedorForm from './pages/Fornecedor/FornecedorForm'
import FornecedorList from './pages/Fornecedor/FornecedorList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inicial from './pages/Inicial'
import Menu from './components/Menu'

const App = () => {
  return (
    <BrowserRouter>
    <Menu/>
      <Routes>
        <Route path='/' element={<Inicial />}/>
        <Route path='/cadastrar-fornecedor' element={<FornecedorForm />}/>
        <Route path='/listar-fornecedores' element={<FornecedorList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App