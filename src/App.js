import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './controllers/Home/home';
import Cadastro from "./controllers/Cadastro/cadastro";
import EmpresaInfo from "./controllers/FormularioInfo/EmpresaInfo/empresaInfo";
import RelatorioInfo from "./controllers/FormularioInfo/RelatorioInfo/relatorioInfo";
import Login from "./controllers/Login/login"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/cadastro" element={<Cadastro />}/>
        <Route exact path="/empresaInfo" element={<EmpresaInfo/>}/>
        <Route exact path="/relatorioInfo/:idEmpresa" element={<RelatorioInfo/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;