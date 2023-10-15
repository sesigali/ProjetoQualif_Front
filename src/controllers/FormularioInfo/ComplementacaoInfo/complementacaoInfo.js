import React, { useState, useEffect } from "react";

export default function CompromissosAssumidosInfo({
  compromissosAssumidos,
}) {
  const [receitaBruta, setReceitaBruta] = useState(null);
  const [declaracao, setDeclaracao] = useState(null);
  const [dre, setDre] = useState(null);
  const [divergencia, setDivergencia] = useState(null);
  const [temJustificativa, setTemJustificativa] = useState(false);

  // Função para lidar com o upload da declaração
  const handleDeclaracaoUpload = (e) => {
    const file = e.target.files[0]; // Obtém o arquivo do evento de upload
    setDeclaracao(file); // Atualiza o estado com o arquivo de declaração
  };

  // Função para lidar com o upload da DRE
  const handleDreUpload = (e) => {
    const file = e.target.files[0]; // Obtém o arquivo do evento de upload
    setDre(file); // Atualiza o estado com o arquivo da DRE
  };

  useEffect(() => {
    if (!receitaBruta || isNaN(receitaBruta) || !compromissosAssumidos || isNaN(compromissosAssumidos)) {
      return;
    }

    // Fórmula para calcular a divergência percentual
    const divergenciaValue = ((receitaBruta - compromissosAssumidos) / compromissosAssumidos) * 100;
    
    setDivergencia(divergenciaValue);

    // Verifique se a divergência é maior a 10%
    if (Math.abs(divergenciaValue) > 10) {
      setTemJustificativa(true);
    } else {
      setTemJustificativa(false);
    }
  }, [receitaBruta, compromissosAssumidos]);

  return (
    <div>
      <h1>Compromissos Assumidos</h1>
      <form>
        <div>
          <h3>Compromissos Assumidos:</h3>
          <span>{compromissosAssumidos}</span>
        </div>
        <div>
          <h3>Receita Bruta:</h3>
          <input
            type="number"
            value={receitaBruta}
            onChange={(e) => setReceitaBruta(e.target.value)}
          />
        </div>
        <div>
          <h3>Divergência Percentual:</h3>
          <span>{divergencia}</span>
        </div>
        {temJustificativa && (
          <div>
            <h3>Empresa encaminhou justificativa para Receita Bruta superior ou inferior a 10%?</h3>
            <label>
              <input
                type="radio"
                value="sim"
                checked={temJustificativa}
                onChange={() => setTemJustificativa(true)}
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                value="não"
                checked={!temJustificativa}
                onChange={() => setTemJustificativa(false)}
              />
              Não
            </label>
          </div>
        )}
        <div>
          <h3>Anexar Declaração de Compromissos Assumidos:</h3>
          <input
            type="file"
            onChange={handleDeclaracaoUpload}
          />
        </div>
        <div>
          <h3>Anexar DRE:</h3>
          <input
            type="file"
            onChange={handleDreUpload}
          />
        </div>
        <input className="" type="submit" value="Anexar" />
      </form>
    </div>
  );
  //ver sobre botão <input className="" type="submit" value="Anexar" />
}
