import React, {useState} from "react";

export default function CertidaoInfo() {

    const [certidao, setCertidao] = useState('');
    const [docRecuperacao, setDocRecuperacao] = useState('');
    const [showDocRecuperacao , setShowDocRecuperacao] = useState(false);

    const handleCertidaoChange = (e)=>{
        setCertidao(e.target.value);
        setShowDocRecuperacao(e.target.value === 'positiva');
    };

    const handleDocRecuperacaoChange = (e)=>{
        setDocRecuperacao(e.target.value);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        const resultadoCertidao = certidao === 'positiva' ? {docRecuperacao} : docRecuperacao;

        console.log('Resultado:', resultadoCertidao);
    }

    return (
        <div>
            <h1>Certidão</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* validar certidão */}
                    <h3>Certidão é ?</h3>
                    <label>
                        <input type="radio" value="positiva"
                        checked={certidao === 'positiva'} 
                        onChange={handleCertidaoChange}/>Positiva
                    </label>

                    <label>
                        <input type="radio" value="negativa"
                        checked={certidao === 'negativa'} 
                        onChange={handleCertidaoChange} />Negativa
                    </label>
                </div>

                {showDocRecuperacao && (
                    <div>
                    {/* Doc de recuperação judicial */}
                    <h3>Empresa encaminhou documento de recuperação judicial?</h3>
                    <label>
                        <input type="radio" value="sim"
                        checked={docRecuperacao === 'sim'} 
                        onChange={handleDocRecuperacaoChange}/>Sim
                    </label>

                    <label>
                        <input type="radio" value="não"
                        checked={docRecuperacao === 'não'} 
                        onChange={handleDocRecuperacaoChange}/>Não
                    </label>

                </div>
                )}      

                <input className="" type="submit" value="Anexar Certidão" />
            </form>
        </div>

    )

}