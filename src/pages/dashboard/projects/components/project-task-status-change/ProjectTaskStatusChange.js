import { db, functions } from '../../../../../services/firebase';
import PendingColorIcon from '../../../../../assets/icons/pending.svg';
import InProgressColorIcon from '../../../../../assets/icons/inprogress.svg';
import CompletedColorIcon from '../../../../../assets/icons/completed.svg';
import StatusIcon from '../../../../../assets/icons/status.svg';
import CloseIcon from '../../../../../assets/icons/close-grey.svg';
import useError from '../../../../../contexts/error-context/useError';
import {
    ProjectTaskStatusChangeContainer,
    ProjectTaskStatusChangeCloseButton,
    ProjectTaskStatusChangeCloseButtonIcon,
    ProjectTaskStatusChangeHeading,
    ProjectTaskStatusChangeIcon,
    ProjectTaskStatusChangeButtonsContainer,
    ProjectTaskStatusChangeButton,
    ProjectTaskStatusChangeButtonIcon,
} from './ProjectTaskStatusChange.styles';

const ProjectTaskStatusChange = ({
    setIsChangingStatus,
    taskID,
    isOwner,
    isPerformer,
}) => {
    const { dispatchError } = useError();

    const handleChangeStatus = async (e, status) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        if (!isOwner && !isPerformer) return;
        try {
            setIsChangingStatus(false);
            if (isOwner) {
                await db.collection('tasks').doc(taskID).update({
                    status: status,
                });
            } else {
                const setTaskStatus = functions.httpsCallable('setTaskStatus');
                await setTaskStatus({ id: taskID, status: status });
            }
        } catch (error) {
            dispatchError({ type: 'projects/task-status' });
        }
    };

    const handleCloseChangingStatus = (e) => {
        e.preventDefault();
        setIsChangingStatus(false);
    };

    return (
        <ProjectTaskStatusChangeContainer>
            <ProjectTaskStatusChangeCloseButton
                onClick={handleCloseChangingStatus}
                type="button"
            >
                <ProjectTaskStatusChangeCloseButtonIcon
                    src={CloseIcon}
                    alt="Close status changing window"
                />
            </ProjectTaskStatusChangeCloseButton>
            <ProjectTaskStatusChangeIcon src={StatusIcon} alt="" />
            <ProjectTaskStatusChangeHeading>
                Change Status
            </ProjectTaskStatusChangeHeading>
            <ProjectTaskStatusChangeButtonsContainer>
                <ProjectTaskStatusChangeButton
                    onClick={(e) => handleChangeStatus(e, 'pending')}
                    type="button"
                >
                    <ProjectTaskStatusChangeButtonIcon
                        src={PendingColorIcon}
                        alt=""
                    />
                    Pending
                </ProjectTaskStatusChangeButton>
                <ProjectTaskStatusChangeButton
                    onClick={(e) => handleChangeStatus(e, 'inprogress')}
                    type="button"
                >
                    <ProjectTaskStatusChangeButtonIcon
                        src={InProgressColorIcon}
                        alt=""
                    />
                    In progress
                </ProjectTaskStatusChangeButton>
                <ProjectTaskStatusChangeButton
                    onClick={(e) => handleChangeStatus(e, 'completed')}
                    type="button"
                >
                    <ProjectTaskStatusChangeButtonIcon
                        src={CompletedColorIcon}
                        alt=""
                    />
                    Completed
                </ProjectTaskStatusChangeButton>
            </ProjectTaskStatusChangeButtonsContainer>
        </ProjectTaskStatusChangeContainer>
    );
};

export default ProjectTaskStatusChange;
