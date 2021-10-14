import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useError from '../../hooks/useError';

import { Nav, NavGroup, NavImage } from './Navbar.styles';

const Navbar = (props) => {

    const { currentUser, logout } = useAuth();
    const { dispatchError } = useError();

    const handleLogout = async e => {
        e.preventDefault();
        try{
            logout();
        }
        catch{
            dispatchError();
        }
    }

    return(
        <Nav>
            <NavGroup>
                <button type='button' onClick={handleLogout}>
                    <FontAwesomeIcon style={{transform: 'rotate(180deg)'}} size='2x' icon={faSignOutAlt} />
                </button>
                <h1>DoIT</h1>
            </NavGroup>
            <NavGroup>
                <button type='button'>
                    <FontAwesomeIcon size='2x' icon={faBell} />
                </button>
                <NavLink to={`/dashboard/profile`}>
                    <NavImage src={currentUser.photoURL} alt='Profile Picture'/>
                </NavLink>
            </NavGroup>
        </Nav>
    )
}

export default Navbar;