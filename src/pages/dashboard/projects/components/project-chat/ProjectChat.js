import { useRef, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { db, fb } from '../../../../../services/firebase';
import CloseIcon from '../../../../../assets/icons/close-white.svg';
import useInfiniteScrollFirestore from '../../../../../hooks/useInfiniteScrollFirestore';
import ProjectMessage from '../project-message/ProjectMessage';
import ProjectMessageForm from '../project-message-form/ProjectMessageForm';
import Loader from '../../../../../components/loading/Loader';
import {
    ProjectChatBannerButton,
    ProjectChatBannerButtonIcon,
    ProjectChatBannerContainer,
    ProjectChatBannerHeading,
    ProjectChatContainer,
    ProjectChatMessagesContainer,
    ProjectChatWrapper,
} from './ProjectChat.styles';

const ProjectChat = ({ title, id }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const scrollElement = useRef();
    const observer = useRef();
    const containerRef = useRef();
    const previousHeight = useRef(0);
    const [scrolledToBottom, setScrolledToBottom] = useState(true);
    const chunkSize = 15;

    const callback = useCallback(
        (container) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new ResizeObserver(([entry]) => {
                if (scrolledToBottom) scrollElement.current.scrollIntoView();
                else if (
                    containerRef.current.scrollHeight - previousHeight.current
                )
                    containerRef.current.scrollTo(
                        0,
                        containerRef.current.scrollHeight -
                            previousHeight.current,
                    );
            });
            if (container) observer.current.observe(container);
        },
        [scrolledToBottom],
    );

    const handleScroll = (e) => {
        setScrolledToBottom(
            e.target.scrollHeight - e.target.scrollTop ===
                e.target.clientHeight,
        );
        previousHeight.current = containerRef.current.scrollHeight;
    };

    const loadMoreMessages = async () => {
        if (loading) return;
        try {
            const messages = await db
                .collection('projects')
                .doc(id)
                .collection('messages')
                .orderBy('createdAt', 'desc')
                .startAfter(lastTimeStamp)
                .limit(chunkSize)
                .get();
            setHasMore(!messages.empty);
            const messagesArray = [];
            messages.forEach((msg, index) => {
                const { author, createdAt, file, message } = msg.data();
                if (!index) setLastTimeStamp(createdAt);
                messagesArray.unshift({
                    author: author,
                    createdAt: createdAt,
                    file: file,
                    message: message,
                    id: msg.id,
                });
            });
            setMessages((prev) => [...messagesArray, ...prev]);
        } catch (error) {
            console.error(error);
        }
    };

    const {
        last,
        setHasMore,
        lastVisible: lastTimeStamp,
        setLastVisible: setLastTimeStamp,
    } = useInfiniteScrollFirestore(loadMoreMessages);

    const handleCloseChat = (e) => {
        e.preventDefault();
        history.push(`/dashboard/projects/${id}`);
    };

    useEffect(() => {
        if (!messages.length) return;
        const [{ createdAt }] = messages;
        setLastTimeStamp(createdAt);
    }, [messages, setLastTimeStamp]);

    useEffect(() => {
        const unsubscribe = db
            .collection('projects')
            .doc(id)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .limit(chunkSize)
            .onSnapshot(
                (messages) => {
                    const messagesArray = [];
                    messages.docChanges().forEach((change) => {
                        if (change.type === 'added') {
                            const { author, createdAt, file, message } =
                                change.doc.data();
                            messagesArray.unshift({
                                author: author,
                                createdAt: createdAt
                                    ? createdAt
                                    : fb.firestore.Timestamp.fromDate(
                                          new Date(),
                                      ),
                                file: file,
                                message: message,
                                id: change.doc.id,
                            });
                        }
                    });
                    setMessages((prev) => [...prev, ...messagesArray]);
                    setLoading(false);
                },
                (error) => setLoading(false),
            );
        return unsubscribe;
    }, [id]);

    return (
        <ProjectChatContainer>
            {loading && <Loader />}
            <ProjectChatBannerContainer>
                <ProjectChatBannerButton
                    onClick={handleCloseChat}
                    type="button"
                >
                    <ProjectChatBannerButtonIcon
                        src={CloseIcon}
                        alt="Close chat window"
                    />
                </ProjectChatBannerButton>
                <ProjectChatBannerHeading>
                    Chatting with {title}
                </ProjectChatBannerHeading>
            </ProjectChatBannerContainer>
            <ProjectChatWrapper ref={containerRef} onScroll={handleScroll}>
                <ProjectChatMessagesContainer ref={callback}>
                    {messages.map(
                        ({ author, file, message, createdAt, id }, index) => {
                            const props = {
                                key: id,
                                prevSameAuthor:
                                    index > 0 &&
                                    messages[index - 1].author.uid ===
                                        author.uid &&
                                    createdAt.seconds -
                                        messages[index - 1].createdAt.seconds <
                                        1800,
                                nextSameAuthor:
                                    index + 1 < messages.length &&
                                    messages[index + 1].author.uid ===
                                        author.uid &&
                                    messages[index + 1].createdAt.seconds -
                                        createdAt.seconds <
                                        1800,
                                author,
                                file,
                                message,
                                createdAt,
                            };
                            if (!index)
                                return (
                                    <ProjectMessage
                                        innerRef={last}
                                        {...props}
                                    />
                                );
                            return <ProjectMessage {...props} />;
                        },
                    )}
                </ProjectChatMessagesContainer>
                <div ref={scrollElement}></div>
                <ProjectMessageForm
                    scrolledToBottom={scrolledToBottom}
                    id={id}
                    scrollElement={scrollElement}
                />
            </ProjectChatWrapper>
        </ProjectChatContainer>
    );
};

export default ProjectChat;
