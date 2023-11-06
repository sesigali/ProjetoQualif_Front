import React, { useState } from 'react';
import NavbarCadastro from '../../components/Navbar/navbar-cadastro/navbar-cadastro';
import Footer from '../../components/Footer/footer';
import './cadastro.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import swal from 'sweetalert2';

export default function Cadastro() {
    const [formData, setFormData] = useState({
        razaoSocial: 'Empresa.SA',
        cnpj: '10321654000198',
        contatoEmpresa: 'email@email.com',
        tipoServico: 'PR03330/2023 - Manutenção',
        valorEstimadoContrato: '550000',
    });

    const RequisicaoCadastroEmpresa = (empresa) => {
        return axios.post('http://localhost:8888/empresa/adicionar', empresa)
            .then((response) => {
                if (response.status === 200) {
                    return response.data; // Retorna a nova empresa criada
                }
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    };

    const handleCadastroEmpresa = (event) => {
        event.preventDefault();

        const empresa = {
            razaoSocial: formData.razaoSocial,
            cnpj: formData.cnpj,
            contatoEmpresa: formData.contatoEmpresa,
            tipoServico: formData.tipoServico,
            valorEstimadoContrato: formData.valorEstimadoContrato,
        };

        RequisicaoCadastroEmpresa(empresa)
            .then((novaEmpresa) => {
                // Redireciona o usuário para a página inicial após o cadastro
                window.location.href = '/empresaInfo';
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <NavbarCadastro />
            <Footer />
            <main>
                <div className='background'>
                    <div className='form-container'>
                        <form className='form' onSubmit={handleCadastroEmpresa}>
                            <h1 className='title'>Cadastro da Empresa</h1>
                            <input
                                className='input'
                                type="text"
                                placeholder="Razão social"
                                required
                                value={formData.razaoSocial}
                                onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                            />
                            <input
                                className='input'
                                type="text"
                                placeholder="CNPJ"
                                required
                                value={formData.cnpj}
                                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                            />
                            <input
                                className='input'
                                type="text"
                                placeholder="Contato da empresa"
                                required
                                value={formData.contatoEmpresa}
                                onChange={(e) => setFormData({ ...formData, contatoEmpresa: e.target.value })}
                            />
                            <input
                                className='input'
                                type="text"
                                placeholder="Tipo de serviço - Número do pregão"
                                required
                                value={formData.tipoServico}
                                onChange={(e) => setFormData({ ...formData, tipoServico: e.target.value })}
                            />
                            <input
                                className='input'
                                type="text"
                                placeholder="Valor estimado do contrato"
                                required
                                value={formData.valorEstimadoContrato}
                                onChange={(e) => setFormData({ ...formData, valorEstimadoContrato: e.target.value })}
                            />
                            <div className='button-container'>
                                <button className='button-submit' type='submit'>
                                    Cadastrar
                                </button>

                                <Link to='/'>
                                    <button className='button-cancelar'>Cancelar</button>
                                </Link>

                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}



/*import React, { useState } from 'react';
import NavbarCadastro from '../../components/Navbar/navbar-cadastro/navbar-cadastro';
import Footer from '../../components/Footer/footer';
import './cadastro.css';
import axios from 'axios';
import swal from 'sweetalert2';
import { useHistory } from 'react-router-dom'; // Importe o hook useHistory do React Router.

export default function Cadastro() {
    const history = useHistory(); // Use o hook useHistory para obter uma instância de history.

    const [formData, setFormData] = useState({
        razaoSocial: '',
        cnpj: '',
        contatoEmpresa: '',
        tipoServico: '',
        valorEstimadoContrato: '',
    });

    const RequisicaoCadastroEmpresa = (empresa) => {
        axios.post('http://localhost:8888/empresa/adicionar', empresa)
            .then((response) => {
                if (response.status === 200) {
                    swal({ title: "Empresa cadastrada!", icon: "success" }).then(() => {
                        window.location.href = '/empresaInfo';
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCadastroEmpresa = (event) => {
        event.preventDefault();

        const empresa = {
            razaoSocial: formData.razaoSocial,
            cnpj: formData.cnpj,
            contatoEmpresa: formData.contatoEmpresa,
            tipoServico: formData.tipoServico,
            valorEstimadoContrato: formData.valorEstimadoContrato,
        };

        RequisicaoCadastroEmpresa(empresa)
        .then((novaEmpresa) => {
            // Após a criação da empresa, buscar as informações do banco de dados
            axios.get(`http://localhost:8888/empresa/listarempresa/${novaEmpresa.id}`)
                .then((response) => {
                    history.push({
                        pathname: '/empresaInfo',
                        state: { empresa: response.data }, // Passa os dados da empresa para a tela EmpresaInfo
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <NavbarCadastro />
            <Footer />
            <main>
                <div className='background'>
                    <div className='form-container'>
                        <form className='form' onSubmit={handleCadastroEmpresa}>
                            <h1 className='title'>Cadastro da Empresa</h1>
                            <input
                                className='input'
                                type="text"
                                placeholder="Razão social"
                                required
                                value={formData.razaoSocial}
                                onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                            />
                            <input
                                className='input'
                                type="text"
                                placeholder="CNPJ"
                                required
                                value={formData.cnpj}
                                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                            />
                            <input
                                className='input'
                                type="text"
                                placeholder="Contato da empresa"
                                required
                                value={formData.contatoEmpresa}
                                onChange={(e) => setFormData({ ...formData, contatoEmpresa: e.target.value })}
                            />
                            <input
                                className='input'
                                type="text"
                                placeholder="Tipo de serviço - Número do pregão"
                                required
                                value={formData.tipoServico}
                                onChange={(e) => setFormData({ ...formData, tipoServico: e.target.value })}
                            />
                            <input
                                className='input'
                                type="text"
                                placeholder="Valor estimado do contrato"
                                required
                                value={formData.valorEstimadoContrato}
                                onChange={(e) => setFormData({ ...formData, valorEstimadoContrato: e.target.value })}
                            />
                            <div className='button-container'>
                                <button className='button-submit' type='submit'>
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}*/

/**
import React, { useState } from 'react'
import NavbarCadastro from "../../components/Navbar/navbar-cadastro/navbar-cadastro";
import Footer from '../../components/Footer/footer'
import './cadastro.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

export default function Cadastro() {

    const history = useHistory(); // Use o useHistory para acessar o histórico

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
/*   const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);

        setFormData(initialFormData); //ao clicar no botão cadastrar, ele volta ao estado inicial

    }; */

/*------
function RequisicaoCadastroEmpresa(empresa) {
    axios.post('/empresa/adicionar', empresa) // Substitua 'sua-rota-de-cadastro' pela rota apropriada
        .then((response) => {
            if (response.status === 200) {
                swal({ title: "Empresa cadastrada!", icon: "success" }).then(() => {
                    // Você pode redirecionar para outra página ou fazer o que for necessário aqui
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function handleCadastroEmpresa(event) {
    event.preventDefault(); // Evita que a página seja recarregada
 
    const empresa = {
        razaoSocial: formData.razaoSocial,
        cnpj: formData.cnpj,
        contatoDaEmpresa: formData.contatoDaEmpresa,
        tipoDeServico: formData.tipoDeServico,
        valorEstimadoContrato: formData.valorEstimadoContrato,
    };

    axios.post('/empresa/adicionar', empresa)
    .then((response) => {
        if (response.status === 200) {
            // Empresa cadastrada com sucesso, agora você pode obter o idEmpresa da resposta.
            const idEmpresa = response.data.idEmpresa;

            // Redirecione para a página de BalancoInfo passando o idEmpresa como uma prop
            history.push({
                pathname: '/empresaInfo',
                state: { idEmpresa: idEmpresa }
            });
        } else {
            alert('Ocorreu um erro ao cadastrar a empresa.');
        }
    })
    .catch((error) => {
        console.log(error);
    });
 
    //RequisicaoCadastroEmpresa(empresa);
}
//------    


return (
    <div>
        <NavbarCadastro />
        <Footer />
        <main>
            <div className='background'>

                <div className='form-container'>
                    <form className='form' /*onSubmit={handleSubmit}>
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
                            placeholder="Pregão / Tipo de serviço"
                            required value={formData.tipoDeServico}
                            onChange={(e) => { handleFormEdit(e, 'tipoDeServico') }} />

                        <input className='input'
                            type="text"
                            placeholder="Valor estimado do contrato"
                            required value={formData.valorEstimadoContrato}
                            onChange={(e) => { handleFormEdit(e, 'valorEstimadoContrato') }} />


                        <div className='button-container'>

                            <Link to='/empresaInfo'>
                                <button className='button-submit' type='submit' onClick={handleCadastroEmpresa}>
                                Cadastrar
                            </button>
                            </Link>

                            <Link to='/'>
                                <button className='button-cancelar'>Cancelar</button>
                            </Link>

                        </div>

                    </form>
                </div>

            </div>
        </main>
    </div>

)
}*/