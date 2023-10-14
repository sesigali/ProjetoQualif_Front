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
        <Route  path="/" element={<Home/>}/>
        <Route  path="/cadastro" element={<Cadastro />}/>
        <Route  path="/empresaInfo" element={<EmpresaInfo/>}/>
        <Route  path="/empresasLista" element={<EmpresasLista/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
