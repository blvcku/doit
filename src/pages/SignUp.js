import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useError from '../hooks/useError';

import { Container, SignUpForm, Wrapper, Paragraph, SubmitButton } from '../components/auth/Auth.styles';

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
        dispatchError({type: 'reset'});
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
                <h1>Sign Up</h1>
                <SignUpForm onSubmit={handleSubmit} noValidate>
                    <label htmlFor='email'>E-mail</label>
                    <input placeholder='example@mail.com' type='email' name='email' id='email' ref={emailRef}/>
                    <label htmlFor='password'>Password</label>
                    <input placeholder='Password' type='password' autoComplete='off' name='password' id='password' ref={passwordRef} />
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input placeholder='Confirm Password' type='password' autoComplete='off' name='ConfirmPassword' id='ConfirmPassword' ref={confirmPasswordRef} />
                    <Paragraph>
                        <u>Already have an account?</u>
                        <b>
                            <Link to='/login'> Log In</Link>
                        </b>
                    </Paragraph>
                    <SubmitButton loading={loading} type='submit'>Submit</SubmitButton>
                </SignUpForm>
            </Wrapper>
        </Container>
    )
}

export default SignUp;