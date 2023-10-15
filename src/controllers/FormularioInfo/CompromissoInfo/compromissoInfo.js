import React, { useState, useEffect } from "react";

export default function ComplementacaoInfo({
  valorEstimadoContrato,
  ativoCirculante,
  passivoCirculante,
  patrimonioLiquido,
  compromissosAssumidos,
}) {
  const [capitalGiro, setCapitalGiro] = useState("");
  const [ccl, setCcl] = useState("");
  const [umDozeAvos, setUmDozeAvos] = useState("");
  const [indiceResult, setIndiceResult] = useState(null);

  useEffect(() => {
    // Verifique se valorEstimadoContrato foi fornecido e é um número válido
    if (!valorEstimadoContrato || isNaN(valorEstimadoContrato)) {
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
      <h1>Complementação da Qualificação Econômico-Financeira</h1>
      <form>
        <div>
          <h3>Ativo Circulante:</h3>
          <span>{ativoCirculante}</span>
        </div>
        <div>
          <h3>Passivo Circulante:</h3>
          <span>{passivoCirculante}</span>
        </div>
        <div>
          <h3>Capital Circulante Líquido (CCL) ou Capital de Giro:</h3>
          <span>{ccl}</span>
        </div>
        <div>
          <h3>Compromissos Assumidos:</h3>
          <input
            type="text"
            value={compromissosAssumidos}
            onChange={(e) => setCompromissosAssumidos(e.target.value)}
          />
        </div>
        {umDozeAvos && (
          <div>
            <h3>1/12 dos Compromissos Assumidos: {umDozeAvos}</h3>
          </div>
        )}
        {indiceResult && (
          <div>
            <h3>Resultados:</h3>
            <p>Requisito mínimo: {indiceResult.requisitoMinimo}</p>
            <p>Atende Requisitos: {indiceResult.atendeRequisitos ? "Sim" : "Não"}</p>
            <p>Ultrapassa o valor acima: {indiceResult.ultrapassaValor ? "Sim" : "Não"}</p>
          </div>
        )}
      </form>
    </div>
  );
}
