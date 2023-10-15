import React, { useState } from "react";

const IndiceInfo = () => {
    const [ativoCirculante, setAtivoCirculante] = useState(null);
    const [ativoRealizavelLongoPrazo, setAtivoRealizavelLongoPrazo] = useState(null);
    const [ativoTotal, setAtivoTotal] = useState(null);
    const [passivoCirculante, setPassivoCirculante] = useState('');
    const [passivoNaoCirculante, setPassivoNaoCirculante] = useState('');
    const [liquidezGeral, setLiquidezGeral] = useState('');
    const [solvenciaGeral, setSolvenciaGeral] = useState('');
    const [liquidezCorrente, setLiquidezCorrente] = useState('');
    const calculate = () => {
      setLiquidezGeral((ativoCirculante + ativoRealizavelLongoPrazo) / ( passivoCirculante + passivoNaoCirculante));
    //   setSolvenciaGeral((ativoCirculante + ativoRealizavelLongoPrazo));
    //   setLiquidezCorrente(ativoCirculante / passivoCirculante);
    };

    return (
        <div className="">
          <h1>Índices Financeiros</h1>
          <div>
            <label>Ativo Circulante:</label>
            <input
              type="text"
              value={ativoCirculante}
              onChange={(e) => setAtivoCirculante(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Ativo Realizável a Longo Prazo:</label>
            <input
              type="text"
              value={ativoRealizavelLongoPrazo}
              onChange={(e) => setAtivoRealizavelLongoPrazo(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Ativo Total:</label>
            <input
              type="text"
              value={ativoTotal}
              onChange={(e) => setAtivoTotal(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Passivo Circulante:</label>
            <input
              type="text"
              value={passivoCirculante}
              onChange={(e) => setPassivoCirculante(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Passivo Não Circulante:</label>
            <input
              type="text"
              value={passivoNaoCirculante}
              onChange={(e) => setPassivoNaoCirculante(parseFloat(e.target.value))}
            />
          </div>
          <button onClick={calculate}>Calcular</button>
          <div>
            <p>Liquidez Geral: {liquidezGeral}</p>
            {/* <p>Solvência Geral: {solvenciaGeral}</p>
            <p>Liquidez Corrente: {liquidezCorrente}</p> */}
          </div>
        </div>
      );
  
}    

export default IndiceInfo;






            {/* export default function IndiceInfo() {

    const indexData = {

        ativoCirculante: '',
        ativoRealizavel: '',
        ativoTotal: '',
        passivoCirculante: '',
        passivoNaoCirculante: '',
    };

    const [InfoData, setInfoData ] = useState(indexData);
    const [liquidezGeral, setLiquidezGeral] = useState(0);
    
    const handleIndexChange = (e, name) =>{
        setInfoData({
            ...InfoData,
            [name]: e.target.value

        })
    }

    const calculate = () =>{
        (ativoCirculante + ativoRealizavel) / (passivoCirculante + passivoNaoCirculante);
        setLiquidezGeral(liquidezGeral);
    }

    return (
        <div>

            <div>
                <form>
                    <h1>Índice do Formulário</h1>
                    <div>
                        <label>Ativo Circulante</label>
                        <input className=''
                                type="text"
                                value={InfoData.ativoCirculante}
                                onChange={(e)=>{handleIndexChange(e, 'ativoCirculante')}}
                                 />
                    </div>

                    <div>
                        <label>Ativo Realizável a Longo Prazo:</label>
                        <input
                        type="text"
                        value={InfoData.ativoRealizavel}
                        onChange={(e)=>{handleIndexChange(e, 'ativoRealizavel')} }
                         />

                    </div>

                    <div>
                        <label>Ativo Total:</label>
                        <input
                        type="text"
                        value={InfoData.ativoTotal}
                        onChange={(e)=>{handleIndexChange(e, 'ativoTotal')}}
                         />

                    </div>

                    <div>
                        <label>Passivo Circulante:</label>
                        <input
                         type="text"
                         value={InfoData.passivoCirculante}
                         onChange={(e)=>{handleIndexChange(e, 'passivoCirculante')}}/>
                    </div>

                    <div>
                        <label>Passivo Não Circulante:</label>
                        <input
                        type="text"
                        value={InfoData.passivoNaoCirculante}
                        onChange={(e)=>{handleIndexChange(e, 'passivoNaoCirculante')}} />
                    </div>

                    <buton onClick={calculate}>Calcular</buton>
                    <div>
                        <p>Liquidez Geral: {liquidezGeral}</p>                  
                    </div>
                </form>
            </div>


        </div>

    )
} */}


