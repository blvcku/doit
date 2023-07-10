import { useState, useEffect } from 'react';
import PendingIcon from '../../../../../assets/icons/pending-white.svg';
import InProgressIcon from '../../../../../assets/icons/inprogress-white.svg';
import CompletedIcon from '../../../../../assets/icons/completed-white.svg';
import DeleteIcon from '../../../../../assets/icons/delete.svg';
import EditIcon from '../../../../../assets/icons/edit.svg';
import ArrowIcon from '../../../../../assets/icons/arrow.svg';
import FileIcon from '../../../../../assets/icons/file.svg';
import { db, functions } from '../../../../../services/firebase';
import useError from '../../../../../contexts/error-context/useError';
import useConfirmBox from '../../../../../contexts/confirm-box-context/useConfirmBox';
import useAuth from '../../../../../contexts/auth-context/useAuth';
import useUserProfile from '../../../contexts/user-profile-context/useUserProfile';
import {
    ProjectTaskContainer,
    ProjectTaskHeadContainer,
    ProjectTaskPerformerContainer,
    ProjectTaskPerformerProfileImage,
    ProjectTaskPerformerName,
    ProjectTaskHeadHeading,
    ProjectTaskSmallButton,
    ProjectTaskSmallButtonIcon,
    ProjectTaskPerformerWrapper,
    ProjectTaskButtonsContainer,
    ProjectTaskStatusButton,
    ProjectTaskStatusButtonIcon,
    ProjectTaskBodyContainer,
    ProjectTaskButton,
    ProjectTaskButtonIcon,
    ProjectTaskStepContainer,
    ProjectTaskStepInput,
    ProjectTaskStepLabel,
    ProjectTaskBodyHeading,
    ProjectTaskBodyDescription,
    ProjectTaskBodyStepsContainer,
    ProjectTaskFileDownloadButton,
    ProjectTaskFileDownloadButtonIcon,
    ProjectTaskFileDownloadButtonText,
    ProjectTaskButtonsWrapper,
    ProjectTaskBodyDescriptionContainer,
    ProjectTaskBodyStepsWrapper,
    ProjectTaskFileDownloadContainer,
} from './ProjectTask.styles';
import ProjectTaskEditor from '../project-task-editor/ProjectTaskEditor';
import ProjectTaskStatusChange from '../project-task-status-change/ProjectTaskStatusChange';
import Loader from '../../../../../components/loading/Loader';

const ProjectTask = ({
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
        if (!isPerformer) return;
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
        <ProjectTaskContainer>
            {loading && <Loader />}
            {isEditing ? (
                <ProjectTaskEditor
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
                <ProjectTaskStatusChange
                    setIsChangingStatus={setIsChangingStatus}
                    taskID={taskID}
                    isOwner={isOwner}
                    isPerformer={isPerformer}
                />
            ) : (
                <>
                    <ProjectTaskHeadContainer>
                        <ProjectTaskPerformerWrapper>
                            <ProjectTaskPerformerContainer>
                                <ProjectTaskPerformerProfileImage
                                    style={{ cursor: 'pointer' }}
                                    onClick={openUserProfile}
                                    src={performer.photoURL}
                                    alt=""
                                />
                                <ProjectTaskPerformerName>
                                    {performer.displayName}
                                </ProjectTaskPerformerName>
                            </ProjectTaskPerformerContainer>
                            <ProjectTaskHeadHeading>
                                {title}
                            </ProjectTaskHeadHeading>
                        </ProjectTaskPerformerWrapper>
                        <ProjectTaskButtonsContainer>
                            <ProjectTaskButtonsWrapper>
                                <ProjectTaskStatusButton
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
                                    <ProjectTaskStatusButtonIcon
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
                                </ProjectTaskStatusButton>
                                {isOwner ? (
                                    <ProjectTaskSmallButton
                                        onClick={handleDeleteTask}
                                        color="#DB382C"
                                    >
                                        <ProjectTaskSmallButtonIcon
                                            src={DeleteIcon}
                                            alt="Delete task"
                                        />
                                    </ProjectTaskSmallButton>
                                ) : null}
                            </ProjectTaskButtonsWrapper>
                            <ProjectTaskButtonsWrapper>
                                {isOwner ? (
                                    <ProjectTaskButton onClick={turnOnEditing}>
                                        <ProjectTaskButtonIcon
                                            src={EditIcon}
                                            alt="Edit task"
                                        />
                                    </ProjectTaskButton>
                                ) : null}
                                <ProjectTaskButton
                                    onClick={toggleExpanded}
                                    aria-expanded={expanded}
                                    expanded={expanded}
                                >
                                    <ProjectTaskButtonIcon
                                        src={ArrowIcon}
                                        alt="expand or condense task"
                                    />
                                </ProjectTaskButton>
                            </ProjectTaskButtonsWrapper>
                        </ProjectTaskButtonsContainer>
                    </ProjectTaskHeadContainer>
                    {expanded ? (
                        <ProjectTaskBodyContainer>
                            <ProjectTaskBodyDescriptionContainer>
                                <ProjectTaskBodyHeading>
                                    Description:
                                </ProjectTaskBodyHeading>
                                <ProjectTaskBodyDescription>
                                    {description}
                                </ProjectTaskBodyDescription>
                            </ProjectTaskBodyDescriptionContainer>
                            {steps.length !== 0 && (
                                <ProjectTaskBodyStepsWrapper>
                                    <ProjectTaskBodyHeading as="h5">
                                        Steps:
                                    </ProjectTaskBodyHeading>
                                    <ProjectTaskBodyStepsContainer>
                                        {steps.map(
                                            ({ content, checked }, index) => (
                                                <ProjectTaskStepContainer
                                                    key={`${index}${checked}`}
                                                >
                                                    <ProjectTaskStepInput
                                                        onChange={() =>
                                                            handleChangeStepStatus(
                                                                index,
                                                            )
                                                        }
                                                        defaultChecked={checked}
                                                        disabled={!isPerformer}
                                                        type="checkbox"
                                                        id={`step${index}`}
                                                    />
                                                    <ProjectTaskStepLabel
                                                        htmlFor={`step${index}`}
                                                    >
                                                        {content}
                                                    </ProjectTaskStepLabel>
                                                </ProjectTaskStepContainer>
                                            ),
                                        )}
                                    </ProjectTaskBodyStepsContainer>
                                </ProjectTaskBodyStepsWrapper>
                            )}
                            {file && (
                                <ProjectTaskFileDownloadContainer>
                                    <ProjectTaskBodyHeading as="h6">
                                        Task Files:
                                    </ProjectTaskBodyHeading>
                                    <ProjectTaskFileDownloadButton
                                        href={file.url}
                                        download
                                        target="_blank"
                                    >
                                        <ProjectTaskFileDownloadButtonIcon
                                            src={FileIcon}
                                            alt=""
                                        />
                                        <ProjectTaskFileDownloadButtonText>
                                            {file.name}
                                        </ProjectTaskFileDownloadButtonText>
                                    </ProjectTaskFileDownloadButton>
                                </ProjectTaskFileDownloadContainer>
                            )}
                        </ProjectTaskBodyContainer>
                    ) : null}
                </>
            )}
        </ProjectTaskContainer>
    );
};

export default ProjectTask;
