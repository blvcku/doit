import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import ProjectsLogo from '../../images/projects.svg';
import FriendsLogo from '../../images/friends.svg';
import AccountLogo from '../../images/account.svg';
import ArrowIcon from '../../images/nav-arrow.svg';
import FormsLogo from '../../images/forms.svg';
import PostsLogo from '../../images/posts.svg';
import Logo from '../../images/logo-white.svg';
import { Header, Nav, CustomNavLink, Button, Heading } from './Navbar.styles';

const Navbar = () => {

    const [expanded, setExpanded] = useState(false);

    const toggleNavState = () => {
        setExpanded(prev => !prev);
    }

    const collapseNavigation = () => {
        setExpanded(false);
    }

    return(
        <Header>
            <div>
                <Heading>
                    <Link onClick={collapseNavigation} to='/dashboard/projects'>
                        <img src={Logo} alt='doit' />
                    </Link>
                </Heading>
                <Button onClick={toggleNavState} aria-expanded={expanded} expanded={expanded} type='button'>
                    <img src={ArrowIcon} alt='Expand or condense menu'></img>
                </Button>
            </div>
            <Nav aria-label='primary navigation' expanded={expanded}>
                <ul>
                    <li>
                        <CustomNavLink onClick={collapseNavigation} activeClassName='active' to='/dashboard/profile'>
                            <img src={AccountLogo} alt='' />
                            Account
                        </CustomNavLink>
                    </li>
                    <li>
                        <CustomNavLink onClick={collapseNavigation} activeClassName='active' to='/dashboard/friends'>
                            <img src={FriendsLogo} alt='' />
                            Friends
                        </CustomNavLink>
                    </li>
                    <li>
                        <CustomNavLink onClick={collapseNavigation} activeClassName='active' to='/dashboard/projects'>
                            <img src={ProjectsLogo} alt='' />
                            Projects
                        </CustomNavLink>
                    </li>
                    <li>
                        <CustomNavLink onClick={collapseNavigation} activeClassName='active' to='/dashboard/posts'>
                            <img src={PostsLogo} alt='' />
                            Posts
                        </CustomNavLink>
                    </li>
                    <li>
                        <CustomNavLink onClick={collapseNavigation} activeClassName='active' to='/dashboard/forms'>
                            <img src={FormsLogo} alt='' />
                            Forms
                        </CustomNavLink>
                    </li>
                </ul>
            </Nav>
        </Header>
    )
}

export default Navbar;