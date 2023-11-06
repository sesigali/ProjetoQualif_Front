import React, { useState, useEffect } from "react";
//import IndiceInfo from "../IndiceInfo/indiceInfo";
import PatrimonioLiquido from "../PatrimonioLiqInfo/patrimonioLiqInfo";
import CompromissosAssumidosInfo from "../CompromissoInfo/compromissoInfo";
import axios from "axios";

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
  const [indiceResult, setIndiceResult] = useState("");
  //const initialValue = 0; // Substitua 0 pelo valor inicial desejado
  const [compromissosAssumidos, setCompromissosAssumidos] = useState("");
  const [erro, setErro] = useState(null);
  const [ultimoCadastro, setUltimoCadastro] = useState({
    valorEstimadoContrato: '',
  });


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
  useEffect(() => {
    setErro(null); // Limpa o erro a cada nova avaliação
    //setErro(erro); 

    // Verifique se valorEstimadoContrato foi fornecido e é um número válido
    if (!ultimoCadastro.valorEstimadoContrato || isNaN(ultimoCadastro.valorEstimadoContrato)) {
      setErro("Por favor, forneça valor válido para a Valor Estimado Contrato.");
      return;
    }
    
    // Converte o valor estimado para número
    const valorEstimadoNum = parseFloat(ultimoCadastro.valorEstimadoContrato);

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
    const ultrapassaValor = parseFloat(umDozeAvosValue) > parseFloat(valorEstimadoNum);

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
  }, [ultimoCadastro.valorEstimadoContrato, capitalGiro, ativoCirculante, passivoCirculante, patrimonioLiquido, compromissosAssumidos]);

  return (
    <div>
      <PatrimonioLiquido valorEstimadoContrato={ultimoCadastro.valorEstimadoContrato} />
      <hr />
      <h1 className="title-info">Complementação da Qualificação Econômico-Financeira</h1>
      <form>
        <p>Comprovação de possuir Capital Circulante Líquido (CCL) ou Capital de Giro <br>
        </br>(Ativo Circulante - Passivo Circulante) de, no mínimo, 16,66% (dezesseis inteiros <br>
        </br> e sessenta e seis centésimos por cento) do valor estimado do contrato.</p>
        
          {/* trazer valor do indiceInfo*/}
        <div className="complInfo">
          <label>Ativo Circulante: R$ {ativoCirculante.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</label>
          {/* trazer valor do indiceInfo*/}
        </div>
        <div className="complInfo">
          <label>Passivo Circulante: R$ {passivoCirculante.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</label>
        </div>
          {/* digitar valor */}
        <div className="complInfo">
          <label>Capital Circulante Líquido (CCL) ou Capital de Giro: R$ {ccl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</label>
        </div>
        <div className="complInfo">
          <label>Valor Estimado do Contrato: R$ {ultimoCadastro.valorEstimadoContrato.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</label>
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
            <p>A Declaração de Compromissos Assumidos deve informar que 1/12 (um doze avos) <br>
            </br> dos contratos firmados pela licitante não é superior ao Patrimônio Líquido da licitante </p>
          </div>

        </div>
        {umDozeAvos && (
          <div>
            <p>1/12 dos Compromissos Assumidos: R$ {umDozeAvos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        )}
        {indiceResult && (
          <div>
            <p><h4>Resultados</h4></p>
            <p>Requisito mínimo 16,66% do valor estimado: R$ {indiceResult.requisitoMinimo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p>Atende aos Requisitos: {indiceResult.atendeRequisitos ? "Sim" : "Não"}</p>
            <p>{/**VERIFICAR OS ITENS DE 16,66% E 1/12, POIS NAO ESTÃO BATENDO COM O REQUISITO MÍNIMO */}</p>
            <p>Ultrapassa o 1/12 é maior que valor estimado: {indiceResult.ultrapassaValor ? "Sim" : "Não"}</p>
          </div>
        )}
      </form>
      <hr />
      <CompromissosAssumidosInfo compromissosAssumidos={compromissosAssumidos}/>
    </div>
  );
}
