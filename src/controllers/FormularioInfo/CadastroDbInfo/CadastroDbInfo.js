import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/formStyle.css';

export default function CadastroDbIndo({
  idEmpresa,
  docRecuperacaoCertidao,
  certidaoNaturezaCertidao,
  anexoCertidao,
  balancoConfLeiBalanco,
  anexoBalanco,
  ativoCirculanteIndice,
  ativoReaLongoPrazoIndice,
  ativoTotalIndice,
  passivoCirculanteIndice,
  passivoNaoCirculanteIndice,
  patrimonioLiquidoIndice,
  compromissosAssumidos,
  receitaBrutaCompromisso,
  declaracaoCompromisso,
  dreCompromisso,
  justRecuperacaoCompromisso,
}) {

const [mensagem, setMensagem] = useState(null);

const enviarTodasAsInformacoes = async () => {
  await handleCadastroCertidao();
  await handleCadastroBalanco();
  await handleCadastroIndice();
  await handleCadastroComplementacao();
  await handleCadastroCompromissos();
  setMensagem('Todas as informações foram enviadas com sucesso!');
};

//Certidao
const handleCadastroCertidao = async () => {

  const certidaos = {
    planoRecuperacao: docRecuperacaoCertidao,
    naturezaCertidao: certidaoNaturezaCertidao,
    certidaoFalencia: anexoCertidao,
    idEmpresa: idEmpresa,
  };

  try {
    // Adicione a lógica para enviar os certidaos para o backend
    console.log('DaBD', certidaos);
    const response = await axios.post('http://localhost:8888/certidao/adicionar', certidaos);
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
};

//Balanço
const handleCadastroBalanco = async (event) => {

  const balancos = {
    conformidadeLei: balancoConfLeiBalanco,
    balanco: anexoBalanco,
    idEmpresa: idEmpresa,
  };

  try {
    // Adicione a lógica para enviar os compromissos para o backend
    console.log('DaBD', balancos);
    const response = await axios.post('http://localhost:8888/balanco/adicionar', balancos);
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
};

//Indices
const handleCadastroIndice = async (event) => {

  const indices = {
    ativoCirculante: ativoCirculanteIndice,
    ativoReaLongoPrazo: ativoReaLongoPrazoIndice,
    ativoTotal: ativoTotalIndice,
    passivoCirculante: passivoCirculanteIndice,
    passivoNaoCirculante: passivoNaoCirculanteIndice,
    patrimonioLiquido: patrimonioLiquidoIndice,
    idEmpresa: idEmpresa,
  };

  try {
    // Adicione a lógica para enviar os compromissos para o backend
    console.log('DaBD', indices);
    const response = await axios.post('http://localhost:8888/indice/adicionar', indices);
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
};

//Complementação
const handleCadastroComplementacao = async (event) => {
  
  const complementacaos = {
    comprAssumidos: compromissosAssumidos,
    idEmpresa: idEmpresa,
  };

  try {
    // Adicione a lógica para enviar os complementacaos para o backend
    console.log('DaBD', complementacaos);
    const response = await axios.post('http://localhost:8888/complementacao/adicionar', complementacaos);
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
};

//Compromissos
const handleCadastroCompromissos = async (event) => {
  
  const compromissos = {
    receitaBruta: receitaBrutaCompromisso,
    declaracaoCompr: declaracaoCompromisso,
    dre: dreCompromisso,
    justificativa: justRecuperacaoCompromisso,
    idEmpresa: idEmpresa,
  };

  try {
    // Adicione a lógica para enviar os compromissos para o backend
    console.log('DaBD', compromissos);
    const response = await axios.post('http://localhost:8888/compromisso/adicionar', compromissos);
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
};

const handleSubmit1 = async (event) => {
  event.preventDefault();

  await enviarTodasAsInformacoes();

  // Adicione lógica adicional após o envio de todas as informações, se necessário.
  //setMensagem('Todas as informações foram enviadas com sucesso!');
};

  return (
    <div>
      <div>
        <h2>Informações na Tela</h2>
        <p>ID da Empresa: {idEmpresa}</p>
        <p>Documento Recuperação Certidão: {docRecuperacaoCertidao}</p>
        <p>Certidão Natureza Certidão: {certidaoNaturezaCertidao}</p>
        <p>Balanço em Conformidade com a Lei: {balancoConfLeiBalanco}</p>
        <p>Ativo Circulante Índice: {ativoCirculanteIndice}</p>
        <p>Ativo Realizável a Longo Prazo Índice: {ativoReaLongoPrazoIndice}</p>
        <p>Ativo Total: {ativoTotalIndice}</p>
        <p>passivoCirculanteIndice: {passivoCirculanteIndice}</p>
        <p>passivoNaoCirculanteIndice: {passivoNaoCirculanteIndice}</p>
        <p>patrimonioLiquidoIndice: {patrimonioLiquidoIndice}</p>
        <p>compromissosAssumidos: {compromissosAssumidos}</p>
        <p>receitaBrutaCompromisso: {receitaBrutaCompromisso}</p>
        <p>justRecuperacaoCompromisso: {justRecuperacaoCompromisso}</p> 
      </div>

      <br />
      <br />
      <div className="container-button">
        <Link onSubmit={handleSubmit1} to={`/relatorioInfo/${idEmpresa}`}>
          <button className="save btn-empresaInfo" type="button">Salvar</button>
        </Link>

        <Link to="/">
          <button className="cancel btn-empresaInfo">Cancelar</button>
        </Link>
      </div>
      <br />
      <br />
    </div>
  );
}