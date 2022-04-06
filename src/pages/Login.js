import React, { useRef, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useError from '../hooks/useError';
import useTitle from '../hooks/useTitle';
import { Container, Form, Wrapper, Paragraph, SubmitButton } from '../components/auth/Auth.styles';

const Login = () => {

    const history = useHistory();
    const { login } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { dispatchError } = useError();
    const { setTitle } = useTitle();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTitle('Log In');
    }, [setTitle]);

    const handleSubmit = async e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        if(!passwordRef.current.value) return dispatchError({type: 'auth/invalid-password'});
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
                <h1>Login</h1>
                <Form onSubmit={handleSubmit} noValidate>
                    <label htmlFor='email'>E-mail</label>
                    <input placeholder='example@mail.com' type='email' name='email' id='email' ref={emailRef}/>
                    <label htmlFor='password'>Password</label>
                    <input placeholder='Password' type='password' autoComplete='on' name='password' id='password' ref={passwordRef} />
                    <Paragraph>
                        <u>Don't have an account?</u>
                        <b>
                            <Link to='/signup'> Sign Up</Link>
                            <br/>
                            <Link to='/resetpassword'>I forgot my password</Link>
                        </b>
                    </Paragraph>
                    <SubmitButton loading={loading} type='submit'>Submit</SubmitButton>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login;