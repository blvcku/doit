import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import { Container } from './Dashboard.styles';
import Navbar from '../components/navbar/Navbar';
import ProjectsList from '../components/projectsList/ProjectsList';
import Profile from '../components/profile/Profile';
import Project from '../components/project/Project';

const Dashboard = (props) => {

    const { path } = useRouteMatch();

    return(
        <Container>
            <Navbar />
            <main>
                <Switch>
                    <Route exact path={path} render={() => <Redirect to='/dashboard/projects' />} />
                    <Route exact path={`${path}/projects`} component={ProjectsList} />
                    <Route path={`${path}/profile`} component={Profile} />
                    <Route path={`${path}/projects/:id`} component={Project} />
                </Switch>
            </main>
        </Container>
    )
}

export default Dashboard;