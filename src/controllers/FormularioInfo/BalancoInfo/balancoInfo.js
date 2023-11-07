import React, { useState } from "react";

export default function BalancoInfo() {

    const [balancoConfLei, setBalancoConfLei] = useState('');
    const [anexo, setAnexo] = useState(null);
    const [showAnexo, setShowAnexo] = useState(false);

    const handleBalancoChange = (e) => {
        setBalancoConfLei(e.target.value);
        setShowAnexo(e.target.value === 'sim');
        if (e.target.value == 'não') {
            alert('Você selecionou "Não" para Balanço em conformidade com a lei. Entre em contato com o pregoeiro para solicitar a documentação necessária ao licitante.');
        }
    };

    const handleAnexoChange = (e) => {
        const file = e.target.files[0];
        setAnexo(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const resultadoBalanco = {
            balancoConfLei,
            anexo
        };

        console.log('Resultado:', resultadoBalanco);
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
                            checked={balancoConfLei === 'sim'}
                            onChange={handleBalancoChange} />Sim
                    </label>

                    <label className="label-balancoInfo">
                        <input type="radio" value="não"
                            checked={balancoConfLei === 'não'}
                            onChange={handleBalancoChange} />Não
                    </label>
                </div>

                {showAnexo && (
                    <div>
                        {/* Anexar Balanço Patrimonial */}
                        <h3 className="sub-title">Anexar Balanço Patrimonial:</h3>
                        <label className="label-balancoInfo">
                            <input type="file"
                                onChange={handleAnexoChange} />
                        </label>
                    </div>
                )}
            </form>
        </div>
    )
}
