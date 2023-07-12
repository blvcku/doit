import { useHistory } from 'react-router-dom';
import useAuth from '../../contexts/auth-context/useAuth';
import useError from '../../contexts/error-context/useError';
import useTitle from '../../hooks/useTitle';
import AuthPage from '../../components/auth-page/AuthPage';
import { AuthPageLink } from '../../components/auth-page/AuthPage.styles';
import { loginInputs } from './Login.config';

const Login = () => {
    const history = useHistory();
    const { login } = useAuth();
    const { dispatchError } = useError();
    useTitle('Log In');

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        const form = e.target;
        const { value: email } = form.elements['email'];
        const { value: password } = form.elements['password'];
        if (!password) return dispatchError({ type: 'auth/invalid-password' });
        try {
            await login(email, password);
            return history.push('/dashboard');
        } catch (error) {
            dispatchError({ type: error.code });
        }
    };

    return (
        <AuthPage
            title="Login"
            inputs={loginInputs}
            submitHandler={handleSubmit}
        >
            Don't have an account?&nbsp;
            <AuthPageLink to="/signup">Sign Up</AuthPageLink>
            <br />
            <AuthPageLink to="/resetpassword">
                I forgot my password
            </AuthPageLink>
        </AuthPage>
    );
};

export default Login;
