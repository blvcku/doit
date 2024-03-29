import { useState } from 'react';
import { db, fb, functions, storage } from '../../../../firebase';
import PhotoIcon from '../../../../images/photo.svg';
import SendIcon from '../../../../images/send.svg';

import useAuth from '../../../../hooks/useAuth';
import useError from '../../../../hooks/useError';

import { Form } from "./Chat.styles";

const MessageForm = ({id, scrollElement, scrolledToBottom}) => {

    const { currentUser: { uid, displayName, photoURL } } = useAuth();
    const { dispatchError } = useError();
    const [sendingMessage, setSendingMessage] = useState(false);
    const [message, setMessage] = useState('');

    const handleChangeMessage = e => {
        e.preventDefault();
        setMessage(e.target.value);
    }

    const handleSendPhotoMessage = e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        const file = e.target.files[0];
        if(!file) return;
        if(!file.type.startsWith('audio') && !file.type.startsWith('video') && !file.type.startsWith('image')) return dispatchError({type: 'projects/message-wrong-file-type'});
        const reader = new FileReader();
        reader.onloadend = async e => {
            try{
                const moveMessageFile = functions.httpsCallable('moveMessageFile');
                const fileID = `${Date.now()}${id}`;
                await storage.ref(`temp/projects/${id}/messages/${fileID}`).putString(e.target.result, 'data_url', {customMetadata: {'owner': uid} });
                await moveMessageFile({projectID: id, fileID: fileID});
                const url = await storage.ref(`projects/${id}/messages/${fileID}`).getDownloadURL();
                await db.collection('projects').doc(id).collection('messages').add({
                    createdAt: fb.firestore.FieldValue.serverTimestamp(),
                    author:{
                        uid: uid,
                        displayName: displayName,
                        photoURL: photoURL
                    },
                    file:{
                        url: url,
                        type: file.type,
                        name: file.name
                    }
                });
                scrollElement.current.scrollIntoView({ behavior: 'smooth' });
            }
            catch(error){
                dispatchError({type: 'projects/failed-send-message'});
            }
        }
        reader.readAsDataURL(file);
    }

    const handleSendMessage = async e => {
        e.preventDefault();
        if(sendingMessage) return;
        setSendingMessage(true);
        dispatchError({type: 'reset'});
        if(message.trim()){
            try{
                await db.collection('projects').doc(id).collection('messages').add({
                    createdAt: fb.firestore.FieldValue.serverTimestamp(),
                    author:{
                        uid: uid,
                        displayName: displayName,
                        photoURL: photoURL
                    },
                    message: message.trim()
                });
                setMessage('');
                scrollElement.current.scrollIntoView({ behavior: 'smooth' });
            }
            catch(error){
                dispatchError({type: 'projects/failed-send-message'});
            }
        }
        setSendingMessage(false);
    }

    return(
        <Form scrolledToBottom={scrolledToBottom} onSubmit={handleSendMessage} autoComplete='off'>
            <div>
                <input maxLength='150' value={message} onChange={handleChangeMessage} placeholder='Write something...' type='text' name='message' />
                <label>
                    <input onChange={handleSendPhotoMessage} type='file' name='file'/>
                    <img src={PhotoIcon} alt='Attach file' />
                </label>
            </div>
            <button disabled={sendingMessage} type='submit'>
                <img src={SendIcon} alt='Send message' />
            </button>
        </Form>
    )
}

export default MessageForm;