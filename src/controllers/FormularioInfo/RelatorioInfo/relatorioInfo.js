import React, { useState, useEffect } from "react";
import '../RelatorioInfo/relatorioInfoStyle.css';
import Image from '../RelatorioInfo/img/Imagem.png'
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function RelatorioInfo() {

    const { idEmpresa } = useParams();
    const [empresa, setEmpresa] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8888/empresa/listarempresa/${idEmpresa}`)
            .then((response) => {
                // Verifica se a resposta não é null ou objeto vazio antes de atualizar o estado
                if (response.data !== null && Object.keys(response.data).length !== 0) {
                    setEmpresa(response.data);
                } else {
                    console.error('Nenhum dado encontrado para o ID da empresas:', idEmpresa);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados da empresas:', error);
            });
    }, [idEmpresa]);



    return (
        <div className="containerRelatorio">
            <div className="">
                <div className="relatorio">
                    <div className="relatorioInfo">
                        <img src={Image} alt="Imagem" className="imageRelatorio" />
                        <p className="tituloRelatorio">Relatório</p>
                    </div>
                    <hr className="linhahr" />

                    <p className="subtituloRelatorio">Empresa</p>
                    
                    <ul className="listaRelatorio">
                            <li className="descricao">Razão Social: <span className="span">{empresa.razaoSocial}</span></li>
                            <li className="descricao">CNPJ: <span className="span">{empresa.cnpj}</span> </li>
                            <li className="descricao">Contato da Empresa:  <span className="span">{empresa.contatoEmpresa}</span></li>
                            <li className="descricao">Número do pregão - Tipo de serviço: <span className="span">{empresa.tipoServico}</span></li>
                            <li className="descricao">Valor estimado do contrato: <span className="span">{empresa.valorEstimadoContrato}</span></li>
                        </ul>

                    <hr />
                    <br />
                    
                    <br></br>
                    <button className="print btn-empresaInfo">Imprimir</button>
                </div>

            </div>
        </div>

    )
}
