import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { Container } from './Dashboard.styles';
import Navbar from '../../components/navbar/Navbar';
import ProjectsList from '../../components/projects/projects-list/ProjectsList';
import Profile from '../../components/profile/Profile';
import Project from '../../components/projects/project/Project';
import Friends from '../../components/friends/Friends';
import FormsList from '../../components/forms/forms-list/FormsList';
import FormCreator from '../../components/forms/form-creator/FormCreator';
import FormPanel from '../../components/forms/form-panel/FormPanel';
import Posts from '../../components/posts/Posts';
import DashboardPortal from '../../portals/DashboardPortal';
import UserProfileProvider from '../../contexts/UserProfileContext';
import UserProfile from '../../components/user-profile/UserProfile';
import VerifyEmail from '../../components/verify-email/VerifyEmail';

const Dashboard = () => {

    const { path } = useRouteMatch();

    return(
        <UserProfileProvider>
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
                    <DashboardPortal>
                        <UserProfile />
                        <VerifyEmail />
                    </DashboardPortal>
                </main>
            </Container>
        </UserProfileProvider>
    )
}

export default Dashboard;