import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useError from '../hooks/useError';

import { Container, Form, HeadingWrapper, SubmitButton } from '../components/auth/Auth.styles';
import InputField from '../components/auth/InputField';

const SignUp = (props) => {

    const history = useHistory();
    const { signUp } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { dispatchError } = useError();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        if(!emailRef.current.value.trim()){
            return dispatchError({type: 'auth/invalid-email'});
        }
        if(passwordRef.current.value.length < 6){
            return dispatchError({type: 'auth/password-too-short'});
        }
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return dispatchError({type: 'auth/passwords-not-match'});
        }
        try{
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
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
                    <h1>Sign Up</h1>
                    <h3>Already a member? <Link to='/login'>Log in</Link></h3>
                </HeadingWrapper>
                <InputField placeholder='Email' type='email' name='email' id='email' ref={emailRef} />
                <InputField placeholder='Password' type='password' name='password' id='password' ref={passwordRef} />
                <InputField placeholder='Confirm Password' type='password' name='confirmPassword' id='confirmPassword' ref={confirmPasswordRef} />
                <SubmitButton type='submit' value='Sign Up' />
            </Form>
        </Container>
    )
}

export default SignUp;