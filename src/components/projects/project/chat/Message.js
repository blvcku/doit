import { useState, useLayoutEffect } from 'react';
import useAuth from "../../../../hooks/useAuth";
import useIsToday from '../../../../hooks/useIsToday';
import useFileType from '../../../../hooks/useFileType';
import { MessageContainer, MessageInformations, MessageWrapper } from "./Chat.styles";

const Message = ({author, file, message, createdAt, innerRef, prevSameAuthor, nextSameAuthor}) => {

    const { currentUser: { uid } } = useAuth();
    const { setDate, dateString } = useIsToday();
    const { setFile, FileElement } = useFileType();
    const [isAuthor, setIsAuthor] = useState(false);

    useLayoutEffect(() => {
       setIsAuthor(uid === author.uid); 
    }, [uid, author.uid]);

    useLayoutEffect(() => {
        if(createdAt){
            setDate(new Date(createdAt.toDate()));
        }
    }, [createdAt, setDate]);

    useLayoutEffect(() => {
        setFile(file);
    }, [file, setFile]);

    return(
        <MessageWrapper isAuthor={isAuthor} ref={innerRef}>
            {!prevSameAuthor && (
                <MessageInformations isAuthor={isAuthor} >
                    <div>
                        {!isAuthor && <img src={author.photoURL} alt={author.displayName} />}
                        <p>Message from {isAuthor ? 'you' : author.displayName}</p>
                    </div>
                    <div>
                        <p>{dateString}</p>
                    </div>
                </MessageInformations>
            )}
            <MessageContainer nextSameAuthor={nextSameAuthor} isAuthor={isAuthor} >
                {message && <p>{message}</p>}
                {file && FileElement}
            </MessageContainer>
        </MessageWrapper>
    )
}

export default Message;