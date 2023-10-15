import React, {useState} from "react";

export default function IndiceInfo() {

    const [ativoCirculante, setAtivoCirculante] = useState(null);
    const [ativoRealizavelLongoPrazo, setAtivoRealizavelLongoPrazo] = useState(null);
    const [ativoTotal, setAtivoTotal] = useState(null);
    const [passivoCirculante, setPassivoCirculante] = useState(null);
    const [passivoNaoCirculante, setPassivoNaoCirculante] = useState(null);
    const [liquidezGeral, setLiquidezGeral] = useState(null);
    const [solvenciaGeral, setSolvenciaGeral] = useState(null);
    const [liquidezCorrente, setLiquidezCorrente] = useState(null);

    const calculate = () => {
      setLiquidezGeral(((ativoCirculante + ativoRealizavelLongoPrazo) / ( passivoCirculante + passivoNaoCirculante)).toFixed(2));
      setSolvenciaGeral(((ativoTotal)/(passivoCirculante + passivoNaoCirculante)).toFixed(2));
      setLiquidezCorrente(((ativoCirculante) / (passivoCirculante)).toFixed(2));
      
    };
    

    return (
        <div className="">
          <h1>Índices Financeiros</h1>
          <div>
            <label>Ativo Circulante:</label>
            <input
              type="number"
              value={ativoCirculante}
              onChange={(e) => setAtivoCirculante(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Ativo Realizável a Longo Prazo:</label>
            <input
              type="number"
              value={ativoRealizavelLongoPrazo}
              onChange={(e) => setAtivoRealizavelLongoPrazo(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Ativo Total:</label>
            <input
              type="number"
              value={ativoTotal}
              onChange={(e) => setAtivoTotal(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Passivo Circulante:</label>
            <input
              type="number"
              value={passivoCirculante}
              onChange={(e) => setPassivoCirculante(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Passivo Não Circulante:</label>
            <input
              type="number"
              value={passivoNaoCirculante}
              onChange={(e) => setPassivoNaoCirculante(parseFloat(e.target.value))}
            />
          </div>
          <button onClick={calculate}>Calcular</button>
          <div>
            <p>Liquidez Geral: {liquidezGeral }</p>
            <p>Solvência Geral: {solvenciaGeral}</p>
            <p>Liquidez Corrente: {liquidezCorrente}</p>
          </div>
        </div>
      );
  
}
