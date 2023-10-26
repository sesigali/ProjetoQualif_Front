//import React, { useState } from "react";
import NavbarEmpresasLista from "../../components/Navbar/navbar-empresasLista/navbar-empresasLista";
import Footer from '../../components/Footer/footer'
import '../EmpresasLista/empresasLista.css'
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';

//passando a propriedade (empresas) que virá do banco de dados
export default function EmpresasLista(empresas) {


    return (
        <div className="sidebar">
            <NavbarEmpresasLista />
            <Footer />


            <form className="container-empresasLista">

                <div className="button-delete">
                    <button >
                        <FaTrash className="btn-delete" />
                    </button>
                </div>

                <div className="subtitulo">

                    <Link to='/relatorioInfo'>
                        <h3 className="sub" >Empresas: </h3>
                    </Link>
                    <h3 className="sub">Pregão / Tipo de Serviço: </h3>
                    {/* <h3></h3> */}
                </div>



                {/* ***Empresas que virão do banco de dados*** */}
                {/* <form>
                {empresas.map((item, i) => (
                    <div key={i} className="subtitulo">
                        <h3>{item.nome}</h3>
                        <h3>{item.email}</h3>

                        <button className="subtitulo">
                            <FaTrash className="btn-delete" />
                        </button>
                    </div>

                ))}
            </form> */}

            </form>



        </div>

    )
}

