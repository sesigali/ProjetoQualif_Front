import React, { useState, useEffect } from "react";

export default function CompromissosAssumidosInfo({
  compromissosAssumidos,
}) {
  const [receitaBruta, setReceitaBruta] = useState(null);
  const [declaracao, setDeclaracao] = useState(null);
  const [dre, setDre] = useState(null);
  const [divergencia, setDivergencia] = useState(null);
  const [temJustificativa, setTemJustificativa] = useState(false);
  const [erro, setErro] = useState(null);


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
    setErro(null); // Limpa o erro a cada nova avaliação
    
    if (!receitaBruta || isNaN(receitaBruta) || !compromissosAssumidos || isNaN(compromissosAssumidos)) {
        setErro("Por favor, forneça valores válidos para a Receita Bruta e os Compromissos Assumidos.");
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
          <p>Compromissos Assumidos:</p>
          <span>{compromissosAssumidos}</span>
        </div>
        <div>
          <p>Receita Bruta:</p>
          <input
            type="number"
            value={receitaBruta}
            onChange={(e) => setReceitaBruta(e.target.value)}
          />
        </div>
        <div>
          <p>Divergência Percentual:</p>
          <span>{divergencia}</span>
        </div>
        {temJustificativa && (
          <div>
            <p>Empresa encaminhou justificativa para Receita Bruta superior ou inferior a 10%?</p>
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
        <br></br>
        <div>
          <p>Anexar Declaração de Compromissos Assumidos:</p>
          <input
            type="file"
            onChange={handleDeclaracaoUpload}
          />
        </div>
        <div>
          <p>Anexar DRE:</p>
          <input
            type="file"
            onChange={handleDreUpload}
          />
        </div>
      </form>
    </div>
  );
}
