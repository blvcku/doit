import React from 'react';

import useAuth from '../../hooks/useAuth';

import Logo from './Logo';
import NotificationsButton from './NotificationsButton';
import { Nav, NavGroup, ImageWrapper, NavImage } from './Navbar.styles';

const Navbar = (props) => {

    const { currentUser: {photoURL} } = useAuth();

    return(
        <Nav>
            <NavGroup>
                <Logo />
            </NavGroup>
            <NavGroup>
                <NotificationsButton type='button'/>
                <ImageWrapper to={`/dashboard/profile`}>
                    <NavImage src={photoURL} alt='Profile Picture'/>
                </ImageWrapper>
            </NavGroup>
        </Nav>
    )
}

export default Navbar;