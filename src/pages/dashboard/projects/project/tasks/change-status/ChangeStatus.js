import { db, functions } from '../../../../../../services/firebase';
import PendingColorIcon from '../../../../../../assets/icons/pending.svg';
import InProgressColorIcon from '../../../../../../assets/icons/inprogress.svg';
import CompletedColorIcon from '../../../../../../assets/icons/completed.svg';
import StatusIcon from '../../../../../../assets/icons/status.svg';
import CloseIcon from '../../../../../../assets/icons/close-grey.svg';
import useError from '../../../../../../contexts/error-context/useError';
import { Container, CloseButton, Wrapper } from './ChangeStatus.styles';

const ChangeStatus = ({
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
        <Container>
            <CloseButton onClick={handleCloseChangingStatus} type="button">
                <img src={CloseIcon} alt="Close status changing window" />
            </CloseButton>
            <img src={StatusIcon} alt="" />
            <h2>Change Status</h2>
            <Wrapper>
                <button
                    onClick={(e) => handleChangeStatus(e, 'pending')}
                    type="button"
                >
                    <img src={PendingColorIcon} alt="" />
                    Pending
                </button>
                <button
                    onClick={(e) => handleChangeStatus(e, 'inprogress')}
                    type="button"
                >
                    <img src={InProgressColorIcon} alt="" />
                    In progress
                </button>
                <button
                    onClick={(e) => handleChangeStatus(e, 'completed')}
                    type="button"
                >
                    <img src={CompletedColorIcon} alt="" />
                    Completed
                </button>
            </Wrapper>
        </Container>
    );
};

export default ChangeStatus;
