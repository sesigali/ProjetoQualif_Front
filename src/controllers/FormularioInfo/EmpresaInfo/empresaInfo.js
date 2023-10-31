import React from "react";
import Navbar from "../../../components/Navbar/navbar-home/navbar";
import Footer from '../../../components/Footer/footer'
import CertidaoInfo from "../CertidaoInfo/certidaoInfo";
import BalancoInfo from "../BalancoInfo/balancoInfo";
import ComplementacaoInfo from "../ComplementacaoInfo/complementacaoInfo";
import CompromissosAssumidosInfo from "../CompromissoInfo/compromissoInfo";
import IndiceInfo from "../IndiceInfo/indiceInfo";
import PatrimonioLiquido from "../PatrimonioLiqInfo/patrimonioLiqInfo";
import '../style/formStyle.css'
import { Link } from 'react-router-dom';

export default function EmpresaInfo(formData) {


    return (
        <div className="container">
            <Navbar />
            <Footer />
            <div className="container-form">
                <h1 className="title-info">Empresa</h1>
                <p>Razão Social: {formData.razaoSocial}</p>
                <p>CNPJ: {formData.cnpj}</p>
                <p>Contato da empresa: {formData.contatoDaEmpresa}</p>
                <p>Tipo de Serviço e Número do pregão: {formData.tipoDeServico}</p>
                <p>Valor estimado do Contrato: {formData.valorEstimadoContrato}</p>
                <hr></hr>
                <CertidaoInfo />
                <hr></hr>
                <BalancoInfo />
                <hr></hr>
                <IndiceInfo />
                <hr></hr>
                <PatrimonioLiquido />
                <hr></hr>
                <ComplementacaoInfo />
                <hr></hr>
                <CompromissosAssumidosInfo />

                <br></br>
                <br></br>

                <div className="container-button">
                    <Link to='/relatorioInfo'>
                        <button className="save btn-empresaInfo">Salvar</button>
                    </Link>

                    {/* <button className="print btn-empresaInfo">Imprimir</button> */}

                    <Link to='/'>
                        <button className="cancel btn-empresaInfo">Cancelar</button>
                    </Link>

                </div>
                <br></br>
                <br></br>

            </div>
        </div>

    )
}

