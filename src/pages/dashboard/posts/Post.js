import { useState, useEffect } from 'react';
import EditIcon from '../../../assets/icons/edit.svg';
import ArrowIcon from '../../../assets/icons/arrow.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import { functions } from '../../../services/firebase';
import useAuth from '../../../contexts/auth-context/useAuth';
import useTimeSince from '../../../hooks/useTimeSince';
import useConfirmBox from '../../../contexts/confirm-box-context/useConfirmBox';
import useError from '../../../contexts/error-context/useError';
import useFileType from '../../../hooks/useFileType';
import useUserProfile from '../contexts/user-profile-context/useUserProfile';
import {
    PostContainer,
    FlexContainer,
    AuthorInformations,
    ButtonsContainer,
    DeleteButton,
    ExpandButton,
    Description,
    FileContainer,
    ContactButton,
} from './Posts.styles';
import PostCreator from './PostCreator';
import ContactForm from './ContactForm';
import Loader from '../../../components/loading/Loader';

const Post = ({
    innerRef,
    title,
    authorID,
    author,
    createdAt,
    id,
    description,
    file,
}) => {
    const {
        currentUser: { uid },
    } = useAuth();
    const [isOwner, setIsOwner] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const { setSeconds, timeSince } = useTimeSince();
    const { setConfirmInfo } = useConfirmBox();
    const { dispatchError } = useError();
    const { setUserID } = useUserProfile();
    const [isEditing, setIsEditing] = useState(false);
    const { setFile, FileElement } = useFileType();
    const [contactForm, setContactForm] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (authorID === uid) setIsOwner(true);
        else setIsOwner(false);
    }, [uid, authorID]);

    useEffect(() => {
        setSeconds(createdAt.seconds);
    }, [createdAt.seconds, setSeconds]);

    useEffect(() => {
        setFile(file);
    }, [file, setFile]);

    const openUserProfile = (e) => {
        e.preventDefault();
        setUserID(authorID);
    };

    const handleToggleExpanded = (e) => {
        e.preventDefault();
        setExpanded((prev) => !prev);
    };

    const handleDeletePost = (e) => {
        e.preventDefault();
        setConfirmInfo({ message: 'delete this post', action: deletePost });
    };

    const deletePost = async () => {
        dispatchError({ type: 'reset' });
        try {
            setLoading(true);
            const deletePost = functions.httpsCallable('deletePost');
            await deletePost({ id: id });
        } catch (error) {
            dispatchError({ type: 'posts/failed-to-delete' });
        }
        setLoading(false);
    };

    const handleTurnOnEditing = (e) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const handleOpenContactForm = (e) => {
        e.preventDefault();
        setContactForm(true);
    };

    return (
        <li ref={innerRef}>
            {contactForm ? (
                <ContactForm id={id} setContactForm={setContactForm} />
            ) : isEditing ? (
                <PostCreator
                    setIsEditing={setIsEditing}
                    isCreating={false}
                    initialTitle={title}
                    initialDescription={description}
                    initialFile={file}
                    postID={id}
                />
            ) : (
                <PostContainer>
                    {loading && <Loader />}
                    <h3>{title}</h3>
                    <FlexContainer>
                        <AuthorInformations>
                            <img
                                style={{ cursor: 'pointer' }}
                                onClick={openUserProfile}
                                src={author.photoURL}
                                alt={author.displayName}
                            />
                            <h4>{author.displayName}</h4>
                            <p>{timeSince}</p>
                        </AuthorInformations>
                        <ButtonsContainer>
                            {isOwner && (
                                <>
                                    <DeleteButton
                                        onClick={handleDeletePost}
                                        type="button"
                                    >
                                        <img
                                            src={DeleteIcon}
                                            alt="delete post"
                                        />
                                    </DeleteButton>
                                    <button
                                        onClick={handleTurnOnEditing}
                                        type="button"
                                    >
                                        <img src={EditIcon} alt="edit post" />
                                    </button>
                                </>
                            )}
                            <ExpandButton
                                onClick={handleToggleExpanded}
                                expanded={expanded}
                                type="button"
                            >
                                <img src={ArrowIcon} alt="expand post" />
                            </ExpandButton>
                        </ButtonsContainer>
                    </FlexContainer>
                    {expanded && (
                        <>
                            <Description>{description}</Description>
                            {file && file.url && (
                                <FileContainer>
                                    <div style={{ marginTop: '1rem' }}>
                                        {FileElement}
                                    </div>
                                </FileContainer>
                            )}
                            {!isOwner && (
                                <ContactButton onClick={handleOpenContactForm}>
                                    Contact
                                </ContactButton>
                            )}
                        </>
                    )}
                </PostContainer>
            )}
        </li>
    );
};

export default Post;
