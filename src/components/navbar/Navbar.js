import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import ProjectsLogo from './projects.svg';
import CalendarLogo from './calendar.svg';
import FilesLogo from './files.svg';
import SettingsLogo from './settings.svg';
import Arrow from './arrow.svg';

import { Header, Nav, CustomNavLink, Button, Heading } from './Navbar.styles';

const Navbar = (props) => {

    const [expanded, setExpanded] = useState(false);

    const toggleNavState = () => {
        setExpanded(prev => !prev);
    }

    return(
        <Header>
            <div>
                <Heading><Link to='/dashboard/projects'>doit</Link></Heading>
                <Button onClick={toggleNavState} aria-label='Expand or condense menu' aria-expanded={expanded} expanded={expanded} type='button'>
                    <img src={Arrow} alt='Arrow'></img>
                </Button>
            </div>
            <Nav expanded={expanded}>
                <ul>
                    <li>
                        <CustomNavLink activeClassName='active' to='/dashboard/projects'>
                            <img src={ProjectsLogo} alt='Projects' />
                            Projects
                        </CustomNavLink>
                    </li>
                    <li>
                        <CustomNavLink activeClassName='active' to='/dashboard/calendar'>
                            <img src={CalendarLogo} alt='Calendar' />
                            Calendar
                        </CustomNavLink>
                    </li>
                    <li>
                        <CustomNavLink activeClassName='active' to='/dashboard/files'>
                            <img src={FilesLogo} alt='Files' />
                            Files
                        </CustomNavLink>
                    </li>
                    <li>
                        <CustomNavLink activeClassName='active' to='/dashboard/profile'>
                            <img src={SettingsLogo} alt='Settings' />
                            Settings
                        </CustomNavLink>
                    </li>
                </ul>
            </Nav>
        </Header>
    )
}

export default Navbar;