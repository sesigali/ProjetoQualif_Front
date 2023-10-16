import React, { useState } from "react";

export default function BalancoInfo() {

    const [balanco, setBalanco] = useState('');
    
    const handleBalancoChange = (e)=>{
        setBalanco(e.target.value);
        
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

    }

    return(
        <div>
            <h1 className="title-info">Balanço Patrimonial</h1>
            <form onSubmit={handleSubmit}>
                <div className="balancoInfo">
                    {/* validar balanço */}
                    <h3 className="sub-title">Balanço está em conformidade com a lei?</h3>
                    <label className="label-balancoInfo">
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

                <input className="anexos" type="submit" value="Anexar Balanço Patrimonial" />
            </form>
        </div>        

    )
}