import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useError from '../hooks/useError';

import { Container, Form, HeadingWrapper, SubmitButton, SecondLink } from '../components/auth/Auth.styles';
import InputField from '../components/auth/InputField';

const Login = () => {

    const history = useHistory();
    const { login } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { dispatchError } = useError();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            return history.push('/');
        }
        catch(error){
            dispatchError({type: error.code});
        }
        setLoading(false);
    }

    return(
        <Container>
            <Form onSubmit={handleSubmit} noValidate>
                <HeadingWrapper>
                    <h1>Log In</h1>
                    <h3>Need an account? <Link to='/signup'>Sign Up</Link></h3>
                </HeadingWrapper>
                <InputField placeholder='Email' type='email' name='email' id='email' ref={emailRef} />
                <InputField placeholder='Password' type='password' name='password' id='password' ref={passwordRef} />
                <SecondLink>Forgot password? <Link to='/resetpassword'>Reset Password</Link></SecondLink>
                <SubmitButton type='submit' value='Log In' />
            </Form>
        </Container>
    )
}

export default Login;