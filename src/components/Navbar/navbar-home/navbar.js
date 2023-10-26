import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaRegPlusSquare } from 'react-icons/fa';
import { AiFillHome } from "react-icons/ai";
import '../../Navbar/navbar.css'

export default function Navbar() {


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
                <Link to='/cadastro'>
                    <FaRegPlusSquare className='btn-cadastro-abrir' />
                </Link>
            </div>

        </div>
    )

}

