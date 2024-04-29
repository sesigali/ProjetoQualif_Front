import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/navbar/navbar";
import Footer from "../../../components/Footer/footer";
import CertidaoInfo from "../CertidaoInfo/certidaoInfo";
import axios from "axios";
import "../style/formStyle.css";
import "./empresaInfo.css"

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
                const response = await axios.get('http://191.252.202.159:8888/empresa/ultimoCadastro');
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
                <p>Número do pregão - Tipo de Serviço: {ultimoCadastro.tipoServico}</p>
                {/**Não pode por .toFixed(2) no final do valor estimado contrato q da PAUUUUU*/}
                <p>Valor estimado do Contrato: R$ {ultimoCadastro.valorEstimadoContrato.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <hr />
                <CertidaoInfo 
                    idEmpresa={ultimoCadastro.idEmpresa}
                    valorEstimadoContrato={ultimoCadastro.valorEstimadoContrato}
                />
                <hr />
            </div>
        </div>
    );
}


