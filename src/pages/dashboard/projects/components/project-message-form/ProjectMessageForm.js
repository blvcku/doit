import { useState } from 'react';
import { db, fb, functions, storage } from '../../../../../services/firebase';
import PhotoIcon from '../../../../../assets/icons/photo.svg';
import SendIcon from '../../../../../assets/icons/send.svg';
import useAuth from '../../../../../contexts/auth-context/useAuth';
import useError from '../../../../../contexts/error-context/useError';
import {
    ProjectMessageFormButton,
    ProjectMessageFormButtonIcon,
    ProjectMessageFormContainer,
    ProjectMessageFormFileInput,
    ProjectMessageFormInput,
    ProjectMessageFormInputsContainer,
    ProjectMessageFormLabel,
    ProjectMessageFormLabelIcon,
} from './ProjectMessageForm.styles';

const ProjectMessageForm = ({ id, scrollElement, scrolledToBottom }) => {
    const {
        currentUser: { uid, displayName, photoURL },
    } = useAuth();
    const { dispatchError } = useError();
    const [sendingMessage, setSendingMessage] = useState(false);
    const [message, setMessage] = useState('');

    const handleChangeMessage = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    };

    const handleSendPhotoMessage = (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        const file = e.target.files[0];
        if (!file) return;
        if (
            !file.type.startsWith('audio') &&
            !file.type.startsWith('video') &&
            !file.type.startsWith('image')
        )
            return dispatchError({ type: 'projects/message-wrong-file-type' });
        const reader = new FileReader();
        reader.onloadend = async (e) => {
            try {
                const moveMessageFile =
                    functions.httpsCallable('moveMessageFile');
                const fileID = `${Date.now()}${id}`;
                await storage
                    .ref(`temp/projects/${id}/messages/${fileID}`)
                    .putString(e.target.result, 'data_url', {
                        customMetadata: { owner: uid },
                    });
                await moveMessageFile({ projectID: id, fileID: fileID });
                const url = await storage
                    .ref(`projects/${id}/messages/${fileID}`)
                    .getDownloadURL();
                await db
                    .collection('projects')
                    .doc(id)
                    .collection('messages')
                    .add({
                        createdAt: fb.firestore.FieldValue.serverTimestamp(),
                        author: {
                            uid: uid,
                            displayName: displayName,
                            photoURL: photoURL,
                        },
                        file: {
                            url: url,
                            type: file.type,
                            name: file.name,
                        },
                    });
                scrollElement.current.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                dispatchError({ type: 'projects/failed-send-message' });
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (sendingMessage) return;
        setSendingMessage(true);
        dispatchError({ type: 'reset' });
        if (message.trim()) {
            try {
                await db
                    .collection('projects')
                    .doc(id)
                    .collection('messages')
                    .add({
                        createdAt: fb.firestore.FieldValue.serverTimestamp(),
                        author: {
                            uid: uid,
                            displayName: displayName,
                            photoURL: photoURL,
                        },
                        message: message.trim(),
                    });
                setMessage('');
                scrollElement.current.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                dispatchError({ type: 'projects/failed-send-message' });
            }
        }
        setSendingMessage(false);
    };

    return (
        <ProjectMessageFormContainer
            onSubmit={handleSendMessage}
            autoComplete="off"
        >
            <ProjectMessageFormInputsContainer>
                <ProjectMessageFormInput
                    scrolledToBottom={scrolledToBottom}
                    maxLength="150"
                    value={message}
                    onChange={handleChangeMessage}
                    placeholder="Write something..."
                    type="text"
                    name="message"
                />
                <ProjectMessageFormLabel>
                    <ProjectMessageFormFileInput
                        onChange={handleSendPhotoMessage}
                        type="file"
                        name="file"
                    />
                    <ProjectMessageFormLabelIcon
                        src={PhotoIcon}
                        alt="Attach file"
                    />
                </ProjectMessageFormLabel>
            </ProjectMessageFormInputsContainer>
            <ProjectMessageFormButton
                scrolledToBottom={scrolledToBottom}
                disabled={sendingMessage}
                type="submit"
            >
                <ProjectMessageFormButtonIcon
                    src={SendIcon}
                    alt="Send message"
                />
            </ProjectMessageFormButton>
        </ProjectMessageFormContainer>
    );
};

export default ProjectMessageForm;
