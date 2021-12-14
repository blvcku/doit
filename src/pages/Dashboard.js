import React from 'react';
import { BrowserRouter as Router, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import { Container } from './Dashboard.styles';
import Navbar from '../components/navbar/Navbar';
import ProjectsList from '../components/projectsList/ProjectsList';
import Profile from '../components/profile/Profile';
import Project from '../components/project/Project';

const Dashboard = (props) => {

    const { path } = useRouteMatch();

    return(
        <Router>
            <Container>
                <Navbar />
                <main>
                    <Switch>
                        <Route exact path={path} render={() => <Redirect to='/dashboard/projects' />} />
                        <Route path={`${path}/profile`} component={Profile} />
                        <Route path={`${path}/projects/:id`} component={Project} />
                        <Route path={`${path}/projects`} component={ProjectsList} />
                    </Switch>
                </main>
            </Container>
        </Router>
    )
}

export default Dashboard;