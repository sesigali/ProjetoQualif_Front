import React, { useState, useEffect } from "react";
import axios from "axios";
//import PatrimonioLiquido from "../PatrimonioLiqInfo/patrimonioLiqInfo";
import CompromissosAssumidosInfo from "../CompromissoInfo/compromissoInfo";

export default function ComplementacaoInfo({
  valorEstimadoContrato,
  ativoCirculante,
  passivoCirculante,
  patrimonioLiquido,
}) {
  // Variáveis de estado
  const [capitalGiro, setCapitalGiro] = useState("");
  const [ccl, setCcl] = useState("");
  const [umDozeAvos, setUmDozeAvos] = useState("");
  const [txCclValorEstimado, settxCclValorEstimado] = useState("");
  const [indiceResult, setIndiceResult] = useState("");
  const [compromissosAssumidos, setCompromissosAssumidos] = useState("");
  const [erro, setErro] = useState(null);
  const [ultimoCadastro, setUltimoCadastro] = useState({ valorEstimadoContrato: '' });

  // Função para buscar os dados mais recentes quando o componente é montado
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

  // Calcular valores quando as dependências mudam
  useEffect(() => {
    setErro(null);

    if (!ultimoCadastro.valorEstimadoContrato || isNaN(ultimoCadastro.valorEstimadoContrato)) {
      setErro("Por favor, forneça um valor válido para o Valor Estimado do Contrato.");
      return;
    }

    const patrimonioLiquidoNum = parseFloat(patrimonioLiquido);
    const valorEstimadoNum = parseFloat(ultimoCadastro.valorEstimadoContrato);
    const requisitoMinimo = (16.66 / 100) * valorEstimadoNum;
    const cclValue = parseFloat(ativoCirculante) - parseFloat(passivoCirculante);
    const taxaEmpresaCclContrato = (cclValue / valorEstimadoNum) * 100;
    const umDozeAvosIndice = parseFloat(compromissosAssumidos) / 12;
    const umDozeAvosValue = (parseFloat(patrimonioLiquidoNum) / parseFloat(compromissosAssumidos)) * 12;
    const ultrapassaValor = parseFloat(umDozeAvosIndice) > parseFloat(patrimonioLiquidoNum);
    const atendeRequisitos = cclValue >= requisitoMinimo;

    setCapitalGiro(atendeRequisitos);
    setCcl(cclValue);
    setUmDozeAvos(umDozeAvosIndice);
    settxCclValorEstimado(taxaEmpresaCclContrato);

    console.log("umDozeAvosIndice", umDozeAvosIndice);
    console.log("umDozeAvosValue", umDozeAvosValue);
    console.log("ultrapassaValor", ultrapassaValor);
    console.log("patrimonio", patrimonioLiquidoNum);

    setIndiceResult({
      requisitoMinimo,
      atendeRequisitos,
      umDozeAvosValue,
      ultrapassaValor,
      patrimonioLiquido,
      patrimonioLiquidoNum,
      txCclValorEstimado,
    });
  }, [ultimoCadastro.valorEstimadoContrato, capitalGiro, ativoCirculante, passivoCirculante, patrimonioLiquido, compromissosAssumidos]);

  return (
    <div>
      {/* Renderizar o componente PatrimonioLiquido */}
      <hr />
      <h1 className="title-info">Complementação da Qualificação Econômico-Financeira</h1>
      <form>
        <p>Comprovação de possuir Capital Circulante Líquido (CCL) ou Capital de Giro <br>
        </br>(Ativo Circulante - Passivo Circulante) de, no mínimo, 16,66% (dezesseis inteiros <br>
        </br> e sessenta e seis centésimos por cento) do valor estimado do contrato.</p>

        {/* <div className="complInfo">
          <label>Ativo Circulante: R$ {ativoCirculante.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</label>
        </div>
        <div className="complInfo">
          <label>Passivo Circulante: R$ {passivoCirculante.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</label>
        </div> */}
        {/* pode tirar essa parte de cima */}
        <div className="complInfo">
          {/* Exibir "Indefinido" se o valor de ccl estiver vazio ou indefinido */}
          <label>Capital Circulante Líquido (CCL) ou Capital de Giro: R$ {isNaN(ccl) ? "Indefinido" : ccl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</label>        </div>
        <div className="complInfo">
          <label>Valor Estimado do Contrato: R$ {ultimoCadastro.valorEstimadoContrato.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</label>
        </div>
        <div className="complInfo">
          <label>Compromissos Assumidos:</label>
          <input
            type="number"
            value={compromissosAssumidos}
            onChange={(e) => setCompromissosAssumidos(e.target.value)}
          />

          <div className="complInfo">
            <label>Total de Capital de Giro estimado sobre o valor da contratação: {isNaN(txCclValorEstimado) ? "Indefinido" : txCclValorEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</label>
          </div>

          {/* <div>
            <p>A Declaração de Compromissos Assumidos deve informar que 1/12 (um doze avos) <br>
            </br> dos contratos firmados pela licitante não é superior ao Patrimônio Líquido da licitante </p>
          </div> */}

        </div>
        
        {indiceResult && (
          <div>
            <p><h4>Resultados</h4></p>
            <p>Requisito mínimo CCL 16,66% do valor estimado: R$ {indiceResult.requisitoMinimo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p>Taxa da empresa de CCL sobre valor estimado: {isNaN(indiceResult.txCclValorEstimado) ? "Indefinido" :  indiceResult.txCclValorEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %</p>
            <p>Atende aos Requisitos: <span className={indiceResult.atendeRequisitos ? "texto-azul" : "texto-vermelho"}>{indiceResult.atendeRequisitos ? "Sim" : "Não"}</span></p>
            <hr />
            <div>
              <p>A Declaração de Compromissos Assumidos deve informar que 1/12 (um doze avos) <br>
              </br> dos contratos firmados pela licitante não é superior ao Patrimônio Líquido da licitante </p>
            </div>
            <div className="complInfo">
          <label>Compromissos Assumidos:</label>
          <input
            type="number"
            value={compromissosAssumidos}
            onChange={(e) => setCompromissosAssumidos(e.target.value)}
            /></div>
            <p>1/12 do valor dos compromissos assumidos ultrapassa o Patrimonial Líquido: <span className={indiceResult.ultrapassaValor ? "texto-vermelho" : "texto-azul"}>{indiceResult.ultrapassaValor ? "Sim" : "Não"}</span></p>
            {indiceResult.ultrapassaValor}
            {indiceResult.atendeRequisitos}
            <p>Patrimonial Líquido: R$ {indiceResult.patrimonioLiquidoNum}</p>
            <p>1/12 dos Compromissos Assumidos: R$ {isNaN(umDozeAvos) ? "Indefinido" : umDozeAvos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        )}
      </form>
      <hr />
      {/* Renderizar o componente CompromissosAssumidosInfo */}
      <CompromissosAssumidosInfo compromissosAssumidos={compromissosAssumidos} />
    </div>
  );
}