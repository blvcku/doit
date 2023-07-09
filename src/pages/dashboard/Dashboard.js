import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import {
    DashboardContainer,
    DashboardContentContainer,
} from './Dashboard.styles';
import Navbar from './components/navbar/Navbar';
import Profile from './profile/Profile';
import Friends from './friends/Friends';
import FormsList from './forms-list/FormsList';
import FormCreator from './form-creator/FormCreator';
import FormPanel from './form-panel/FormPanel';
import Posts from './posts/Posts';
import DashboardPortal from './portals/DashboardPortal';
import UserProfileProvider from './contexts/user-profile-context/UserProfileContext';
import UserProfile from './components/user-profile/UserProfile';
import VerifyEmail from './components/verify-email/VerifyEmail';
import CanvasList from './canvas-list/CanvasList';
import Canvas from './canvas/Canvas';
import Projects from './projects/Projects';

const Dashboard = () => {
    const { path } = useRouteMatch();

    return (
        <UserProfileProvider>
            <DashboardContainer>
                <Navbar />
                <DashboardContentContainer>
                    <Switch>
                        <Route
                            exact
                            path={path}
                            render={() => <Redirect to={`${path}/projects`} />}
                        />
                        <Route path={`${path}/projects`} component={Projects} />
                        <Route
                            exact
                            path={`${path}/forms`}
                            component={FormsList}
                        />
                        <Route
                            path={`${path}/forms/create`}
                            component={FormCreator}
                        />
                        <Route
                            path={`${path}/forms/:id`}
                            component={FormPanel}
                        />
                        <Route
                            exact
                            path={`${path}/canvas`}
                            component={CanvasList}
                        />
                        <Route path={`${path}/canvas/:id`} component={Canvas} />
                        <Route path={`${path}/friends`} component={Friends} />
                        <Route path={`${path}/posts`} component={Posts} />
                        <Route path={`${path}/profile`} component={Profile} />
                        <Route
                            render={() => <Redirect to="/dashboard/projects" />}
                        />
                    </Switch>
                    <DashboardPortal>
                        <UserProfile />
                        <VerifyEmail />
                    </DashboardPortal>
                </DashboardContentContainer>
            </DashboardContainer>
        </UserProfileProvider>
    );
};

export default Dashboard;
