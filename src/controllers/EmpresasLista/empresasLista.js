import React, { useState, useEffect } from "react";
import NavbarEmpresasLista from "../../components/Navbar/navbar-empresasLista/navbar-empresasLista";
import Footer from '../../components/Footer/footer'
import '../EmpresasLista/empresasLista.css'
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';

//passando a propriedade (empresas) que virão do banco de dados

export default function EmpresasLista() {
    const [empresas, setEmpresas] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8888/empresa/listartodas');
                if(response.ok){
                    const data = await response.json();
                    setEmpresas(data);
                }else{
                    console.error('Erro ao buscar dados das empresas');
                }
            }catch(error){
                console.error('Erro ao buscar dados das empresas', error);
            }
        }
        fetchData();
    },[]);


    return (
        <div className="sidebar">
            <NavbarEmpresasLista />
            <Footer />


            {/* ***TROCAR PELO MÓDELO ABAIXO*** */}
            <form className="container-empresasLista">

                <div className="button-delete">
                    <button >
                        <FaTrash className="btn-delete" />
                    </button>
                </div>

                <div className="subtitulo">

                    <Link to='/relatorioInfo'>
                        <h3 className="sub" >Empresa: </h3>
                    </Link>
                    <h3 className="sub">Pregão / Tipo de Serviço: </h3>
                    
                </div>
                

                {/* ====POSSO COLOCAR O CÓDIGO BD AQUI PARA TESTAR==== */}

            </form>

        </div>

    )
}


{/***Isso renderizará a lista de empresas com os dados buscados do banco de dados.***/}

// {empresas.map((idEmpresa)=> (
//     <form key={empresa.idEmpresa} className="container-empresasLista">

//                 <div className="button-delete">
//                     <button >
//                         <FaTrash className="btn-delete" />
//                     </button>
//                 </div>

//                 <div className="subtitulo">

//                     <Link to={`/relatorioInfo/${empresa.idEmpresa}`}>
//                         <h3 className="sub" >Empresa:{empresa.razaoSocial} </h3>
//                     </Link>
//                     <h3 className="sub">Pregão / Tipo de Serviço:{empresa.tipoServico} </h3>
                    
//                 </div>         

//             </form>


// ))
    
// }


// ====SEGUNDO EXEMPLO====

{/* ***Empresas que virão do banco de dados*** */}
                {/* <form>
                {empresas.map((item, i) => (
                    <div key={i} className="subtitulo">
                        <h3>{item.empresa}</h3>
                        <h3>{item.tipoDeServico}</h3>

                        <button className="subtitulo">
                            <FaTrash className="btn-delete" />
                        </button>
                    </div>

                ))}
            </form> */}