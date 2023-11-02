import React, { useState } from "react";
import axios from 'axios';

export default function CertidaoInfo() {
    const [certidao, setCertidao] = useState('');
    const [docRecuperacao, setDocRecuperacao] = useState('');
    const [showDocRecuperacao, setShowDocRecuperacao] = useState(false);
    const [anexo, setAnexo] = useState(null);

    const handleCertidaoChange = (e) => {
        setCertidao(e.target.value);
        setShowDocRecuperacao(e.target.value === 'positiva');
    };

    const handleDocRecuperacaoChange = (e) => {
        setDocRecuperacao(e.target.value);
    };

    const handleAnexoChange = (e) => {
        const file = e.target.files[0];
        setAnexo(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('certidao', certidao);
        formData.append('docRecuperacao', docRecuperacao);
        formData.append('anexo', anexo);

        // Enviar o formulário com o arquivo usando axios
        axios.post('/seu-endpoint-de-envio', formData)
            .then((response) => {
                if (response.status === 200) {
                    // Exibir uma mensagem de sucesso
                    alert('Certidão cadastrada com sucesso!');
                } else {
                    // Exibir uma mensagem de erro
                    alert('Ocorreu um erro ao cadastrar a certidão.');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1 className="title-info">Certidão</h1>
            <form onSubmit={handleSubmit}>
                <div className="certidaoInfo">
                    {/* Validar certidão */}
                    <h3 className="sub-title">Certidão é ?</h3>
                    <label className="label-certidaoInfo">
                        <input type="radio" value="positiva"
                            checked={certidao === 'positiva'}
                            onChange={handleCertidaoChange} />Positiva
                    </label>

                    <label className="label-certidaoInfo">
                        <input type="radio" value="negativa"
                            checked={certidao === 'negativa'}
                            onChange={handleCertidaoChange} />Negativa
                    </label>
                </div>

                {showDocRecuperacao && (
                    <div>
                        {/* Doc de recuperação judicial */}
                        <h3 className="sub-title">Empresa encaminhou documento de recuperação judicial?</h3>
                        <label className="label-certidaoInfo">
                            <input type="radio" value="sim"
                                checked={docRecuperacao === 'sim'}
                                onChange={handleDocRecuperacaoChange} />Sim
                        </label>

                        <label className="label-certidaoInfo">
                            <input type="radio" value="não"
                                checked={docRecuperacao === 'não'}
                                onChange={handleDocRecuperacaoChange} />Não
                        </label>
                    </div>
                )}

                <div className="label-certidaoInfo">
                    <h3 className="sub-title">Anexar Documentos:</h3>
                    <label className="anexo">
                        <input className="anexos"
                            type="file"
                            onChange={handleAnexoChange} />
                    </label>
                </div>
            </form>
        </div>
    )
}

/*import React, {useState} from "react";

export default function CertidaoInfo() {

    const [certidao, setCertidao] = useState('');
    const [docRecuperacao, setDocRecuperacao] = useState('');
    const [showDocRecuperacao , setShowDocRecuperacao] = useState(false);
    const [anexo, setAnexo] = useState(null);

    const handleCertidaoChange = (e)=>{
        setCertidao(e.target.value);
        setShowDocRecuperacao(e.target.value === 'positiva');
    };

    const handleDocRecuperacaoChange = (e)=>{
        setDocRecuperacao(e.target.value);
    };

    const handleAnexoChange = (e) => {
        const file = e.target.files[0];
        setAnexo(file);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        const resultadoCertidao = certidao === 'positiva' ? {docRecuperacao} : docRecuperacao;

        console.log('Resultado:', resultadoCertidao);
    }

    return (
        <div>
            <h1 className="title-info">Certidão</h1>
            <form onSubmit={handleSubmit}>
                <div className="certidaoInfo">
                    {/* validar certidão }
                    <h3 className="sub-title">Certidão é ?</h3>
                    <label className="label-certidaoInfo">
                        <input type="radio" value="positiva"
                        checked={certidao === 'positiva'} 
                        onChange={handleCertidaoChange}/>Positiva
                    </label>

                    <label className="label-certidaoInfo">
                        <input type="radio" value="negativa"
                        checked={certidao === 'negativa'} 
                        onChange={handleCertidaoChange} />Negativa
                    </label>
                </div>

                {showDocRecuperacao && (
                    <div>
                    {/* Doc de recuperação judicial }
                    <h3 className="sub-title">Empresa encaminhou documento de recuperação judicial?</h3>
                    <label className="label-certidaoInfo">
                        <input type="radio" value="sim"
                        checked={docRecuperacao === 'sim'} 
                        onChange={handleDocRecuperacaoChange}/>Sim
                    </label>

                    <label className="label-certidaoInfo">
                        <input type="radio" value="não"
                        checked={docRecuperacao === 'não'} 
                        onChange={handleDocRecuperacaoChange}/>Não
                    </label>

                </div>
                )}

                <div className="label-certidaoInfo"><label className="anexo">Anexar Documentos:</label>
                <input className="anexos" 
                type="file" 
                onChange={handleAnexoChange}/>
                </div>                   
            </form>
        </div>

    )

}*/