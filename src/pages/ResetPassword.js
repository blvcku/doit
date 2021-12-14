import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useError from '../hooks/useError';

import { Container, Form, Wrapper, Paragraph, SubmitButton, SuccessMessage } from '../components/auth/Auth.styles';

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
                <h1>Reset Password</h1>
                <Form onSubmit={handleSubmit} noValidate>
                    <label htmlFor='email'>E-mail</label>
                    <input placeholder='example@mail.com' type='email' name='email' id='email' ref={emailRef}/>
                    <Paragraph>
                        <b>
                            <Link to='/signup'>Back to Log In</Link>
                        </b>
                    </Paragraph>
                    <SubmitButton loading={loading} type='submit'>Submit</SubmitButton>
                    <SuccessMessage>
                        <p>
                            {message}
                        </p>
                    </SuccessMessage>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default ResetPassword;