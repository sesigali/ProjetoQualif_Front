import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './controllers/Home/home';
import Cadastro from "./controllers/Cadastro/cadastro";
import EmpresaInfo from "./controllers/FormularioInfo/EmpresaInfo/empresaInfo";
import EmpresasLista from "./controllers/EmpresasLista/empresasLista";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/cadastro" element={<Cadastro />}/>
        <Route exact path="/empresaInfo" element={<EmpresaInfo/>}/>
        <Route exact path="/empresasLista" element={<EmpresasLista/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;