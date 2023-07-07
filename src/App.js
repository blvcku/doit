import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import SignUp from './pages/sign-up/SignUp';
import ResetPassword from './pages/reset-password/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Form from './pages/form/Form';
import FormSuccess from './components/forms/form-success/FormSuccess';
import AuthProvider from './contexts/AuthContext';
import ErrorProvider from './contexts/ErrorContext';
import ConfirmBoxProvider from './contexts/ConfirmBoxContext';
import PrivateRoute from './components/private-route/PrivateRoute';
import Error from './components/error/Error';
import ErrorPortal from './portals/ErrorPortal';
import ConfirmBoxPortal from './portals/ConfirmBoxPortal';
import ConfirmBox from './components/confirm-box/ConfirmBox';
import GlobalStyle from './GlobalStyle';
import ImagePortal from './portals/ImagePortal';
import ImageProvider from './contexts/ImageContext';
import Image from './components/image/Image';

function App() {
    return (
        <Router>
            <AuthProvider>
                <ErrorProvider>
                    <ConfirmBoxProvider>
                        <ImageProvider>
                            <Switch>
                                <PrivateRoute
                                    path="/dashboard"
                                    component={Dashboard}
                                />
                                <Route
                                    exact
                                    path="/forms/success"
                                    component={FormSuccess}
                                />
                                <Route path="/forms/:id" component={Form} />
                                <Route path="/signup" component={SignUp} />
                                <Route path="/login" component={Login} />
                                <Route
                                    path="/resetpassword"
                                    component={ResetPassword}
                                />
                                <Route
                                    path="*"
                                    render={() => (
                                        <Redirect to="/dashboard/projects" />
                                    )}
                                />
                            </Switch>
                            <ErrorPortal>
                                <Error />
                            </ErrorPortal>
                            <ConfirmBoxPortal>
                                <ConfirmBox />
                            </ConfirmBoxPortal>
                            <ImagePortal>
                                <Image />
                            </ImagePortal>
                            <GlobalStyle />
                        </ImageProvider>
                    </ConfirmBoxProvider>
                </ErrorProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
