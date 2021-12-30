import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import ProjectsLogo from './projects.svg';
import FriendsLogo from './friends.svg';
import AccountLogo from './account.svg';
import ArrowIcon from './arrow.svg';

import { Header, Nav, CustomNavLink, Button, Heading } from './Navbar.styles';

const Navbar = () => {

    const [expanded, setExpanded] = useState(false);

    const toggleNavState = () => {
        setExpanded(prev => !prev);
    }

    return(
        <Header>
            <div>
                <Heading><Link to='/dashboard/projects'>doit</Link></Heading>
                <Button onClick={toggleNavState} aria-label='Expand or condense menu' aria-expanded={expanded} expanded={expanded} type='button'>
                    <img src={ArrowIcon} alt='Expand'></img>
                </Button>
            </div>
            <Nav expanded={expanded}>
                <ul>
                    <li>
                        <CustomNavLink activeClassName='active' to='/dashboard/profile'>
                            <img src={AccountLogo} alt='Account' />
                            Account
                        </CustomNavLink>
                    </li>
                    <li>
                        <CustomNavLink activeClassName='active' to='/dashboard/friends'>
                            <img src={FriendsLogo} alt='Friends' />
                            Friends
                        </CustomNavLink>
                    </li>
                    <li>
                        <CustomNavLink activeClassName='active' to='/dashboard/projects'>
                            <img src={ProjectsLogo} alt='Projects' />
                            Projects
                        </CustomNavLink>
                    </li>
                </ul>
            </Nav>
        </Header>
    )
}

export default Navbar;