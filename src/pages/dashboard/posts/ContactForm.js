import { useState } from 'react';
import { db } from '../../../services/firebase';
import useError from '../../../contexts/error-context/useError';
import useAuth from '../../../contexts/auth-context/useAuth';
import { Form, Label, ContactButtonsContainer } from './Posts.styles';

const ContactForm = ({ id, setContactForm }) => {
    const [message, setMessage] = useState('');
    const {
        currentUser: { uid, email, displayName },
    } = useAuth();
    const { dispatchError } = useError();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        if (!message.trim())
            return dispatchError({ type: 'posts/message-empty' });
        try {
            await db
                .collection('posts')
                .doc(id)
                .collection('messages')
                .doc(uid)
                .set({
                    message: message.trim(),
                    author: {
                        uid: uid,
                        email: email,
                        displayName: displayName,
                    },
                });
            setContactForm(false);
        } catch (error) {
            if (error.code === 'permission-denied')
                dispatchError({ type: 'posts/already-sent-message' });
            else dispatchError({ type: 'posts/failed-to-send-message' });
        }
    };

    const handleCancelContact = (e) => {
        e.preventDefault();
        setContactForm(false);
    };

    const handleChangeMessage = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h3>Contact Form</h3>
            <Label>
                <p>Message:</p>
                <textarea
                    spellCheck="false"
                    value={message}
                    onChange={handleChangeMessage}
                    maxLength="300"
                />
            </Label>
            <ContactButtonsContainer>
                <button onClick={handleCancelContact} type="button">
                    Cancel
                </button>
                <button type="submit">Send</button>
            </ContactButtonsContainer>
        </Form>
    );
};

export default ContactForm;
