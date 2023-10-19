import React, { useState } from "react";

export default function BalancoInfo() {

    const [balanco, setBalanco] = useState('');
    const [anexo, setAnexo] = useState(null);
    
    const handleBalancoChange = (e)=>{
        setBalanco(e.target.value);
        
    };

    const handleAnexoChange = (e) => {
        const file = e.target.files[0];
        setAnexo(file);
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

                <div className="label-balancoInfo">
                    <label className="anexo">Anexar Balanço Patrimonial: </label><input className="anexos" type="file"
                    onChange={handleAnexoChange} />
                </div>                
            </form>
        </div>        

    )
}