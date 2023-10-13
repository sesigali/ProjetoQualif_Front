import { FaTimes } from 'react-icons/fa';
import '../../Navbar/navbar.css'
import { Link } from 'react-router-dom';



export default function NavbarEmpresasLista() {

    return (
        <div className='navbar sidebar'>
            <Link to='/'>
                < FaTimes className='btn-close' />
            </Link>
        </div>
    )

}