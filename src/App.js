import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import AuthProvider from './contexts/AuthContext';
import ErrorProvider from './contexts/ErrorContext';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Error from './components/error/Error';

import GlobalStyle from './GlobalStyle';

function App() {
    return (
        <Router>
            <AuthProvider>
                <ErrorProvider>
                    <Switch>
                        <PrivateRoute exact path='/' component={Dashboard} />
                        <Route path='/signup' component={SignUp} />
                        <Route path='/login' component={Login} />
                        <Route path='/resetpassword' component={ResetPassword} />
                    </Switch>
                    <Error />
                    <GlobalStyle />
                </ErrorProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
