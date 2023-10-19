import React, { useState, useEffect } from "react";
//import IndiceInfo from "../IndiceInfo/indiceInfo";

export default function ComplementacaoInfo({
  valorEstimadoContrato,
  ativoCirculante,
  passivoCirculante,
  patrimonioLiquido,
  //initialValue = 0,
  //compromissosAssumidos,
}) {
  const [capitalGiro, setCapitalGiro] = useState("");
  const [ccl, setCcl] = useState("");
  const [umDozeAvos, setUmDozeAvos] = useState("");
  const [indiceResult, setIndiceResult] = useState(null);
  //const initialValue = 0; // Substitua 0 pelo valor inicial desejado
  const [compromissosAssumidos, setCompromissosAssumidos] = useState(null);
  const [erro, setErro] = useState(null);


  useEffect(() => {
    setErro(null); // Limpa o erro a cada nova avaliação
    
    // Verifique se valorEstimadoContrato foi fornecido e é um número válido
    if (!valorEstimadoContrato || isNaN(valorEstimadoContrato)) {
      setErro("Por favor, forneça valor válido para a Valor Estimado Contrato.");
      return;
    }
    
    // Converte o valor estimado para número
    const valorEstimadoNum = parseFloat(valorEstimadoContrato);

    // Calcula o requisito mínimo de 16,66% do valor estimado
    const requisitoMinimo = (16.66 / 100) * valorEstimadoNum;

    // Verifica se o CCL atende ao requisito mínimo
    const atendeRequisitos = parseFloat(capitalGiro) >= requisitoMinimo;

    // Calcula o Capital de Giro
    const cclValue = parseFloat(ativoCirculante) - parseFloat(passivoCirculante);

    // Calcula 1/12 dos Compromissos Assumidos
    const umDozeAvosIndice =  parseFloat(compromissosAssumidos) / 12;
    
    const umDozeAvosValue = (parseFloat(patrimonioLiquido) / parseFloat(compromissosAssumidos)) * 12;

    // Verifica se ultrapassa o valor acima
    const ultrapassaValor = umDozeAvosValue > valorEstimadoNum;

    setCapitalGiro(atendeRequisitos);
    setCcl(cclValue);
    setUmDozeAvos(umDozeAvosIndice);

    // Define o resultado
    setIndiceResult({
      requisitoMinimo,
      atendeRequisitos,
      umDozeAvosValue,
      ultrapassaValor,
    });
  }, [valorEstimadoContrato, capitalGiro, ativoCirculante, passivoCirculante, patrimonioLiquido, compromissosAssumidos]);

  return (
    <div>
      <h1 className="title-info">Complementação da Qualificação Econômico-Financeira</h1>
      <form>
        <p>Comprovação de possuir Capital Circulante Líquido (CCL) ou Capital de Giro <br></br>(Ativo Circulante – Passivo Circulante) de, no mínimo, 16,66% (dezesseis inteiros <br></br> e sessenta e seis centésimos por cento) do valor estimado.</p>
        
          {/* trazer valor do indiceInfo*/}
        <div className="complInfo">
          <label>Ativo Circulante:{ativoCirculante}</label>
          {/*perguntar ao Danilo como buscar o valor o 
          ativo e passivo q será digita em "indiceInfo.js"
          
          As funções dos cálculos financeiros foram feitas no frontend, está certo?

          Documentação react
          control form 
          */}    

          {/* trazer valor do indiceInfo*/}
        </div>
        <div className="complInfo">
          <label>Passivo Circulante:{passivoCirculante}</label>
        </div>
          {/* digitar valor */}
        <div className="complInfo">
          <label>Capital Circulante Líquido (CCL) ou Capital de Giro:{ccl}</label>
        </div>
          {/* digitar valor */}
        <div className="complInfo">
          <label>Compromissos Assumidos:</label>
          <input
            type="number"
            value={compromissosAssumidos}
            onChange={(e) => setCompromissosAssumidos(e.target.value)}
          />

            {/* passar a função para retornar o calculo */}
          <div className="complInfo">
            <label>Total de Capital de Giro estimado sobre o valor da contratação: "retorna o valor %"</label>
          </div>

          <div>
            <p>A Declaração de Compromissos Assumidos deve informar que 1/12 (um doze avos) <br></br> dos contratos firmados pela licitante não é superior ao Patrimônio Líquido da licitante </p>
          </div>

          
          <p>"***RETORNAR 1/12***"</p>
          <p>"***RETORNAR SE ULTRAPASSA O VALOR***"</p>

        </div>
        {umDozeAvos && (
          <div>
            <p>1/12 dos Compromissos Assumidos: {umDozeAvos}</p>
          </div>
        )}
        {indiceResult && (
          <div>
            <p>Resultados:</p>
            <p>Requisito mínimo: {indiceResult.requisitoMinimo}</p>
            <p>Atende Requisitos: {indiceResult.atendeRequisitos ? "Sim" : "Não"}</p>
            <p>Ultrapassa o valor acima: {indiceResult.ultrapassaValor ? "Sim" : "Não"}</p>
          </div>
        )}
      </form>
    </div>
  );
}
