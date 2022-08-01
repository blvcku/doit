import { useEffect } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import useTitle from '../../hooks/useTitle';
import { Container, SubContainer, Nav, CustomNavLink } from "./Posts.styles";
import PostCreator from './PostCreator';
import MyPosts from "./MyPosts";
import GlobalPosts from "./GlobalPosts";

const Posts = () => {

    const { setTitle } = useTitle();
    const { path } = useRouteMatch();

    useEffect(() => {
        setTitle('Posts');
    }, [setTitle]);

    return(
        <Container>
            <SubContainer>
                <Nav>
                    <CustomNavLink to={`${path}/global`} activeClassName='active'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.147 31.147">
                            <path d="M17.574,2A15.574,15.574,0,1,0,33.147,17.574,15.579,15.579,0,0,0,17.574,2ZM5.115,17.574A12.5,12.5,0,0,1,5.442,14.8l7.444,7.444V23.8A3.124,3.124,0,0,0,16,26.918v3.006A12.477,12.477,0,0,1,5.115,17.574Zm21.632,8.41a3.1,3.1,0,0,0-2.959-2.18H22.23V19.131a1.562,1.562,0,0,0-1.557-1.557H11.329V14.459h3.115A1.562,1.562,0,0,0,16,12.9V9.787h3.115A3.124,3.124,0,0,0,22.23,6.672V6.034a12.424,12.424,0,0,1,4.516,19.95Z" transform="translate(-2 -2)" />
                        </svg>
                        Public Posts
                    </CustomNavLink>
                    <CustomNavLink to={`${path}/myposts`} activeClassName='active'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.147 31.147">
                            <g transform="translate(-3 -3)">
                                <path d="M25.5,3H6.461A3.471,3.471,0,0,0,3,6.461V30.687a3.471,3.471,0,0,0,3.461,3.461H30.687a3.471,3.471,0,0,0,3.461-3.461V11.652Zm5.191,27.687H6.461V6.461h17.3v6.922h6.922ZM9.922,27.226h17.3V23.765H9.922Zm8.652-17.3H9.922v3.461h8.652ZM9.922,20.3h17.3V16.843H9.922Z" transform="translate(0 0)" />
                            </g>
                        </svg>
                        My Posts
                    </CustomNavLink>
                    <CustomNavLink to={`${path}/create`} activeClassName='active'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.871 35.871">
                            <g transform="translate(-3 -2)">
                                <g transform="translate(3 2)">
                                    <path d="M29.431,31.847H6.776V8.776H19.992V5H6.776A3.787,3.787,0,0,0,3,8.776V31.431a3.787,3.787,0,0,0,3.776,3.776H29.431a3.787,3.787,0,0,0,3.776-3.776V18.216H29.431Z" transform="translate(-3 0.664)" />
                                    <path d="M23.44,2H19.664V7.664H14c.019.019,0,3.776,0,3.776h5.664v5.645c.019.019,3.776,0,3.776,0V11.44H29.1V7.664H23.44Z" transform="translate(6.767 -2)" />
                                    <rect width="15" height="4" transform="translate(8 13)" />
                                    <path d="M7,12v3.776H22.1V12H7Z" transform="translate(0.552 6.88)" />
                                    <rect width="15" height="3" transform="translate(8 25)" />
                                </g>
                            </g>
                        </svg>
                        Create Post
                    </CustomNavLink>
                </Nav>
                <Switch>
                    <Route exact path={path} render={() => <Redirect to={`${path}/global`} />}/>
                    <Route path={`${path}/global`} component={GlobalPosts} />
                    <Route path={`${path}/myposts`} component={MyPosts} />
                    <Route path={`${path}/create`} component={PostCreator} />
                    <Route path={`${path}/*`} render={() => <Redirect to={`${path}/global`} />} />
                </Switch>
            </SubContainer>
        </Container>
    )
}

export default Posts;