import { db, functions } from "../../../../../firebase";
import PendingColorIcon from '../../../../../images/pendingcolor.svg';
import InProgressColorIcon from '../../../../../images/inprogresscolor.svg';
import CompletedColorIcon from '../../../../../images/completedcolor.svg';
import StatusIcon from '../../../../../images/status.svg';
import CloseIcon from '../../../../../images/close.svg';
import useError from "../../../../../hooks/useError";
import { Container, CloseButton, Wrapper } from "./ChangeStatus.styles";

const ChangeStatus = ({setIsChangingStatus, taskID, isOwner, isPerformer}) => {

    const { dispatchError } = useError();

    const handleChangeStatus = async(e, status) => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        if(!isOwner && !isPerformer) return;
        try{
            setIsChangingStatus(false);
            if(isOwner){
                await db.collection('tasks').doc(taskID).update({
                    status: status
                });
            }
            else{
                const setTaskStatus = functions.httpsCallable('setTaskStatus');
                await setTaskStatus({id: taskID, status: status});
            }
        }
        catch(error){
            dispatchError({type: 'projects/task-status'});
        }
    }

    const handleCloseChangingStatus = e => {
        e.preventDefault();
        setIsChangingStatus(false);
    }

    return(
        <Container>
            <CloseButton onClick={handleCloseChangingStatus} type='button'>
                <img src={CloseIcon} alt='Close' />
            </CloseButton>
            <img src={StatusIcon} alt='Status' />
            <h2>Change Status</h2>
            <Wrapper>
                <button onClick={e => handleChangeStatus(e, 'pending')} type='button'>
                    <img src={PendingColorIcon} alt='Pending' />
                    Pending
                </button>
                <button onClick={e => handleChangeStatus(e, 'inprogress')} type='button'>
                    <img src={InProgressColorIcon} alt='In progress' />
                    In progress
                </button>
                <button onClick={e => handleChangeStatus(e, 'completed')} type='button'>
                    <img src={CompletedColorIcon} alt='Completed' />
                    Completed
                </button>
            </Wrapper>
        </Container>
    )
}

export default ChangeStatus;