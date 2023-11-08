import React, { useState, useEffect } from "react";
import axios from "axios";
import PatrimonioLiqInfo from "../PatrimonioLiqInfo/patrimonioLiqInfo";
import ComplementacaoInfo from "../ComplementacaoInfo/complementacaoInfo";

export default function IndiceInfo({
 // patrimonioLiquido,
}) {
  const [ativoCirculante, setAtivoCirculante] = useState("");
  const [ativoRealizavelLongoPrazo, setAtivoRealizavelLongoPrazo] = useState("");
  const [ativoTotal, setAtivoTotal] = useState("");
  const [passivoCirculante, setPassivoCirculante] = useState("");
  const [passivoNaoCirculante, setPassivoNaoCirculante] = useState("");
  const [liquidezGeral, setLiquidezGeral] = useState(null);
  const [solvenciaGeral, setSolvenciaGeral] = useState(null);
  const [liquidezCorrente, setLiquidezCorrente] = useState(null);
  {/**--------------- Patrimônio------------- */}
  // Estado para o valor do patrimônio líquido digitado
  const [patrimonioLiquido, setPatrimonioLiquido] = useState("");
  const [ultimoCadastro, setUltimoCadastro] = useState({ valorEstimadoContrato: '' });
  const [erro, setErro] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (/^(\d*[\.,]?\d*)$/.test(value) || value === "") {
      // Verifica se o valor é um número ou está vazio
      if (name === "ativoCirculante") setAtivoCirculante(value);
      if (name === "ativoRealizavelLongoPrazo") setAtivoRealizavelLongoPrazo(value);
      if (name === "ativoTotal") setAtivoTotal(value);
      if (name === "passivoCirculante") setPassivoCirculante(value);
      if (name === "passivoNaoCirculante") setPassivoNaoCirculante(value);

      // Calcula os índices automaticamente
      const ativoCirculanteValue = parseFloat(ativoCirculante.replace(",", ".")) || 0;
      const ativoRealizavelLongoPrazoValue = parseFloat(ativoRealizavelLongoPrazo.replace(",", ".")) || 0;
      const ativoTotalValue = parseFloat(ativoTotal.replace(",", ".")) || 0;
      const passivoCirculanteValue = parseFloat(passivoCirculante.replace(",", ".")) || 0;
      const passivoNaoCirculanteValue = parseFloat(passivoNaoCirculante.replace(",", ".")) || 0;
      //const patrimonioLiquidoValue = parseFloat(patrimonioLiquido.replace(",", ".")) || 0;


      const liquidezGeralResult =
        (ativoCirculanteValue + ativoRealizavelLongoPrazoValue) /
        (passivoCirculanteValue + passivoNaoCirculanteValue);

      const solvenciaGeralResult = ativoTotalValue / (passivoCirculanteValue + passivoNaoCirculanteValue);
      const liquidezCorrenteResult = ativoCirculanteValue / passivoCirculanteValue;

      if (!isNaN(liquidezGeralResult) && isFinite(liquidezGeralResult)) {
        setLiquidezGeral(liquidezGeralResult.toFixed(2));
      } else {
        setLiquidezGeral("Indefinido");
      }

      if (!isNaN(solvenciaGeralResult) && isFinite(solvenciaGeralResult)) {
        setSolvenciaGeral(solvenciaGeralResult.toFixed(2));
      } else {
        setSolvenciaGeral("Indefinido");
      }

      if (!isNaN(liquidezCorrenteResult) && isFinite(liquidezCorrenteResult)) {
        setLiquidezCorrente(liquidezCorrenteResult.toFixed(2));
      } else {
        setLiquidezCorrente("Indefinido");
      }
    }
  };

  {/**--------------- Patrimônio------------- */}
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

  }, [ultimoCadastro.valorEstimadoContrato, patrimonioLiquido]);

  return (
    <div className="">
      <h1 className="title-info">Índices Financeiros</h1>
      <div className="">
        <div className="indiceInfo">
          <label>Ativo Circulante:</label>
          <input
            type="text"
            name="ativoCirculante"
            value={ativoCirculante}
            onChange={handleInputChange}
          />
        </div>
        <div className="indiceInfo">
          <label>Ativo Realizável a Longo Prazo:</label>
          <input
            type="text"
            name="ativoRealizavelLongoPrazo"
            value={ativoRealizavelLongoPrazo}
            onChange={handleInputChange}
          />
        </div>
        <div className="indiceInfo">
          <label>Ativo Total:</label>
          <input
            type="text"
            name="ativoTotal"
            value={ativoTotal}
            onChange={handleInputChange}
          />
        </div>
        <div className="indiceInfo">
          <label>Passivo Circulante:</label>
          <input
            type="text"
            name="passivoCirculante"
            value={passivoCirculante}
            onChange={handleInputChange}
          />
        </div>
        <div className="indiceInfo">
          <label>Passivo Não Circulante:</label>
          <input
            type="text"
            name="passivoNaoCirculante"
            value={passivoNaoCirculante}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className='patrimonioInfo'>Patrimônio Líquido:</label>
          <input
            type="text"
            name="patrimonioLiquido"
            value={patrimonioLiquido}
            onChange={(e) => setPatrimonioLiquido(e.target.value)}
          />
      </div>
      </div>
      <div>
        <p>Liquidez Geral: {liquidezGeral || "Indefinido"}</p>
        <p>Solvência Geral: {solvenciaGeral || "Indefinido"}</p>
        <p>Liquidez Corrente: {liquidezCorrente || "Indefinido"}</p>
      </div>
      <hr />
      {/* ... prop para complementação*/}
      <PatrimonioLiqInfo 
        valorEstimadoContrato={ultimoCadastro.valorEstimadoContrato} 
        patrimonioLiquido={patrimonioLiquido}
      />
      <ComplementacaoInfo
        ativoCirculante={ativoCirculante}
        passivoCirculante={passivoCirculante}
        patrimonioLiquido={patrimonioLiquido}
      />
    </div>
  );
}