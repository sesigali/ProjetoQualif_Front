import React, { useState } from "react";
import axios from 'axios';

export default function CertidaoInfo({idEmpresa}) {
    const [formData, setFormData] = useState({
        certidao: '',
        docRecuperacao: '',
        anexo: '',
        idEmpresa: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAnexoChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, anexo: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { certidao, docRecuperacao, anexo } = formData;

        if (docRecuperacao === 'não') {
            alert('Você selecionou "Não" para recuperação judicial, mas não anexou o documento. Entre em contato com o pregoeiro para fornecer a documentação pendente.');
            return;
        }

        if (!anexo) {
            alert('Você não anexou a Certidão.');
            return;
        }

        const data = {
            certidaoFalencia: anexo,
            naturezaCertidao: certidao,
            planoRecuperacao: docRecuperacao,
            idEmpresa: idEmpresa, // Substitua pelo ID apropriado da empresa
        };

        console.log('certidaoFalencia', anexo);
        console.log('naturezaCertidao', certidao);
        console.log('planoRecuperacao', docRecuperacao);
        console.log('iDEmpresa', idEmpresa);

        // Enviar dados para o backend
        enviarDadosParaBackend(data);
    }

    const enviarDadosParaBackend = (data) => {
        axios.post('http://localhost:8888/certidao/adicionar', data) // Ajuste a URL do endpoint
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
            <h1 className="title-info">Certidão</h1>
            <form onSubmit={handleSubmit}>
                {/* Validar certidão */}
                <h3 className="sub-title">Certidão é ?</h3>
                <label className="label-certidaoInfo">
                    <input
                        type="radio"
                        name="certidao"
                        value="positiva"
                        checked={formData.certidao === 'positiva'}
                        onChange={handleInputChange}
                    />Positiva
                </label>

                <label className="label-certidaoInfo">
                    <input
                        type="radio"
                        name="certidao"
                        value="negativa"
                        checked={formData.certidao === 'negativa'}
                        onChange={handleInputChange}
                    />Negativa
                </label>

                {formData.certidao === 'positiva' && (
                    <div>
                        {/* Doc de recuperação judicial */}
                        <h3 className="sub-title">Empresa encaminhou documento de recuperação judicial?</h3>
                        <label className="label-certidaoInfo">
                            <input
                                type="radio"
                                name="docRecuperacao"
                                value="sim"
                                checked={formData.docRecuperacao === 'sim'}
                                onChange={handleInputChange}
                            />Sim
                        </label>

                        <label className="label-certidaoInfo">
                            <input
                                type="radio"
                                name="docRecuperacao"
                                value="não"
                                checked={formData.docRecuperacao === 'não'}
                                onChange={handleInputChange}
                            />Não
                        </label>
                    </div>
                )}

                {(formData.certidao === 'negativa' || formData.docRecuperacao === 'sim') && (
                    <div>
                        {/* Anexar Documento de Recuperação Judicial */}
                        <h3 className="sub-title">Anexar Documento de Recuperação Judicial:</h3>
                        <label className="label-certidaoInfo">
                            <input type="file" onChange={handleAnexoChange} />
                        </label>
                    </div>
                )}

                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}