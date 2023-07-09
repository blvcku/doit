import { useState, useLayoutEffect } from 'react';
import useAuth from '../../../../../contexts/auth-context/useAuth';
import useIsToday from '../../../../../hooks/useIsToday';
import useFileType from '../../../../../hooks/useFileType';
import {
    ProjectMessageAuthor,
    ProjectMessageAuthorContainer,
    ProjectMessageAuthorImage,
    ProjectMessageContainer,
    ProjectMessageDate,
    ProjectMessageInformations,
    ProjectMessageParagraph,
    ProjectMessageWrapper,
} from './ProjectMessage.styles';

const ProjectMessage = ({
    author,
    file,
    message,
    createdAt,
    innerRef,
    prevSameAuthor,
    nextSameAuthor,
}) => {
    const {
        currentUser: { uid },
    } = useAuth();
    const { setDate, dateString } = useIsToday();
    const { setFile, FileElement } = useFileType();
    const [isAuthor, setIsAuthor] = useState(false);

    useLayoutEffect(() => {
        setIsAuthor(uid === author.uid);
    }, [uid, author.uid]);

    useLayoutEffect(() => {
        if (createdAt) {
            setDate(new Date(createdAt.toDate()));
        }
    }, [createdAt, setDate]);

    useLayoutEffect(() => {
        setFile(file);
    }, [file, setFile]);

    return (
        <ProjectMessageWrapper isAuthor={isAuthor} ref={innerRef}>
            {!prevSameAuthor && (
                <ProjectMessageInformations>
                    <ProjectMessageAuthorContainer isAuthor={isAuthor}>
                        {!isAuthor && (
                            <ProjectMessageAuthorImage
                                src={author.photoURL}
                                alt={author.displayName}
                            />
                        )}
                        <ProjectMessageAuthor>
                            Message from {isAuthor ? 'you' : author.displayName}
                        </ProjectMessageAuthor>
                    </ProjectMessageAuthorContainer>
                    <ProjectMessageDate>{dateString}</ProjectMessageDate>
                </ProjectMessageInformations>
            )}
            <ProjectMessageContainer
                nextSameAuthor={nextSameAuthor}
                isAuthor={isAuthor}
            >
                {message && (
                    <ProjectMessageParagraph>{message}</ProjectMessageParagraph>
                )}
                {file && FileElement}
            </ProjectMessageContainer>
        </ProjectMessageWrapper>
    );
};

export default ProjectMessage;
