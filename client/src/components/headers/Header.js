import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Cookies from 'universal-cookie';

const cookies = new Cookies();


function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [menu, setMenu] = useState(false)
    const user = state.userAPI.user

    const logoutUser = async () => {
        await axios.get('/user/logout')

        localStorage.removeItem('firstLogin')
        cookies.remove('user', { path: '/' });

        window.location.href = "/";
    }

    const createBoard = () => {
        return (
            <>
                <li><Link to="/create_board">Create Board</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'Task Tracker'}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>

                <li>{isLogged ? 'Hi '+ cookies.get('user').name : ''}</li>


                {isLogged && createBoard()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login</Link></li>
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>
        </header>
    )
}

export default Header
