import React, { useRef } from 'react';
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

import useAuth from '../../hooks/useAuth';
import useError from '../../hooks/useError';

import { Form, SubHeading, EditGroup, InputWrapper } from './Profile.styles';
import Button from './Button';

const EmailEdit = ({isLoading, isEditing, onEdit, setEditEmail, setLoadingState}) => {

    const { currentUser, currentUser: {email} } = useAuth();
    const { dispatchError } = useError();
    const emailRef = useRef();

    const handleEdit = async e => {
        e.preventDefault();
        await onEdit(e);
        emailRef.current.focus();
    }

    const handleSubmitEmail = async e => {
        e.preventDefault();
        if(!emailRef.current.value.trim()){
            return dispatchError({type: 'auth/invalid-email'});
        }
        try{
            setLoadingState(true);
            await currentUser.updateEmail(emailRef.current.value);
            emailRef.current.value = '';
            setEditEmail(false);
            dispatchError({type: 'reset'});
        }
        catch(error){
            dispatchError({type: error.code});
        }
        setLoadingState(false);
    }

    return(
        <Form onSubmit={handleSubmitEmail} noValidate>
            <SubHeading isEditing={isEditing}>Email</SubHeading>
            <EditGroup>
                <InputWrapper isEditing={isEditing}>
                    <label htmlFor='currentEmail'>Current Email</label>
                    <input id='currentEmail' name='currentEmail' type='email' defaultValue={email} disabled/>
                    <label htmlFor='email'>Change Email</label>
                    <input disabled={!isEditing} placeholder='Email' id='email' name='email' type='email' ref={emailRef}/>
                </InputWrapper>
                {isEditing ? <Button disabled={isLoading} type='submit' icon={faCheck}>Submit</Button> : <Button onClick={handleEdit} type='button' icon={faEdit}>Edit</Button>}
            </EditGroup>
        </Form>
    )

}

export default EmailEdit;