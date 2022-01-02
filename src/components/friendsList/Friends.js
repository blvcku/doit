import { useState, useRef } from "react";
import { NavLink, useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import './friends.css';
import SearchIcon from './search.svg';

import { Container, Wrapper, Nav, Section } from "./Friends.styles";
import FriendsList from './FriendsList';
import SearchList from './SearchList';

const Friends = () => {

    const { path } = useRouteMatch();
    const [searchTerm, setSearchTerm] = useState(null);
    const searchRef = useRef();

    const handleChangeSearch = e => {
        e.preventDefault();
        setSearchTerm(searchRef.current.value);
    }

    const clearSearchTerm = e => {
        searchRef.current.value = '';
        setSearchTerm(null);
    }

    return(
        <Container>
            <Wrapper>
                <Nav>
                    <form onSubmit={handleChangeSearch} noValidate>
                        <input ref={searchRef} type='text' name='search' placeholder="Search"/>
                        <button type='submit'>
                            <img src={SearchIcon} alt='Search' />
                        </button>
                    </form>
                    <NavLink onClick={clearSearchTerm} activeClassName="activeFriends" to={`${path}/search`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35.871" height="35.871" viewBox="0 0 35.871 35.871">
                            <path id="Path_166" data-name="Path 166" d="M19.935,2A17.935,17.935,0,1,0,37.871,19.935,17.942,17.942,0,0,0,19.935,2Zm0,32.284A14.348,14.348,0,1,1,34.284,19.935,14.367,14.367,0,0,1,19.935,34.284ZM10.071,29.8l13.47-6.259L29.8,10.071,16.33,16.33Zm9.865-11.837a1.973,1.973,0,1,1-1.973,1.973A1.967,1.967,0,0,1,19.935,17.963Z" transform="translate(-2 -2)"/>
                        </svg>
                        <p>Find Friends</p>
                    </NavLink>
                    <NavLink onClick={clearSearchTerm} activeClassName="activeFriends" to={`${path}/list`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path id="Path_83" data-name="Path 83" d="M16,7a3,3,0,1,1-3,3,3.009,3.009,0,0,1,3-3m0,15c4.05,0,8.7,1.935,9,3H7c.345-1.08,4.965-3,9-3M16,4a6,6,0,1,0,6,6A6,6,0,0,0,16,4Zm0,15c-4.005,0-12,2.01-12,6v3H28V25C28,21.01,20.005,19,16,19Z" transform="translate(-4 -4)"/>
                        </svg>
                        <p>My Friends</p>
                    </NavLink>
                </Nav>
                <Section>
                    <Switch>
                        <Route exact path={path} render={() => <Redirect to={`${path}/list`} />}/>
                        <Route path={`${path}/list`} render={() => <FriendsList searchTerm={searchTerm} />} />
                        <Route path={`${path}/search`} render={() => <SearchList searchTerm={searchTerm} />} />
                        <Route path={`${path}/*`} render={() => <Redirect to={`${path}/list`} />} />
                    </Switch>
                </Section>
            </Wrapper>
        </Container>
    )
}

export default Friends;