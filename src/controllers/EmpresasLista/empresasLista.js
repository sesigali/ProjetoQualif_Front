//import React, { useState } from "react";
import NavbarEmpresasLista from "../../components/Navbar/navbar-empresasLista/navbar-empresasLista";
import Footer from '../../components/Footer/footer'
import '../EmpresasLista/empresasLista.css'
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';

//passando a propriedade (empresas) que virá do banco de dados
// ===Usando o useEffect para contruir o código trazer do BD===


export default function EmpresasLista() {


    return (
        <div className="sidebar">
            <NavbarEmpresasLista />
            <Footer />


            {/* ***Empresas que virão do banco de dados*** */}
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
                

                {/* ====POSSO COLOCAR O CÓDIGO BD AQUI PARA TESTA==== */}

            </form>

        </div>

    )
}


{/***Isso renderizará a lista de empresas com os dados buscados do banco de dados.***/}

// {empresa.map((idEmpresa)=> (
//     <form key={empresa.idEmpresa} className="container-empresasLista">

//                 <div className="button-delete">
//                     <button >
//                         <FaTrash className="btn-delete" />
//                     </button>
//                 </div>

//                 <div className="subtitulo">

//                     <Link to={`/relatorioInfo/${empresa.idEmpresa}`}>
//                         <h3 className="sub" >Empresa:{empresa.idEmpresa} </h3>
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