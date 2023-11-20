import React, { useState, useEffect } from "react";
import '../RelatorioInfo/relatorioInfoStyle.css';
import Image from '../RelatorioInfo/img/Imagem.png'
import axios from 'axios';
import { useParams } from "react-router-dom";
//import PatrimonioLiqIndiceResultado from "./patrimonioLiqIndiceResultado";

export default function RelatorioInfo() {

    const { idEmpresa } = useParams();
    const [empresa, setEmpresa] = useState({});
    const [certidao, setCertidao] = useState({});
    const [balanco, setBalanco] = useState({});
    const [indice, setIndice] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchEmpresa();
                await fetchCertidao();
                //await fetchBalanco();
                await fetchIndice();
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData(); // Chama a função assíncrona imediatamente
    }, [idEmpresa]);

    const fetchEmpresa = async () => {
        const response = await axios.get(`http://localhost:8888/empresa/listarempresa/${idEmpresa}`);
        if (response.data !== null && Object.keys(response.data).length !== 0) {
            setEmpresa(response.data);
        } else {
            console.error('Nenhum dado encontrado para o ID da empresa:', idEmpresa);
        }
    };

    const fetchCertidao = async () => {
        const response = await axios.get(`http://localhost:8888/certidao/listarcertidao/${idEmpresa}`);
        if (response.data !== null && Object.keys(response.data).length !== 0) {
            setCertidao(response.data);
        } else {
            console.error('Nenhuma certidão encontrada para o ID da empresa:', idEmpresa);
        }
    };


    const fetchBalanco = async () => {
        const response = await axios.get(`http://localhost:8888/balanco/listarbalanco/${idEmpresa}`);
        if (response.data !== null && Object.keys(response.data).length !== 0) {
            setBalanco(response.data);
        } else {
            console.error('Nenhum balanço encontrado para o ID da empresa:', idEmpresa);
        }
    };

    const fetchIndice = async () => {
        const response = await axios.get(`http://localhost:8888/indice/listarindice/${idEmpresa}`);
        if (response.data !== null && Object.keys(response.data).length !== 0) {
            setIndice(response.data);
        } else {
            console.error('Nenhuma índice encontrada para o ID da empresa:', idEmpresa);
        }
    };


    //***INDICE FINANCEIRO***//
    const resultadoLiquidezGeral = ((indice.ativoCirculante + indice.ativoReaLongoPrazo) / (indice.passivoCirculante + indice.passivoNaoCirculante));

    const resultadoSolvenciaGeral = ((indice.ativoTotal) / (indice.passivoCirculante + indice.passivoNaoCirculante));

    const resultadoliquidezCorrente = ((indice.ativoCirculante) / (indice.passivoCirculante));


    //***PATRIMONIO LIQUIDO***//
    // Calcula o requisito mínimo de 10% do valor estimado contrato
    const requisitoMinimo = (10 / 100) * ((empresa.valorEstimadoContrato));

    // Verifica se o Patrimônio Líquido atende ao requisito mínimo
    const atendeRequisitos = ((indice.patrimonioLiquido)) >= requisitoMinimo;

    // Calcula a porcentagem em relação ao valor estimado
    const porcentagemPatrimonio = ((indice.patrimonioLiquido) / requisitoMinimo) * (100);

    //***COMPLEMENTACAO***//
    // Calcula CCL ou CG = (ativoCirculante - passivoCirculante)
    const capitalClCg = ((indice.ativoCirculante)-(indice.passivoCirculante));

    // Calcula o requisito mínimo de 16,66% do valor estimado do contrato
    const requisitoMinimoCcl = (16.66 / 100) * ((empresa.valorEstimadoContrato));

    // Traz a porcentagem do CCL ou CG = (ativoCirculante - passivoCirculante), dividido pelo valor estimado do contrato 
    const porcentagemTotalCg = (capitalClCg / (empresa.valorEstimadoContrato)) * (100);

    // Verifica se capital Cl e Cg (ativoCirculante - passivoCirculante) atende ao requisito mínimo do valor do contrato
    const atendeRequisitosCcl = capitalClCg >= requisitoMinimoCcl;

    // Traz a porcentagem da taxa da empresa CCL = (ativoCirculante - passivoCirculante), dividido pelo requisito minimo e multiplicado por 100 
    const porcentagemTaxaCcl = (capitalClCg / requisitoMinimoCcl) * (100);





    return (
        <div className="containerRelatorio">
            <div className="">
                <div className="relatorio">
                    <div className="relatorioInfo">
                        <img src={Image} alt="Imagem" className="imageRelatorio" />
                        <p className="tituloRelatorio">Relatório</p>
                    </div>

                    <hr className="linhahr" />

                    <div>
                        <p className="subtituloRelatorio">Empresa</p>

                        <ul className="listaRelatorio">

                            <li className="descricao">Razão Social: <span className="span">{empresa.razaoSocial}</span></li>
                            <li className="descricao">CNPJ: <span className="span">{empresa.cnpj}</span> </li>
                            <li className="descricao">Contato da Empresa:  <span className="span">{empresa.contatoEmpresa}</span></li>
                            <li className="descricao">Número do pregão - Tipo de serviço: <span className="span">{empresa.tipoServico}</span></li>
                            <li className="descricao">Valor estimado do contrato: <span className="span">R$ {empresa.valorEstimadoContrato}</span></li>
                        </ul>

                    </div>

                    <hr className="linhahr" />

                    <div>

                        <p className="subtituloRelatorio">Certidão de Falência/Recuperação Judicial
                        </p>

                        <ul className="listaRelatorio">

                            <li className="descricao">Certidão: <span className="span">{certidao.naturezaCertidao}</span></li>
                            <li className="descricao">Empresa encaminhou documento de acolhimento judicial: <span className="span">{certidao.planoRecuperacao}</span> </li>

                        </ul>

                    </div>

                    <hr className="linhahr" />

                    <div>
                        <p className="subtituloRelatorio">Balanço Patrimonial
                        </p>
                        <ul className="listaRelatorio">
                            <li className="descricao">Balanço está em conformidade com a lei: <span className="span">{balanco.conformidadeLei}Sim</span></li>
                        </ul>
                    </div>

                    <hr className="linhahr" />

                    <div>
                        <p className="subtituloRelatorio">Índices Financeiros
                        </p>
                        <ul className="listaRelatorio">
                            <li className="descricao">Ativo Circulante: <span className="span">{indice.ativoCirculante}</span></li>
                            <li className="descricao">Ativo Realizável a Longo Prazo: <span className="span"> {indice.ativoReaLongoPrazo}</span></li>
                            <li className="descricao">Ativo Total: <span className="span"> {indice.ativoTotal}</span></li>
                            <li className="descricao">Passivo Circulante: <span className="span"> {indice.passivoCirculante}</span></li>
                            <li className="descricao">Passivo Não Circulante: <span className="span"> {indice.passivoNaoCirculante}</span></li>
                            <li className="descricao">Patrimônio Líquido: <span className="span"> {indice.patrimonioLiquido}</span></li>
                        </ul>

                        <ul className="listaRelatorio">
                            <li className="descricao">Liquidez Geral: <span className="span">{resultadoLiquidezGeral.toFixed(2)}</span></li>

                            <li className="descricao">Solvência Geral: <span className="span">{resultadoSolvenciaGeral.toFixed(2)}</span></li>

                            <li className="descricao">Liquidez Corrente: <span className="span">{resultadoliquidezCorrente.toFixed(2)}</span></li>
                        </ul>

                    </div>

                    <hr className="linhahr" />

                    <div>
                        <p className="subtituloRelatorio">Patrimônio Líquido
                        </p>

                        <p>Comprovação de patrimônio líquido de 10% (dez por cento) do valor total estimado da contratação ou do item pertinente.</p>

                        <ul className="listaRelatorio">
                            <li className="descricao">Valor Estimado do Contrato: <span className="span">{empresa.valorEstimadoContrato}</span></li>
                            <li className="descricao">Patrimônio Líquido: <span className="span">{indice.patrimonioLiquido}</span></li>
                        </ul>

                        <h2 className="h2">Resultados</h2>
                        <ul className="listaRelatorio">
                            <li className="descricao">Requisito Mínimo de 10%: <span className="span">{requisitoMinimo}</span></li>
                            <li className="descricao">Atende ao Requisito: <span className= {atendeRequisitos ? "txt-azul" : "txt-vermelho"}>{atendeRequisitos ? "Sim" : "Não"}</span></li>
                            <li className="descricao">Taxa da Empresa: <span className="span">{porcentagemPatrimonio.toFixed(2)}% </span></li>
                        </ul>
                    </div>

                    <hr className="linhahr" />

                    <div>
                        <p className="subtituloRelatorio">Complementação da Qualificação Econômico-Financeira
                        </p>
                        <p>Comprovação de possuir Capital Circulante Líquido (CCL) ou Capital de Giro (Ativo Circulante - Passivo Circulante) de, no  mínimo, 16,66% (dezesseis inteiros e sessenta e seis centésimos por cento) do valor estimado do contrato.</p>

                        <ul className="listaRelatorio">
                            <li className="descricao">Capital Circulante Líquido (CCL) ou Capital de Giro: <span className="span">R$ {capitalClCg}</span></li>
                            <li className="descricao">Valor Estimado do Contrato: <span className="span">R${empresa.valorEstimadoContrato}</span></li>
                        </ul>

                        <h2 className="h2">Resultados</h2>
                        <ul className="listaRelatorio">
                            <li className="descricao">Requisito mínimo CCL 16,66% do valor estimado: <span className="span">{requisitoMinimoCcl}</span></li>
                            <li className="descricao">Total de Capital de Giro estimado sobre o valor da contratação: <span className="span">{porcentagemTotalCg.toFixed(2)}%</span></li>
                            <li className="descricao">Atende aos Requisitos: <span className= {atendeRequisitosCcl ? "txt-azul" : "txt-vermelho"}>{atendeRequisitosCcl ? "Sim" : "Não"}</span></li>
                            <li className="descricao">Taxa da empresa: <span className="span">{porcentagemTaxaCcl.toFixed(2)}%</span></li>
                        </ul>
                    </div>

                    {/* <span className= {atendeRequisitos ? "patrimonio-azul" : "patrimonio-vermelho"}>{atendeRequisitos ? "Sim" : "Não"}</span> */}

                    <hr />

                    <br></br>
                    <button className="print btn-empresaInfo" onClick={() => window.print()}>Imprimir</button>
                </div>

            </div>
        </div>

    )
}


// useEffect(() => {
//     axios.get(`http://localhost:8888/empresa/listarempresa/${idEmpresa}`)
//         .then((response) => {
//             if (response.data !== null && Object.keys(response.data).length !== 0) {
//                 setEmpresa(response.data);

//                 // Agora, vamos buscar as informações da certidão
//                 axios.get(`http://localhost:8888/certidao/listarcertidao/${idEmpresa}`)
//                     .then((certidaoResponse) => {
//                         if (certidaoResponse.data !== null && Object.keys(certidaoResponse.data).length !== 0) {
//                             setCertidao(certidaoResponse.data);
//                         } else {
//                             console.error('Nenhuma certidão encontrada para o ID da empresa:', idEmpresa);
//                         }
//                     })
//                     .catch(certidaoError => {
//                         console.error('Erro ao buscar dados da certidão:', certidaoError);
//                     });
//             } else {
//                 console.error('Nenhum dado encontrado para o ID da empresa:', idEmpresa);
//             }
//         })
//         .catch(error => {
//             console.error('Erro ao buscar dados da empresa:', error);
//         });
// }, [idEmpresa]);