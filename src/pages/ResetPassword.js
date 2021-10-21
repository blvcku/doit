import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useError from '../hooks/useError';

import { Container, Wrapper, Form, HeadingWrapper, SubmitButton, SecondLink, SuccessMessage } from '../components/auth/Auth.styles';
import InputField from '../components/auth/InputField';
import Sidebar from '../components/auth/Sidebar';

const ResetPassword = (props) => {

    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const { dispatchError } = useError();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        if(!emailRef.current.value.trim().length){
            return dispatchError({type: 'auth/invalid-email'});
        }
        try{
            setMessage('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            dispatchError({type: 'reset'});
            setMessage('Success! Check your inbox for further instructions.');
        }
        catch(error){
            dispatchError({type: error.code, cat: 'resetpassword'});
        }
        setLoading(false);
    }

    return(
        <Container>
            <Wrapper>
                <Sidebar />
                <Form onSubmit={handleSubmit} noValidate>
                    <HeadingWrapper>
                        <h1>Reset Password</h1>
                        <h3>Need an account? <Link to='/signup'>Sign Up</Link></h3>
                    </HeadingWrapper>
                    <InputField placeholder='Email' type='email' name='email' id='email' ref={emailRef} />
                    <SecondLink>Back to <Link to='/login'>Log In</Link></SecondLink>
                    {message ? <SuccessMessage>{message}</SuccessMessage> : null}
                    <SubmitButton disabled={loading} type='submit' value='Reset password' />
                </Form>
            </Wrapper>
        </Container>
    )
}

export default ResetPassword;