import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PlusIcon from '../../images/plus-white.svg';
import { db, fb, storage, functions } from '../../firebase';
import useFileType from '../../hooks/useFileType';
import useError from '../../hooks/useError';
import useAuth from '../../hooks/useAuth';
import { Form, Label, TitleInput, FileContainer, SubmitButton } from "./Posts.styles";

const PostCreator = ({setIsEditing, isCreating = true, initialTitle = 'POST TITLE', initialDescription = '', initialFile = {url: null, type: null, name: null}, postID}) => {

    const [title, setTitle] = useState(initialTitle);
    const titleRef = useRef();
    const [description, setDescription] = useState(initialDescription);
    const { setFile, file, FileElement } = useFileType();
    const { dispatchError } = useError();
    const [loading, setLoading] = useState(false);
    const { currentUser: {uid, photoURL, displayName} } = useAuth();
    const history = useHistory();

    const handleChangeTitle = e => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const handleChangeDescription = e => {
        e.preventDefault();
        setDescription(e.target.value);
    }

    const handleChangeFile = e => {
        e.preventDefault();
        const file = e.target.files[0];
        if(!file) return;
        if(!file.type.startsWith('audio') && !file.type.startsWith('video') && !file.type.startsWith('image')) return dispatchError({type: 'posts/wrong-file-type'});
        const reader = new FileReader();
        reader.onloadend = async e => {
            try{
                setFile({url: e.target.result, name: file.name, type: file.type});
            }
            catch(error){
                console.error(error);
            }
        }
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        titleRef.current.focus();
    }, [titleRef]);

    useEffect(() => {
        if(isCreating) return;
        setFile(initialFile);
    }, [initialFile, isCreating, setFile]);

    const handleCreatePost = async e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        if(!title.trim()) return dispatchError({type: 'posts/title-empty'});
        if(!description.trim()) return dispatchError({type: 'posts/description-empty'});
        setLoading(true);
        try{
            const { id } = await db.collection('posts').add({
                createdAt: fb.firestore.FieldValue.serverTimestamp(),
                author:{
                    displayName: displayName,
                    photoURL: photoURL
                },
                authorID: uid,
                file: {
                    url: null,
                    type: null,
                    name: null
                },
                title: title.trim(),
                description: description.trim() 
            });
            if(file && file.url && file.type){
                const movePostFile = functions.httpsCallable('movePostFile');
                await storage.ref(`temp/posts/${id}/file`).putString(file.url, 'data_url', {customMetadata: {'owner': uid} });
                await movePostFile({postID: id});
                const url = await storage.ref(`posts/${id}/file`).getDownloadURL();
                await db.collection('posts').doc(id).update({
                    file:{
                        url: url,
                        type: file.type,
                        name: file.name
                    }
                });
            }
        }  
        catch(error){
            dispatchError({type: 'posts/failed-to-create'});
        }
        setLoading(false);
        return history.push('/dashboard/posts/myposts');
    }

    const handleUpdatePost = async e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        if(!title.trim()) return dispatchError({type: 'posts/title-empty'});
        if(!description.trim()) return dispatchError({type: 'posts/description-empty'});
        setLoading(true);
        try{
            await db.collection('posts').doc(postID).update({
                title: title.trim(),
                description: description.trim()
            });
            if(file && file.url && file.url !== initialFile.url){
                const movePostFile = functions.httpsCallable('movePostFile');
                await storage.ref(`temp/posts/${postID}/file`).putString(file.url, 'data_url', {customMetadata: {'owner': uid} });
                await movePostFile({postID: postID});
                const url = await storage.ref(`posts/${postID}/file`).getDownloadURL();
                await db.collection('posts').doc(postID).update({
                    file:{
                        url: url,
                        type: file.type,
                        name: file.name
                    }
                });
            }
        }
        catch(error){
            dispatchError({type: 'posts/failed-to-edit'});
        }
        setLoading(false);
        setIsEditing(false);
    }

    return(
        <Form onSubmit={isCreating ? handleCreatePost : handleUpdatePost}>
            <TitleInput spellCheck='false' maxLength='50' ref={titleRef} type='text' name='title' value={title} onChange={handleChangeTitle} />
            <Label>
                <p>Content:</p>
                <textarea spellCheck='false' onChange={handleChangeDescription} value={description} maxLength='600' />
            </Label>
            <FileContainer type={file && file.type} >
                <label>
                    <img src={PlusIcon} alt='' />
                    Add File
                    <input type='file' name='file' onChange={handleChangeFile} />
                </label>
                {file && file.url && (
                    <div>
                        {FileElement}
                    </div>
                )}
            </FileContainer>
            <SubmitButton type='submit' loading={loading} >
                <p>{isCreating ? 'Create' : 'Save'}</p>
                <svg version="1.1" width="40px" height="40px" viewBox="0 0 50 50" >
                    <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                        <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="0.6s"
                        repeatCount="indefinite"/>
                    </path>
                </svg>
            </SubmitButton>
        </Form>
    )
}

export default PostCreator;