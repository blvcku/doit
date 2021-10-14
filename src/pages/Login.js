import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useError from '../hooks/useError';

import { Container, Wrapper, Form, HeadingWrapper, SubmitButton, SecondLink } from '../components/auth/Auth.styles';
import InputField from '../components/auth/InputField';
import Sidebar from '../components/auth/Sidebar';

const Login = () => {

    const history = useHistory();
    const { login } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { dispatchError } = useError();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        if(passwordRef.current.value.length === 0){
            return dispatchError({type: 'auth/invalid-password'});
        }
        try{
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            return history.push('/dashboard');
        }
        catch(error){
            dispatchError({type: error.code});
        }
        setLoading(false);
    }

    return(
        <Container>
            <Wrapper>
                <Sidebar />
                <Form onSubmit={handleSubmit} noValidate>
                    <HeadingWrapper>
                        <h1>Log In</h1>
                        <h3>Need an account? <Link to='/signup'>Sign Up</Link></h3>
                    </HeadingWrapper>
                    <InputField placeholder='Email' type='email' name='email' id='email' ref={emailRef} />
                    <InputField autoComplete='on' placeholder='Password' type='password' name='password' id='password' ref={passwordRef} />
                    <SecondLink>Forgot password? <Link to='/resetpassword'>Reset Password</Link></SecondLink>
                    <SubmitButton disabled={loading} type='submit' value='Log In' />
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login;