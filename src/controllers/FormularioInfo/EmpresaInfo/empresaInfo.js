import React from "react";
import Navbar from "../../../components/Navbar/navbar-home/navbar";
import Footer from '../../../components/Footer/footer'
import CertidaoInfo from "../CertidaoInfo/certidaoInfo";
import BalancoInfo from "../BalancoInfo/balancoInfo";
import ComplementacaoInfo from "../CompromissoInfo/compromissoInfo";
import CompromissosAssumidosInfo from "../ComplementacaoInfo/complementacaoInfo";
//import IndiceInfo from "../IndiceInfo/indiceInfo";



export default function EmpresaInfo(formData) {
   
    
    return (
        <div className="">
            <Navbar />
            <Footer />
            <div>
                <h1>Empresa</h1>
                <p>Razão Social: {formData.razaoSocial}</p>
                <p>CNPJ: {formData.cnpj}</p>
                <p>Contato da empresa: {formData.contatoDaEmpresa}</p>
                <p>Tipo de Serviço e Número do pregão: {formData.tipoDeServico}</p>
                <p>Valor estimado do Contrato: {formData.valorEstimadoContrato}</p>
            </div>
            <br></br>
            <CertidaoInfo/>
            <br></br>
            <BalancoInfo/>
            <br></br>
            <ComplementacaoInfo/>
            <br></br>
            <CompromissosAssumidosInfo/>
        
            <br></br>
            
            
        </div>

    )
}

