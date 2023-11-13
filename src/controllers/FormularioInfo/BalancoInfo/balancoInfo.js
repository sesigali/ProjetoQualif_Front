import React, { useState } from "react";
import axios from 'axios';

export default function BalancoInfo({ idEmpresa }) {
    const [formData, setFormData] = useState({
        balancoConfLei: '',
        anexo: '',
        idEmpresa: '',
    });

    const handleBalancoChange = (e) => {
        setFormData({ ...formData, balancoConfLei: e.target.value });
        if (e.target.value === 'não') {
            alert('Você selecionou "Não" para Balanço em conformidade com a lei. Entre em contato com o pregoeiro para solicitar a documentação necessária ao licitante.');
        }
    };

    const handleAnexoChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, anexo: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Adicione a lógica de validação conforme necessário

        const data = {
            conformidadeLei: formData.balancoConfLei,
            balanco: formData.anexo,
            idEmpresa: idEmpresa, // Substitua pelo ID apropriado da empresa
        };

        /* console.log('conformidadeLei', formData.balancoConfLei);
        console.log('balanco', formData.anexo);
        console.log('iDEmpresa', idEmpresa); */

        // Enviar dados para o backend
        enviarDadosParaBackend(data);
    }

    const enviarDadosParaBackend = (data) => {
        axios.post('http://localhost:8888/balanco/adicionar', data)
            .then((response) => {
                if (response.status === 200) {
                    return response.data; // Retorna a nova empresa criada
                }
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    return (
        <div>
            <h1 className="title-info">Balanço Patrimonial</h1>
            <form onSubmit={handleSubmit}>
                <div className="balancoInfo">
                    {/* Validar balanço */}
                    <h3 className="sub-title">Balanço está em conformidade com a lei?</h3>
                    <label className="label-balancoInfo">
                        <input type="radio" value="sim"
                            checked={formData.balancoConfLei === 'sim'}
                            onChange={handleBalancoChange} />Sim
                    </label>

                    <label className="label-balancoInfo">
                        <input type="radio" value="não"
                            checked={formData.balancoConfLei === 'não'}
                            onChange={handleBalancoChange} />Não
                    </label>
                </div>

                <div>
                    {/* Anexar Balanço Patrimonial */}
                    <h3 className="sub-title">Anexar Balanço Patrimonial:</h3>
                    <label className="label-balancoInfo">
                        <input type="file"
                            onChange={handleAnexoChange} />
                    </label>
                </div>

                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}
