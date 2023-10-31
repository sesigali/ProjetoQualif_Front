import React, { useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function BalancoInfo() {

    const [balancoConfLei, setBalanco] = useState('');
    const [anexo, setAnexo] = useState(null);
    const location = useLocation();
    const idEmpresa = location.state.idEmpresa;

    const handleBalancoChange = (e)=>{
        setBalanco(e.target.value);
        
    };

    const handleAnexoChange = (e) => {
        const file = e.target.files[0];
        setAnexo(file);
    };

    const handleSubmit = (e) =>{
        //e.preventDefault();
        const formData = new FormData();
        formData.append('balancoConfLei', balancoConfLei);
        formData.append('anexo', anexo);
        formData.append('idEmpresa', idEmpresa);

        axios.post('/balanco/adicionar', formData)
            .then((response) => {
                if (response.status === 200) {
                    // Exibir uma mensagem de sucesso
                    alert('Balanço cadastrado com sucesso!');
                } else {
                    // Exibir uma mensagem de erro
                    alert('Ocorreu um erro ao cadastrar o balanço.');
                }
            })
            .catch((error) => {
                console.log(error);
            });
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
                        checked={balancoConfLei === 'sim'} 
                        onChange={handleBalancoChange}/>Sim
                    </label>

                    <label>
                        <input type="radio" value="não"
                        checked={balancoConfLei === 'não'} 
                        onChange={handleBalancoChange} />Não
                    </label>
                </div>

                <div className="label-balancoInfo">
                    <label className="anexo">Anexar Balanço Patrimonial: </label>
                    <input className="anexos" type="file" onChange={handleAnexoChange} />
                </div>                
                {/*<button type="submit">Enviar</button>*/}
            </form>
        </div>
    )
}