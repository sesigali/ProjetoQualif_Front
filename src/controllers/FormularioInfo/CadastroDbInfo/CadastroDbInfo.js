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
  const [formData] = useState({
    certidao: {
      columns: ['planoRecuperacao', 'naturezaCertidao', 'certidaoFalencia', 'idEmpresa'],
      data: {
        planoRecuperacao: docRecuperacaoCertidao,
        naturezaCertidao: certidaoNaturezaCertidao,
        certidaoFalencia: anexoCertidao,
        idEmpresa,
      },
    },
    balanco: {
      columns: ['conformidadeLei', 'balanco', 'idEmpresa'],
      data: {
        conformidadeLei: balancoConfLeiBalanco,
        balanco: anexoBalanco,
        idEmpresa,
      },
    },
    indice: {
      columns: [
        'ativoCirculante',
        'ativoReaLongoPrazo',
        'ativoTotal',
        'passivoCirculante',
        'passivoNaoCirculante',
        'patrimonioLiquido',
        'idEmpresa',
      ],
      data: {
        ativoCirculante: ativoCirculanteIndice,
        ativoReaLongoPrazo: ativoReaLongoPrazoIndice,
        ativoTotal: ativoTotalIndice,
        passivoCirculante: passivoCirculanteIndice,
        passivoNaoCirculante: passivoNaoCirculanteIndice,
        patrimonioLiquido: patrimonioLiquidoIndice,
        idEmpresa: idEmpresa,
      },
    },
    complementacao: {
      columns: ['comprAssumidos', 'idEmpresa'],
      data: {
        comprAssumidos: compromissosAssumidos,
        idEmpresa,
      },
    },
    compromisso: {
      columns: [
        'receitaBruta',
        'declaracaoCompr',
        'dre',
        'justificativa',
        'idEmpresa',
      ],
      data: {
        receitaBruta: receitaBrutaCompromisso,
        declaracaoCompr: declaracaoCompromisso,
        dre: dreCompromisso,
        justificativa: justRecuperacaoCompromisso,
        idEmpresa,
      },
    },
    //idEmpresa,
  });
  console.log('Estado Atual do Formulário1:', formData);
  console.log('Estado Atual do idEmpresa:', formData.idEmpresa);
  console.log('Estado Atual do balanco:', formData.balanco);
  console.log('Estado Atual do certidao:', formData.certidao);
  console.log('Estado Atual do indice:', formData.indice);
  console.log('Estado Atual do complementacao:', formData.complementacao);
  console.log('Estado Atual do balanco.conformidadeLei:', formData.balanco.conformidadeLei);

//--------------------------------------------------------------------------------------------
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
  setMensagem('Todas as informações foram enviadas com sucesso!');
};



//---------------------------------------------------------------------------------------------



  
/*   const handleFileChange = (e, section, name) => {
    const file = e.target.files[0];
    formData[section].data[name] = file;
    console.log(`Arquivo ${name} adicionado à seção ${section}:`, file);
  }; */

  const handleSubmit = async () => {
    try {
      console.log('Estado Atual do Formulário2:', formData);
      for (const key in formData) {
        const section = formData[key];
        const columns = section.columns;
        const data = section.data;

        const requestData = {};
        columns.forEach((column) => {
/*           if (data[column]) {
            requestData[column] = data[column];
          } else {
            console.error(`Valor vazio para ${column}`);
          } */
          
          requestData[column] = data[column];
        });
        console.log(`Dados que serão enviados para ${key}:`, requestData);


        //if (Object.values(requestData).every(value => value !== undefined && value !== '')) {
          const response = await axios.post(`http://localhost:8888/${key}/adicionar`, {
            ...requestData,
            //idEmpresa: formData.idEmpresa,
          });

          console.log(`Dados de ${key} enviados com sucesso!`, response);
        /* } else {
          console.error(`Erro ao enviar dados para ${key}: Parâmetros faltando ou vazios.`);
        } */
      /*
        const response = await axios.post(`http://localhost:8888/${key}/adicionar`, {
          ...requestData,
          idEmpresa: formData.idEmpresa,
        });

        console.log(`Dados de ${key} enviados com sucesso!`, response.data); */



      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
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
        <button className="save btn-empresaInfo" type="button" onClick={handleSubmit}>
          Salvar
        </button>

        <button type="button" onClick={handleSubmit1}>Enviar Todas as Informações</button>
        <div>{mensagem && <p>{mensagem}</p>}</div>

        <Link to="/">
          <button className="cancel btn-empresaInfo">Cancelar</button>
        </Link>
      </div>
      <br />
      <br />
    </div>
  );
}