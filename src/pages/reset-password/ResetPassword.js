import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useError from '../../hooks/useError';
import useTitle from '../../hooks/useTitle';
import { Container, Form, Wrapper, Paragraph, SubmitButton, SuccessMessage } from '../../components/auth/Auth.styles';

const ResetPassword = (props) => {

    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const { dispatchError } = useError();
    const { setTitle } = useTitle();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setTitle('Reset Password');
    }, [setTitle]);

    const handleSubmit = async e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        if(!emailRef.current.value.trim()) return dispatchError({type: 'auth/invalid-email'});
        try{
            setMessage('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Success! Check your inbox for further instructions.');
        }
        catch(error){
            dispatchError({type: 'auth/resetpassword-failed'});
        }
        setLoading(false);
    }

    return(
        <Container>
            <Wrapper>
                <h1>Reset Password</h1>
                <Form onSubmit={handleSubmit} noValidate>
                    <label htmlFor='email'>E-mail</label>
                    <input placeholder='example@mail.com' type='email' name='email' id='email' ref={emailRef}/>
                    <Paragraph>
                        <Link to='/login'>Back to Log In</Link>
                    </Paragraph>
                    <SubmitButton loading={loading} type='submit'>Submit</SubmitButton>
                    <SuccessMessage>
                        {message}
                    </SuccessMessage>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default ResetPassword;