import { useState, useEffect } from 'react';
import PendingIcon from '../../../images/project/tasks/pending.svg';
import InProgressIcon from '../../../images/project/tasks/inprogress.svg';
import CompletedIcon from '../../../images/project/tasks/completed.svg';
import DeleteIcon from '../../../images/delete.svg';
import EditIcon from '../../../images/project/tasks/editsmall.svg';
import ArrowIcon from '../../../images/project/tasks/arrow.svg';
import PendingColorIcon from '../../../images/project/tasks/pendingcolor.svg';
import InProgressColorIcon from '../../../images/project/tasks/inprogresscolor.svg';
import CompletedColorIcon from '../../../images/project/tasks/completedcolor.svg';
import StatusIcon from '../../../images/project/tasks/status.svg';
import CloseIcon from '../../../images/x.svg';
import { db, functions } from '../../../firebase';

import useError from '../../../hooks/useError';
import useConfirmBox from '../../../hooks/useConfirmBox';
import useAuth from '../../../hooks/useAuth';

import { TaskContainer, FirstGroup, SecondGroup, ImageContainer, StatusButton, FlexContainer, SmallButton, Button, SelectMenu, CloseButton, GridContainer } from "../Main.styles";
import TaskEdit from './TaskEdit';
import Loader from '../../loading/Loader';

const Task = ({isOwner, status, title, description, members, taskID, performer, id}) => {

    const [statusButton, setStatusButton] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const { dispatchError } = useError();
    const { setConfirmInfo } = useConfirmBox();
    const { currentUser } = useAuth();
    const [isPerformer, setIsPerformer] = useState(false);
    const [loading, setLoading] = useState(false);

    const changeStatus = async(e, status) => {
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
            dispatchError({type: 'reset'});
        }
        catch(error){
            dispatchError({type: 'projects/task-status'});
        }
    }

    const handleCloseSelecting = e => {
        e.preventDefault();
        setIsChangingStatus(false);
    }

    const turnOnEditing = e => {
        e.preventDefault();
        if(!isOwner) return;
        setExpanded(false);
        setIsEditing(true);
    }

    const toggleExpanded = e => {
        e.preventDefault();
        setExpanded(prev => !prev);
    }

    const handleDeleteTask = e => {
        e.preventDefault();
        if(!isOwner) return;
        setConfirmInfo({message: 'delete this task', action: deleteTask});
    }

    const deleteTask = async() => {
        try{
            dispatchError({type: 'reset'});
            await db.collection('tasks').doc(taskID).delete();
            dispatchError({type: 'reset'});
        }
        catch(error){
            dispatchError({type: 'projects/task-delete'});
        }
    }

    useEffect(() => {
        if(performer.uid === currentUser.uid){
            setIsPerformer(true);
        }
        else{
            setIsPerformer(false);
        }
    }, [currentUser, performer])

    useEffect(() => {
        const turnOnChangingStatus = e => {
            e.preventDefault();
            if(!isOwner && !isPerformer) return;
            setIsChangingStatus(true);
        }
        switch(status){
            case 'pending':
                return setStatusButton(
                    <StatusButton onClick={turnOnChangingStatus} isPerformer={isPerformer} isOwner={isOwner} color='#db382c'>
                        <img src={PendingIcon} alt='Pending' />
                        PENDING
                    </StatusButton>
                );
            case 'inprogress':
                return setStatusButton(
                    <StatusButton onClick={turnOnChangingStatus} isPerformer={isPerformer} isOwner={isOwner} color='#db8a00'>
                        <img src={InProgressIcon} alt='In progress' />
                        IN PROGRESS
                    </StatusButton>
                );
            case 'completed':
                return setStatusButton(
                    <StatusButton onClick={turnOnChangingStatus} isPerformer={isPerformer} isOwner={isOwner} color='#018c5c'>
                        <img src={CompletedIcon} alt='Completed' />
                        COMPLETED
                    </StatusButton>
                );
            default:
                return setStatusButton(
                    <StatusButton onClick={turnOnChangingStatus} isPerformer={isPerformer} isOwner={isOwner} color='#db382c' >
                        <img src={PendingIcon} alt='Pending' />
                        PENDING
                    </StatusButton>
                )
        }
    }, [status, isOwner, isPerformer]);

    return(
        <TaskContainer>
            {loading && <Loader />}
            {isEditing ? (
                <TaskEdit 
                    performer={performer}
                    members={members}
                    title={title}
                    description={description}
                    taskID={taskID}
                    isOwner={isOwner}
                    creating={false}
                    id={id}
                    setIsEditing={setIsEditing}
                    setLoading={setLoading}
                />
            ) : (
                isChangingStatus ? (
                    <SelectMenu>
                        <CloseButton onClick={handleCloseSelecting} type='button'>
                            <img src={CloseIcon} alt='Close' />
                        </CloseButton>
                        <img src={StatusIcon} alt='Status' />
                        <h2>CHANGE STATUS</h2>
                        <GridContainer>
                            <button onClick={e => changeStatus(e, 'pending')} type='button'>
                                <img src={PendingColorIcon} alt='Pending' />
                                PENDING
                            </button>
                            <button onClick={e => changeStatus(e, 'inprogress')} type='button'>
                                <img src={InProgressColorIcon} alt='In progress' />
                                IN PROGRESS
                            </button>
                            <button onClick={e => changeStatus(e, 'completed')} type='button'>
                                <img src={CompletedColorIcon} alt='Completed' />
                                COMPLETED
                            </button>
                        </GridContainer>
                    </SelectMenu>
                ) : ( 
                    <>
                        <FirstGroup>
                            <div>
                                <ImageContainer>
                                    <img src={performer.photoURL} alt='Performer' />
                                    <figcaption>{performer.displayName}</figcaption>
                                </ImageContainer>
                                <h2>{title}</h2>
                            </div>
                            <div>
                                <FlexContainer>
                                    {statusButton}
                                    {isOwner ? (
                                        <SmallButton onClick={handleDeleteTask} color='#DB382C'>
                                            <img src={DeleteIcon} alt='Delete' />
                                        </SmallButton>
                                    ) : null}
                                </FlexContainer>
                                <FlexContainer>
                                    {isOwner ? (
                                        <Button onClick={turnOnEditing}>
                                            <img src={EditIcon} alt='Edit' />
                                        </Button>
                                    ) : null}
                                    <Button onClick={toggleExpanded} expanded={expanded}>
                                        <img src={ArrowIcon} alt='Arrow' />
                                    </Button>
                                </FlexContainer>
                            </div>
                        </FirstGroup>
                        <hr />
                        {expanded ? (
                            <SecondGroup>
                                <h3>Description:</h3>
                                <p>{description}</p>
                            </SecondGroup>
                        ) : null}
                    </>
                )
            )}
        </TaskContainer>
    )
}

export default Task;