import React, { useState, useEffect } from "react";
import '../style/relatorioInfoStyle.css'
import Navbar from "../../../components/Navbar/navbar/navbar";
import Footer from "../../../components/Footer/footer";
import Image from '../style/img/Imagem.png'
import axios from 'axios';

export default function RelatorioInfo({ idEmpresa }) {

    const [empresa, setEmpresa] = useState({});

    useEffect(() => {
        // Fazer uma chamada à sua API para obter os dados da empresa com base no ID.
        axios.get(`http://localhost:8888/listarempresa/id:/${idEmpresa}`)
          .then((response) => {
            setEmpresa(response.data);
          })
          .catch(error => {
            console.error('Erro ao buscar dados da empresa:', error);
          });
      }, [idEmpresa]);

    return (
        <div>
            <Navbar />
            <Footer />

            <div className="container">
                <div className="container-form">
                    <div>
                        <img src={Image} alt="Imagem" className="imageRelatorio" />
                        <p className="tituloRelatorio">Relatório</p>
                    </div>
                    <hr className="linhahr"/>

                    <p>Empresa</p>
                    <ul>
                        <li>Razão Social:{empresa.razaoSocial}</li>
                        <li>CNPJ:{empresa.cnpj}</li>
                        <li>Contado da Empresa:{empresa.contatoEmpresa}</li>
                    </ul>
                    <hr/>
                    <br/>
                    <p>Este relatório apresenta as informações relevantes sobre a empresa "{empresa.razaoSocial}" e sua qualificação econômico-financeira para participação em licitação do "{empresa.tipoServiço}". É importante ressaltar que a empresa deve fornecer todos os documentos e informações necessárias para atender aos requisitos da licitação.</p>

                    <br></br>
                    <button className="print btn-empresaInfo">Imprimir</button>
                </div>

            </div>

        </div>

    )
}