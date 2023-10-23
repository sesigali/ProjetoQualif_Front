import React, { useState } from "react";
import NavbarEmpresasLista from "../../components/Navbar/navbar-empresasLista/navbar-empresasLista";
import Footer from '../../components/Footer/footer'
import '../EmpresasLista/empresasLista.css'
import { FaTrash } from "react-icons/fa";

//passando a propriedade (empresas) que virá do banco de dados
export default function EmpresasLista(empresas) {


    return (
        <div className="sidebar">
            <NavbarEmpresasLista />
            <Footer />

            <form className="container-empresasLista">
                <div className="subtitulo">
                    <h3 className="" >Empresas</h3>
                    <h3 >Tipo de Serviço</h3>
                    {/* <h3></h3> */}
                    <button>
                        <FaTrash className="btn-delete" />
                    </button>
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
