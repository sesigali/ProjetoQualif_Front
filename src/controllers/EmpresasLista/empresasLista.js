import React, { useState, useEffect } from "react";
import '../EmpresasLista/empresasLista.css'
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

//passando a propriedade (empresas) que virão do banco de dados

export default function EmpresasLista() {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                //const response = await axios.get('http://localhost:8888/empresa/listartodas');
                const response = await axios.get('http://191.252.202.159:8888/empresa/listartodas');
                if (response.status === 200) {
                    const data = response.data;
                    setEmpresas(data);
                } else {
                    console.error('Erro ao buscar dados das empresas');
                }
            } catch (error) {
                console.error('Erro ao buscar dados das empresas', error);
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (idEmpresa) => {
        try {
            const response = await axios.delete(`http://191.252.202.159:8888/empresa/excluir/${idEmpresa}`);
            if (response.status === 200) {
                // Atualize a lista de empresas após a exclusão
                const updatedEmpresas = empresas.filter(empresa => empresa.idEmpresa !== idEmpresa);
                setEmpresas(updatedEmpresas);
            } else {
                console.error('Erro ao excluir a empresa');
            }
        } catch (error) {
            console.error('Erro ao excluir a empresa', error);
        }
    };


    return (

        <div className="container-empresasLista">
            {empresas.map((empresa, index) => (
                <Link key={index} to={`/relatorioInfo/${empresa.idEmpresa}`}>
                    <div key={index} className="lista">
                        <div className="empresasLista">
                            <div className="item1">
                                <h3 className="sub">{empresa.razaoSocial}</h3>
                            </div>
                            <Link to='/'>
                                <button onClick={() => handleDelete(empresa.idEmpresa)}>
                                    <FaTrash className="btn-delete" />
                                </button>
                            </Link>
                        </div>
                        <div className="item2">
                            <h3 className="sub">{empresa.tipoServico}</h3>
                        </div>

                    </div>
                </Link>
            ))}
        </div>
    )
}

