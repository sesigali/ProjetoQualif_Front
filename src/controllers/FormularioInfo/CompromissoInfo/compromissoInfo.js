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
  const [justificativaRecuperacao, setJustificativaRecuperacao] = useState("não"); // Adicione essa variável de estado

  // Função para lidar com o upload da declaração
  const handleDeclaracaoUpload = (e) => {
    const file = e.target.files[0];
    setDeclaracao(file);
  };

  // Função para lidar com o upload da DRE
  const handleDreUpload = (e) => {
    const file = e.target.files[0];
    setDre(file);
  };

  // Função para lidar com a seleção de "Sim" ou "Não" na justificativa
  const handleJustificativaRecuperacaoChange = (e) => {
    setJustificativaRecuperacao(e.target.value);
  };

  useEffect(() => {
    setErro(null);

    if (!receitaBruta || isNaN(receitaBruta) || !compromissosAssumidos || isNaN(compromissosAssumidos)) {
      setErro("Por favor, forneça valores válidos para a Receita Bruta e os Compromissos Assumidos.");
      return;
    }

    const divergenciaValue = ((receitaBruta - compromissosAssumidos) / compromissosAssumidos) * 100;

    setDivergencia(divergenciaValue);

    if (Math.abs(divergenciaValue) > 10) {
      setTemJustificativa(true);
    } else {
      setTemJustificativa(false);
    }
  }, [receitaBruta, compromissosAssumidos]);

  return (
    <div>
      <h1 className="title-info">Compromissos Assumidos</h1>

      <p>Caso a diferença entre a receita bruta discriminada na Demonstração do Resultado do <br></br> Exercício (DRE) e a declaração apresentada seja maior que 10% (dez por cento) positivo <br></br> ou negativo em relação à receita bruta, o licitante deverá apresentar justificativas.</p>

      <form>
        <div className="compromissoInfo">
          <label>Compromissos Assumidos: R$ </label>
          <span>{compromissosAssumidos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="compromissoInfo">
          <label>Receita Bruta:</label>
          <input
            type="number"
            value={receitaBruta}
            onChange={(e) => setReceitaBruta(e.target.value)}
          />
        </div>
        <div className="compromissoInfo">
          <label>Divergência Percentual:</label>
          <span>{divergencia} %</span>
        </div>

        {temJustificativa && (
          <div>
          <h3 className="sub-title">Empresa encaminhou justificativa para Receita Bruta superior ou inferior a 10%?</h3>
          <label className="label-certidaoInfo">
            <input
              type="radio"
              value="sim"
              checked={justificativaRecuperacao === 'sim'}
              onChange={handleJustificativaRecuperacaoChange}
            />
            Sim
          </label>
          <label className="label-certidaoInfo">
            <input
              type="radio"
              value="não"
              checked={justificativaRecuperacao === 'não'}
              onChange={handleJustificativaRecuperacaoChange}
            />
            Não
          </label>
        </div>        
        )}

        <div className="compromissoInfo">
          <label className="anexo">Anexar Declaração de Compromissos Assumidos: </label>
          <input className="anexos"
            type="file"
            onChange={handleDeclaracaoUpload}
          />
        </div>
        <div className="compromissoInfo">
          <label className="anexo">Anexar DRE: </label>
          <input className="anexos"
            type="file"
            onChange={handleDreUpload}
          />
        </div>
      </form>
    </div>
  );
}