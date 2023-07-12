import { useState } from 'react';
import useAuth from '../../contexts/auth-context/useAuth';
import useError from '../../contexts/error-context/useError';
import useTitle from '../../hooks/useTitle';
import AuthPage from '../../components/auth-page/AuthPage';
import { AuthPageLink } from '../../components/auth-page/AuthPage.styles';
import { resetPasswordInputs } from './ResetPassword.config';

const ResetPassword = (props) => {
    const [successMessage, setSuccessMessage] = useState('');
    const { resetPassword } = useAuth();
    const { dispatchError } = useError();
    useTitle('Reset Password');

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        setSuccessMessage('');
        const form = e.target;
        const { value: email } = form.elements['email'];
        if (!email.trim()) return dispatchError({ type: 'auth/invalid-email' });
        try {
            await resetPassword(email);
            setSuccessMessage(
                'Success! Check your inbox for further instructions.',
            );
        } catch (error) {
            dispatchError({ type: 'auth/resetpassword-failed' });
        }
    };

    return (
        <AuthPage
            title="Reset Password"
            inputs={resetPasswordInputs}
            submitHandler={handleSubmit}
            successMessage={successMessage}
        >
            <AuthPageLink to="/login">Back to Log In</AuthPageLink>
        </AuthPage>
    );
};

export default ResetPassword;
