import { useState, useEffect } from 'react';
import EditIcon from '../../images/project/tasks/editsmall.svg';
import ArrowIcon from '../../images/project/tasks/arrow.svg';
import DeleteIcon from '../../images/delete.svg';
import { db } from '../../firebase';

import useAuth from "../../hooks/useAuth";
import useTimeSince from '../../hooks/useTimeSince';
import useConfirmBox from '../../hooks/useConfirmBox';
import useError from '../../hooks/useError';
import useFileType from '../../hooks/useFileType';

import { PostContainer, FlexContainer, AuthorInformations, ButtonsContainer, DeleteButton, ExpandButton, Description, FileContainer, ContactButton } from "./Posts.styles";
import PostCreator from './PostCreator';
import ContactForm from './ContactForm';

const Post = ({innerRef, title, authorID, author, createdAt, id, description, fileURL, fileType}) => {

    const { currentUser: {uid} } = useAuth();
    const [isOwner, setIsOwner] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const { setSeconds, timeSince } = useTimeSince();
    const { setConfirmInfo } = useConfirmBox();
    const { dispatchError } = useError();
    const [isEditing, setIsEditing] = useState(false);
    const { setFile, fileElement } = useFileType();
    const [contactForm, setContactForm] = useState(false);

    useEffect(() => {
        if(authorID === uid) setIsOwner(true);
        else setIsOwner(false);
    }, [uid, authorID]);

    useEffect(() => {
        setSeconds(createdAt.seconds);
    }, [createdAt.seconds, setSeconds]);

    useEffect(() => {
        if(fileURL && fileType){
            setFile({file: fileURL, type: fileType, name: 'file'});
        }
    }, [fileURL, fileType, setFile]);

    const handleToggleExpanded = e => {
        e.preventDefault();
        setExpanded(prev => !prev);
    }

    const handleDeletePost = e => {
        e.preventDefault();
        setConfirmInfo({message: 'delete this post', action: deletePost});
    }

    const deletePost = async () => {
        dispatchError({type: 'reset'});
        try{
            await db.collection('posts').doc(id).delete();
        }
        catch(error){
            dispatchError({type: 'posts/failed-to-delete'});
        }
    }

    const handleTurnOnEditing = e => {
        e.preventDefault();
        setIsEditing(true);
    }

    const handleOpenContactForm = e => {
        e.preventDefault();
        setContactForm(true);
    }

    return(
        <li ref={innerRef}>
            {contactForm ? (
                <ContactForm id={id} setContactForm={setContactForm} />
            ) : (
                isEditing ? (
                    <PostCreator setIsEditing={setIsEditing} isCreating={false} initialTitle={title} initialDescription={description} initialFileURL={fileURL} initialFileType={fileType} postID={id} />
                ) : (
                    <PostContainer>
                        <h3>{title}</h3>
                        <FlexContainer>
                            <AuthorInformations>
                                <img src={author.photoURL} alt={author.displayName} />
                                <h4>{author.displayName}</h4>
                                <p>{timeSince}</p>
                            </AuthorInformations>
                            <ButtonsContainer>
                                {isOwner && (
                                    <>
                                        <DeleteButton onClick={handleDeletePost} type='button'>
                                            <img src={DeleteIcon} alt='delete' />
                                        </DeleteButton>
                                        <button onClick={handleTurnOnEditing} type='button'>
                                            <img src={EditIcon} alt='edit' />
                                        </button>
                                    </>
                                )}
                                <ExpandButton onClick={handleToggleExpanded} expanded={expanded} type='button'>
                                    <img src={ArrowIcon} alt='expand' />
                                </ExpandButton>
                            </ButtonsContainer>
                        </FlexContainer>
                        {expanded && (
                            <>
                                <Description>{description}</Description>
                                {fileURL && fileType && (
                                    <FileContainer>
                                        <div style={{marginTop: '1rem'}}>
                                            {fileElement}
                                        </div>
                                    </FileContainer>
                                )}
                                {!isOwner && (
                                    <ContactButton onClick={handleOpenContactForm} >
                                        Contact
                                    </ContactButton>
                                )}
                            </>
                        )}
                    </PostContainer>
                )
            )}
        </li>
    )
}

export default Post;