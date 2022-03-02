import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import { Container } from './Dashboard.styles';
import Navbar from '../components/navbar/Navbar';
import ProjectsList from '../components/projects/projectsList/ProjectsList';
import Profile from '../components/profile/Profile';
import Project from '../components/projects/project/Project';
import Friends from '../components/friends/Friends';
import FormsList from '../components/forms/formsList/FormsList';
import FormCreator from '../components/forms/formCreator/FormCreator';
import FormPanel from '../components/forms/formPanel/FormPanel';
import Posts from '../components/posts/Posts';

const Dashboard = () => {

    const { path } = useRouteMatch();

    return(
        <Container>
            <Navbar />
            <main>
                <Switch>
                    <Route exact path={path} render={() => <Redirect to='/dashboard/projects' />} />
                    <Route exact path={`${path}/projects`} component={ProjectsList} />
                    <Route exact path={`${path}/forms`} component={FormsList} />
                    <Route path={`${path}/forms/create`} component={FormCreator} />
                    <Route path={`${path}/forms/:id`} component={FormPanel} />
                    <Route path={`${path}/friends`} component={Friends} />
                    <Route path={`${path}/posts`} component={Posts} />
                    <Route path={`${path}/profile`} component={Profile} />
                    <Route path={`${path}/projects/:id`} component={Project} />
                </Switch>
            </main>
        </Container>
    )
}

export default Dashboard;