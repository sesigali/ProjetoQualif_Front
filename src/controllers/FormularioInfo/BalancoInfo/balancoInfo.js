import React, { useState } from "react";

export default function BalancoInfo() {

    const [balanco, setBalanco] = useState('');
    //const [docRecuperacao, setDocRecuperacao] = useState('');
    //const [showDocRecuperacao , setShowDocRecuperacao] = useState(false);

    const handleBalancoChange = (e)=>{
        setBalanco(e.target.value);
        //setShowDocRecuperacao(e.target.value === 'positiva');
    };

    // const handleDocRecuperacaoChange = (e)=>{
    //     setDocRecuperacao(e.target.value);
    // };

    const handleSubmit = (e) =>{
        e.preventDefault();

        // const resultadoCertidao = certidao === 'positiva' ? {docRecuperacao} : docRecuperacao;

        // console.log('Resultado:', resultadoCertidao);
    }

    return(
        <div>
            <h1>Balanço Patrimonial</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* validar balanço */}
                    <h3>Balanço está em conformidade com a lei?</h3>
                    <label>
                        <input type="radio" value="sim"
                        checked={balanco === 'sim'} 
                        onChange={handleBalancoChange}/>Sim
                    </label>

                    <label>
                        <input type="radio" value="não"
                        checked={balanco === 'não'} 
                        onChange={handleBalancoChange} />Não
                    </label>
                </div>

                <input className="" type="submit" value="Anexar Balanço Patrimonial" />
            </form>
        </div>        

    )
}