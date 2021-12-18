import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import AuthProvider from './contexts/AuthContext';
import ErrorProvider from './contexts/ErrorContext';
import ConfirmBoxProvider from './contexts/ConfirmBoxContext';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Error from './components/error/Error';
import ErrorPortal from './portals/ErrorPortal';
import ConfirmBoxPortal from './portals/ConfirmBoxPortal';
import ConfirmBox from './components/confirmBox/ConfirmBox';

import GlobalStyle from './GlobalStyle';

function App() {
    return (
        <Router>
            <AuthProvider>
                <ErrorProvider>
                    <ConfirmBoxProvider>
                        <Switch>
                            <PrivateRoute path='/dashboard' component={Dashboard} />
                            <Route path='/signup' component={SignUp} />
                            <Route path='/login' component={Login} />
                            <Route path='/resetpassword' component={ResetPassword} />
                            <Route path='*' render={() => <Redirect to='/dashboard/projects' />} />
                        </Switch>
                        <ErrorPortal>
                            <Error />
                        </ErrorPortal>
                        <ConfirmBoxPortal>
                            <ConfirmBox />
                        </ConfirmBoxPortal>
                        <GlobalStyle />
                    </ConfirmBoxProvider>
                </ErrorProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
