import React, { useState } from "react";

export default function CertidaoInfo() {
    const [certidao, setCertidao] = useState('');
    const [docRecuperacao, setDocRecuperacao] = useState(''); // Inicie com 'não' para exibir o alert apenas quando 'Não' for selecionado
    const [showDocRecuperacao, setShowDocRecuperacao] = useState(false);
    const [anexo, setAnexo] = useState(null);

    const handleCertidaoChange = (e) => {
        setCertidao(e.target.value);
        setShowDocRecuperacao(e.target.value === 'positiva');
    };

    const handleDocRecuperacaoChange = (e) => {
        setDocRecuperacao(e.target.value);
        if (e.target.value === 'não') {
            alert('Você selecionou "Não" para recuperação judicial. Entre em contato com o pregoeiro para solicitar a documentação pendente ao licitante.');
        }
    };

    const handleAnexoChange = (e) => {
        const file = e.target.files[0];
        setAnexo(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (docRecuperacao === 'sim' && !anexo) {
            alert('Você selecionou "Sim" para recuperação judicial, mas não anexou o documento. Entre em contato com o pregoeiro para fornecer a documentação pendente.');
            return;
        }

        const resultadoCertidao = {
            certidao,
            docRecuperacao,
            anexo
        };

        console.log('Resultado:', resultadoCertidao);
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

                {showDocRecuperacao && certidao === 'positiva' && docRecuperacao === 'não' || (
                    <div>
                        {/* Anexar Documento de Recuperação Judicial */}
                        <h3 className="sub-title">Anexar Documento de Recuperação Judicial:</h3>
                        <label className="label-certidaoInfo">
                            <input type="file" onChange={handleAnexoChange} />
                        </label>
                    </div>
                )}

            </form>
        </div>
    )
}
