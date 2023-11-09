import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/navbar/navbar";
import Footer from "../../../components/Footer/footer";
import CertidaoInfo from "../CertidaoInfo/certidaoInfo";
import BalancoInfo from "../BalancoInfo/balancoInfo";
//import ComplementacaoInfo from "../ComplementacaoInfo/complementacaoInfo";
//import CompromissosAssumidosInfo from "../CompromissoInfo/compromissoInfo";
import IndiceInfo from "../IndiceInfo/indiceInfo";
//import PatrimonioLiquido from "../PatrimonioLiqInfo/patrimonioLiqInfo";
import { Link } from "react-router-dom";
import axios from "axios";

export default function EmpresaInfo() {
    const [ultimoCadastro, setUltimoCadastro] = useState({
        idEmpresa: '',
        razaoSocial: '',
        cnpj: '',
        contatoEmpresa: '',
        tipoServico: '',
        valorEstimadoContrato: '',
    });
    
    useEffect(() => {
        async function fetchUltimoCadastro() {
            try {
                const response = await axios.get('http://localhost:8888/empresa/ultimoCadastro');
                const data = response.data;

                if (data) {
                    setUltimoCadastro(data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchUltimoCadastro();
    }, []);

    return (
        <div className="container">
            <Navbar />
            <Footer />
            <div className="container-form">
                <h1 className="title-info">Empresa</h1>
                {/* <p>ID: {ultimoCadastro.idEmpresa}</p> */}
                <p>Razão Social: {ultimoCadastro.razaoSocial}</p>
                <p>CNPJ: {ultimoCadastro.cnpj}</p>
                <p>Contato da empresa: {ultimoCadastro.contatoEmpresa}</p>
                <p>Tipo de Serviço e Número do pregão: {ultimoCadastro.tipoServico}</p>
                {/**Não pode por .toFixed(2) no final do valor estimado contrato q da PAUUUUU*/}
                <p>Valor estimado do Contrato: R$ {ultimoCadastro.valorEstimadoContrato.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <hr />
                <CertidaoInfo idEmpresa={ultimoCadastro.idEmpresa}/>
                <hr />
                <BalancoInfo />
                <hr />
                <IndiceInfo />
                <hr />
                {/*<PatrimonioLiquido valorEstimadoContrato={ultimoCadastro.valorEstimadoContrato} />*/}
                {/*<hr />
                <ComplementacaoInfo
                    ativoCirculante={ativoCirculante}
                    passivoCirculante={passivoCirculante}/>
                <CompromissosAssumidosInfo />*/}
                <br />
                <br />
                <div className="container-button">
                    <Link to="/relatorioInfo">
                        <button className="save btn-empresaInfo">Salvar</button>
                    </Link>
                    <Link to="/">
                        <button className="cancel btn-empresaInfo">Cancelar</button>
                    </Link>
                </div>
                <br />
                <br />
            </div>
        </div>
    );
}