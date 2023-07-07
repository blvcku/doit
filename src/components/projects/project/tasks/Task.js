import { useState, useEffect } from 'react';
import PendingIcon from '../../../../assets/icons/pending-white.svg';
import InProgressIcon from '../../../../assets/icons/inprogress-white.svg';
import CompletedIcon from '../../../../assets/icons/completed-white.svg';
import DeleteIcon from '../../../../assets/icons/delete.svg';
import EditIcon from '../../../../assets/icons/edit.svg';
import ArrowIcon from '../../../../assets/icons/arrow.svg';
import FileIcon from '../../../../assets/icons/file.svg';
import { db, functions } from '../../../../firebase';
import useError from '../../../../hooks/useError';
import useConfirmBox from '../../../../hooks/useConfirmBox';
import useAuth from '../../../../hooks/useAuth';
import useUserProfile from '../../../../hooks/useUserProfile';
import {
    TaskContainer,
    TaskHead,
    TaskBody,
    ImageContainer,
    StatusButton,
    SmallButton,
    Button,
    Step,
    DownloadFile,
    TaskHeadFirst,
    TaskHeadSecond,
} from './Tasks.styles';
import TaskEdit from './TaskEdit';
import ChangeStatus from './change-status/ChangeStatus';
import Loader from '../../../loading/Loader';

const Task = ({
    isOwner,
    status,
    title,
    description,
    members,
    taskID,
    performer,
    id,
    file,
    steps = [],
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const { dispatchError } = useError();
    const { setConfirmInfo } = useConfirmBox();
    const { setUserID } = useUserProfile();
    const { currentUser } = useAuth();
    const [isPerformer, setIsPerformer] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangeStepStatus = async (index) => {
        dispatchError({ type: 'reset' });
        if (!isPerformer && !isOwner) return;
        try {
            const setStepStatus = functions.httpsCallable('setStepStatus');
            await setStepStatus({ id: taskID, index: index });
        } catch (error) {
            dispatchError({ type: 'projects/step-failed' });
        }
    };

    const turnOnEditing = (e) => {
        e.preventDefault();
        setExpanded(false);
        setIsEditing(true);
    };

    const turnOnChangingStatus = (e) => {
        e.preventDefault();
        if (!isOwner && !isPerformer) return;
        setIsChangingStatus(true);
    };

    const toggleExpanded = (e) => {
        e.preventDefault();
        setExpanded((prev) => !prev);
    };

    const handleDeleteTask = (e) => {
        e.preventDefault();
        setConfirmInfo({ message: 'delete this task', action: deleteTask });
    };

    const deleteTask = async () => {
        try {
            dispatchError({ type: 'reset' });
            await db.collection('tasks').doc(taskID).delete();
        } catch (error) {
            dispatchError({ type: 'projects/task-delete' });
        }
    };

    const openUserProfile = (e) => {
        e.preventDefault();
        setUserID(performer.uid);
    };

    useEffect(() => {
        if (performer.uid === currentUser.uid) {
            setIsPerformer(true);
        } else {
            setIsPerformer(false);
        }
    }, [currentUser, performer]);

    return (
        <TaskContainer>
            {loading && <Loader />}
            {isEditing ? (
                <TaskEdit
                    performer={performer}
                    members={members}
                    title={title}
                    description={description}
                    taskID={taskID}
                    creating={false}
                    id={id}
                    setIsEditing={setIsEditing}
                    setLoading={setLoading}
                    file={file}
                    steps={steps}
                />
            ) : isChangingStatus ? (
                <ChangeStatus
                    setIsChangingStatus={setIsChangingStatus}
                    taskID={taskID}
                    isOwner={isOwner}
                    isPerformer={isPerformer}
                />
            ) : (
                <>
                    <TaskHead>
                        <TaskHeadFirst>
                            <ImageContainer>
                                <img
                                    style={{ cursor: 'pointer' }}
                                    onClick={openUserProfile}
                                    src={performer.photoURL}
                                    alt=""
                                />
                                <figcaption>{performer.displayName}</figcaption>
                            </ImageContainer>
                            <h3>{title}</h3>
                        </TaskHeadFirst>
                        <TaskHeadSecond>
                            <div>
                                <StatusButton
                                    onClick={turnOnChangingStatus}
                                    isPerformer={isPerformer}
                                    isOwner={isOwner}
                                    color={
                                        {
                                            pending: '#db382c',
                                            inprogress: '#db8a00',
                                            completed: '#018c5c',
                                        }[status]
                                    }
                                >
                                    <img
                                        src={
                                            {
                                                pending: PendingIcon,
                                                inprogress: InProgressIcon,
                                                completed: CompletedIcon,
                                            }[status]
                                        }
                                        alt=""
                                    />
                                    {{
                                        inprogress: 'In progress',
                                    }[status] || status}
                                </StatusButton>
                                {isOwner ? (
                                    <SmallButton
                                        onClick={handleDeleteTask}
                                        color="#DB382C"
                                    >
                                        <img
                                            src={DeleteIcon}
                                            alt="Delete task"
                                        />
                                    </SmallButton>
                                ) : null}
                            </div>
                            <div>
                                {isOwner ? (
                                    <Button onClick={turnOnEditing}>
                                        <img src={EditIcon} alt="Edit task" />
                                    </Button>
                                ) : null}
                                <Button
                                    onClick={toggleExpanded}
                                    aria-expanded={expanded}
                                    expanded={expanded}
                                >
                                    <img
                                        src={ArrowIcon}
                                        alt="expand or condense task"
                                    />
                                </Button>
                            </div>
                        </TaskHeadSecond>
                    </TaskHead>
                    {expanded ? (
                        <TaskBody>
                            <div>
                                <h4>Description:</h4>
                                <p>{description}</p>
                            </div>
                            {steps.length !== 0 && (
                                <div>
                                    <h5>Steps:</h5>
                                    <ul>
                                        {steps.map(
                                            ({ content, checked }, index) => (
                                                <Step
                                                    key={`${index}${checked}`}
                                                >
                                                    <input
                                                        onChange={() =>
                                                            handleChangeStepStatus(
                                                                index,
                                                            )
                                                        }
                                                        defaultChecked={checked}
                                                        disabled={
                                                            !(
                                                                isOwner ||
                                                                isPerformer
                                                            )
                                                        }
                                                        type="checkbox"
                                                        id={`step${index}`}
                                                    />
                                                    <label
                                                        htmlFor={`step${index}`}
                                                    >
                                                        {content}
                                                    </label>
                                                </Step>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            )}
                            {file && (
                                <div>
                                    <h6>Task Files:</h6>
                                    <DownloadFile
                                        href={file.url}
                                        download
                                        target="_blank"
                                    >
                                        <img src={FileIcon} alt="" />
                                        <p>{file.name}</p>
                                    </DownloadFile>
                                </div>
                            )}
                        </TaskBody>
                    ) : null}
                </>
            )}
        </TaskContainer>
    );
};

export default Task;
