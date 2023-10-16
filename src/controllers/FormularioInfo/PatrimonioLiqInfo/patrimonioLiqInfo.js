import React, { useState, useEffect } from 'react';

export default function PatrimonioLiquido({ valorEstimadoContrato }) {
  const [patrimonioLiquido, setPatrimonioLiquido] = useState('');
  const [indiceResult, setIndiceResult] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setErro(null); // Limpa o erro a cada nova avaliação

    // Verifique se valorEstimadoContrato foi fornecido e é um número válido
    if (!valorEstimadoContrato || isNaN(valorEstimadoContrato)) {
      setErro('Por favor, forneça um valor válido para o Valor Estimado do Contrato.');
      return;
    }

    // Converte o valor estimado para número
    const valorEstimadoNum = parseFloat(valorEstimadoContrato);

    // Calcula o requisito mínimo de 10% do valor estimado
    const requisitoMinimo = (10 / 100) * valorEstimadoNum;

    // Verifica se o Patrimônio Líquido foi preenchido
    if (patrimonioLiquido !== '') {
      // Converte o Patrimônio Líquido para número
      const patrimonioLiquidoNum = parseFloat(patrimonioLiquido);

      // Verifica se o Patrimônio Líquido atende ao requisito mínimo
      const atendeRequisitos = patrimonioLiquidoNum >= requisitoMinimo;

      // Calcula a porcentagem em relação ao valor estimado
      const porcentagemPatrimonio = (patrimonioLiquidoNum / valorEstimadoNum) * 100;


      // Define o resultado no índice
      setIndiceResult({
        requisitoMinimo,
        atendeRequisitos,
        porcentagemPatrimonio,
      });
    }
  }, [valorEstimadoContrato, patrimonioLiquido]);

  return (
    <div>
      <h1>Patrimônio Líquido</h1>
      <div>
        <p>Valor Estimado do Contrato:</p>
        <span>{valorEstimadoContrato}</span>
      </div>
      <div>
        <p>Patrimônio Líquido:</p>
        <input
          type="number"
          step="0.01"
          value={patrimonioLiquido}
          onChange={(e) => setPatrimonioLiquido(e.target.value)}
        />
      </div>
      {indiceResult && (
        <div>
          <p>Resultados:</p>
          <p>Requisito mínimo: {indiceResult.requisitoMinimo} = 10%</p>
          <p>Atende Requisito: {indiceResult.atendeRequisitos ? "Sim" : "Não"}</p>
          <p>Taxa: {indiceResult.porcentagemPatrimonio}</p>
        </div>
      )}
    </div>
  );
}
