import { useState } from 'react';
import { functions } from '../../../../services/firebase';
import { Container } from './VerifyEmail.styles';
import useAuth from '../../../../contexts/auth-context/useAuth';
import useError from '../../../../contexts/error-context/useError';

const VerifyEmail = () => {
    const {
        currentUser: { emailVerified },
    } = useAuth();
    const { dispatchError } = useError();
    const [loading, setLoading] = useState(false);

    const handleSendVerificationMail = async (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        if (emailVerified) return;
        setLoading(true);
        try {
            const sendVerifyEmail = functions.httpsCallable('sendVerifyEmail');
            await sendVerifyEmail();
        } catch (error) {
            dispatchError({ type: 'auth/failed-to-send-mail' });
        }
        setLoading(false);
    };

    return (
        <>
            {!emailVerified && (
                <Container role="alert">
                    Please check your inbox to verify your email address
                    <button
                        disabled={loading}
                        onClick={handleSendVerificationMail}
                        type="button"
                    >
                        Resend mail
                    </button>
                </Container>
            )}
        </>
    );
};

export default VerifyEmail;
