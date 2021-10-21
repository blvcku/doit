import React, { useRef } from 'react';
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

import useAuth from '../../hooks/useAuth';
import useError from '../../hooks/useError';

import { Form, SubHeading, EditGroup, InputWrapper } from './Profile.styles';
import Button from './Button';

const PasswordEdit = ({isLoading, isEditing, onEdit, setEditPassword, setLoadingState}) => {

    const { currentUser } = useAuth();
    const { dispatchError } = useError();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleEdit = async e => {
        e.preventDefault();
        await onEdit(e);
        passwordRef.current.focus();
    }

    const handleSubmitPassword = async e => {
        e.preventDefault();
        if(passwordRef.current.value.length < 6){
            return dispatchError({type: 'auth/password-too-short'});
        }
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return dispatchError({type: 'auth/passwords-not-match'});
        }
        try{
            setLoadingState(true);
            await currentUser.updatePassword(passwordRef.current.value);
            passwordRef.current.value = '';
            confirmPasswordRef.current.value = '';
            setEditPassword(false);
            dispatchError({type: 'reset'});
        }
        catch(error){
            dispatchError({type: error.code});
        }
        setLoadingState(false);
    }

    return(
        <Form onSubmit={handleSubmitPassword} noValidate>
            <SubHeading isEditing={isEditing}>Password</SubHeading>
            <EditGroup>
                <InputWrapper isEditing={isEditing}>
                    <label htmlFor='password'>Password</label>
                    <input autoComplete='off' disabled={!isEditing} placeholder='Password' id='password' name='password' type='password' ref={passwordRef}/>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input autoComplete='off' disabled={!isEditing} placeholder='Confirm Password' id='confirmPassword' name='confirmPassword' type='password' ref={confirmPasswordRef}/>
                </InputWrapper>
                {isEditing ? <Button disabled={isLoading} type='submit' icon={faCheck}>Submit</Button> : <Button onClick={handleEdit} type='button' icon={faEdit}>Edit</Button>}
            </EditGroup>
        </Form>
    )

}

export default PasswordEdit;