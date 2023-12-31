import React, { useState } from 'react'
import { FaBars, FaTimes, FaRegMinusSquare } from 'react-icons/fa';
import { AiFillHome } from "react-icons/ai";
import '../../Navbar/navbar.css'
import { Link } from 'react-router-dom';
import EmpresasLista from '../../../controllers/EmpresasLista/empresasLista';

export default function NavbarCadastro() {

    const [hamburguerIcon, setHamburguerIcon] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setHamburguerIcon(!hamburguerIcon);
        setSidebarOpen(!sidebarOpen);
    };


    return (

        <div className='navbar'>

            <div>
                {hamburguerIcon ? (
                    <FaBars className='btn-hamburguer' onClick={toggleSidebar} />
                ) : (

                    < FaTimes className='btn-close' onClick={toggleSidebar} />

                )}
                <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>

                    <EmpresasLista/>

                </div>

            </div>

            <div>
                <Link to='/'>
                    <AiFillHome className='btn-home' />
                </Link>
            </div>

            <div>
                <Link to='/'>
                    < FaRegMinusSquare className='btn-cadastro-fechar' />
                </Link>
            </div>

        </div>

    )

}