import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../contexts/auth-context/useAuth';
import useError from '../../contexts/error-context/useError';
import useTitle from '../../hooks/useTitle';
import { AuthPageLink } from '../../components/auth-page/AuthPage.styles';
import { SignUpAuthPage } from './SignUp.styles';
import { signUpInputs } from './SignUp.config';

const SignUp = (props) => {
    const history = useHistory();
    const { signUp } = useAuth();
    const { dispatchError } = useError();
    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle('Sign Up');
    }, [setTitle]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        const form = e.target;
        const { value: email } = form.elements['email'];
        const { value: password } = form.elements['password'];
        const { value: confirmPassword } = form.elements['confirm-password'];
        if (!email.trim()) return dispatchError({ type: 'auth/invalid-email' });
        if (password.length < 6)
            return dispatchError({ type: 'auth/password-too-short' });
        if (password !== confirmPassword)
            return dispatchError({ type: 'auth/passwords-not-match' });
        try {
            await signUp(email, password);
            return history.push('/dashboard');
        } catch (error) {
            dispatchError({ type: error.code });
        }
    };

    return (
        <SignUpAuthPage
            title="Sign Up"
            inputs={signUpInputs}
            submitHandler={handleSubmit}
        >
            Already have an account?&nbsp;
            <AuthPageLink to="/login">Log In</AuthPageLink>
        </SignUpAuthPage>
    );
};

export default SignUp;
