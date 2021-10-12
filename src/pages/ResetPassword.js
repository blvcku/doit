import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useError from '../hooks/useError';

import { Container, Form, HeadingWrapper, SubmitButton, SecondLink } from '../components/auth/Auth.styles';
import InputField from '../components/auth/InputField';

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
            setMessage('Check your inbox for further instructions');
        }
        catch(error){
            dispatchError({type: error.code, cat: 'resetpassword'});
        }
        setLoading(false);
    }

    return(
        <Container>
            <Form onSubmit={handleSubmit} noValidate>
                <HeadingWrapper>
                    <h1>Reset Password</h1>
                    <h3>Need an account? <Link to='/signup'>Sign Up</Link></h3>
                </HeadingWrapper>
                <InputField placeholder='Email' type='email' name='email' id='email' ref={emailRef} />
                <SecondLink><Link to='/login'>Log In</Link></SecondLink>
                <SubmitButton type='submit' value='Reset password' />
            </Form>
        </Container>
    )
}

export default ResetPassword;