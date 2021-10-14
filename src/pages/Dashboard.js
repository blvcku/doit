import React from 'react';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';
import ProjectsList from '../components/projectsList/ProjectsList';
import Profile from '../components/profile/Profile';

const Dashboard = (props) => {

    const { path } = useRouteMatch();

    return(
        <Router>
            <Navbar />
            <Switch>
                <Route exact path={`${path}/profile`} component={Profile} />
                <Route path={path} component={ProjectsList} />
            </Switch>
        </Router>
    )
}

export default Dashboard;