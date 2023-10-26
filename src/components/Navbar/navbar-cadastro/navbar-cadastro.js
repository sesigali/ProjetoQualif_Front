import React from 'react'
import { FaBars, FaRegMinusSquare } from 'react-icons/fa';
import { AiFillHome } from "react-icons/ai";
import '../../Navbar/navbar.css'
import { Link } from 'react-router-dom';

export default function NavbarCadastro() {

    return (

        <div className='navbar'>

            <div>
                <Link to='/empresasLista'>
                    <FaBars className='btn-hamburguer' />
                </Link>
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