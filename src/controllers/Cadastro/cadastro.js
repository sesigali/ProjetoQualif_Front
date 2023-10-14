import React, { useState } from 'react'
import NavbarCadastro from "../../components/Navbar/navbar-cadastro/navbar-cadastro";
import Footer from '../../components/Footer/footer'
import './cadastro.css'
import { Link } from 'react-router-dom';


export default function Cadastro() {


    const initialFormData = {

        razaoSocial: '',
        cnpj: '',
        contatoDaEmpresa: '',
        tipoDeServico: '',
        valorEstimadoContrato: '',
    };

    //lida com os dados da empresa no formulário
    const [formData, setFormData] = useState(initialFormData);


    //lida com edição do formulário
    const handleFormEdit = (e, name) => {
        setFormData({
            ...formData,
            [name]: e.target.value
        })
    }

    //lida com o armazenamento das informações inseridas no cadastro/ armazenando no console ou banco de dados...
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);

        setFormData(initialFormData); //ao clicar no botão cadastrar, ele volta ao estado inicial

    };


    return (
        <div>
            <NavbarCadastro />
            <Footer />

            <main>
                <div className='background'>

                    <div className='form-container'>
                        <form className='form' onSubmit={handleSubmit}>
                            <h1 className='title'>Cadastro da Empresa</h1>

                            <input className='input'
                                type="text"
                                placeholder="Razão social"
                                required value={formData.razaoSocial}
                                onChange={(e) => { handleFormEdit(e, 'razaoSocial') }} />

                            <input className='input'
                                type="text"
                                placeholder="CNPJ"
                                required value={formData.cnpj}
                                onChange={(e) => { handleFormEdit(e, 'cnpj') }} />

                            <input className='input'
                                type="text"
                                placeholder="Contato da empresa" required value={formData.contatoDaEmpresa}
                                onChange={(e) => { handleFormEdit(e, 'contatoDaEmpresa') }} />

                            <input className='input'
                                type="text"
                                placeholder="Tipo de serviço - Número do pregão"
                                required value={formData.tipoDeServico}
                                onChange={(e) => { handleFormEdit(e, 'tipoDeServico') }} />

                            <input className='input'
                                type="text"
                                placeholder="Valor estimado do contrato"
                                required value={formData.valorEstimadoContrato}
                                onChange={(e) => { handleFormEdit(e, 'valorEstimadoContrato') }} />

                            <Link to='/empresaInfo'><div className='button-container'>
                                <button className='button-submit' type='submit'>Cadastrar</button>
                            </div></Link>
                        </form>
                    </div>

                </div>
            </main>
        </div>

    )
}




