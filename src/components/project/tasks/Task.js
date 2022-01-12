import { useState, useEffect } from 'react';
import PendingIcon from '../../../images/project/tasks/pending.svg';
import InProgressIcon from '../../../images/project/tasks/inprogress.svg';
import CompletedIcon from '../../../images/project/tasks/completed.svg';
import DeleteIcon from '../../../images/delete.svg';
import EditIcon from '../../../images/project/tasks/editsmall.svg';
import ArrowIcon from '../../../images/project/tasks/arrow.svg';
import FileIcon from '../../../images/project/tasks/file.svg';
import { db, functions } from '../../../firebase';

import useError from '../../../hooks/useError';
import useConfirmBox from '../../../hooks/useConfirmBox';
import useAuth from '../../../hooks/useAuth';

import { TaskContainer, TaskHead, TaskBody, ImageContainer, StatusButton, FlexContainer, SmallButton, Button, Step, DownloadFile } from "./Tasks.styles";
import TaskEdit from './TaskEdit';
import ChangeStatus from './changeStatus/ChangeStatus';
import Loader from '../../loading/Loader';

const Task = ({isOwner, status, title, description, members, taskID, performer, id, file, steps }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const { dispatchError } = useError();
    const { setConfirmInfo } = useConfirmBox();
    const { currentUser } = useAuth();
    const [isPerformer, setIsPerformer] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangeStepStatus = async index => {
        dispatchError({type: 'reset'});
        if(!isPerformer && !isOwner) return;
        try{
            if(isOwner){
                const tempSteps = steps;
                tempSteps[index].checked = !tempSteps[index].checked;
                await db.collection('tasks').doc(taskID).update({
                    steps: tempSteps
                });
            }
            else{
                const setStepStatus = functions.httpsCallable('setStepStatus');
                await setStepStatus({id: taskID, index: index});
            }
        }
        catch(error){
            dispatchError({type: 'projects/step-failed'});
        }
    }

    const turnOnEditing = e => {
        e.preventDefault();
        setExpanded(false);
        setIsEditing(true);
    }

    const turnOnChangingStatus = e => {
        e.preventDefault();
        if(!isOwner && !isPerformer) return;
        setIsChangingStatus(true);
    }

    const toggleExpanded = e => {
        e.preventDefault();
        setExpanded(prev => !prev);
    }

    const handleDeleteTask = e => {
        e.preventDefault();
        setConfirmInfo({message: 'delete this task', action: deleteTask});
    }

    const deleteTask = async() => {
        try{
            dispatchError({type: 'reset'});
            await db.collection('tasks').doc(taskID).delete();
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
                    creating={false}
                    id={id}
                    setIsEditing={setIsEditing}
                    setLoading={setLoading}
                    file={file}
                    steps={steps}
                />
            ) : (
                isChangingStatus ? (
                    <ChangeStatus 
                        setIsChangingStatus={setIsChangingStatus}
                        taskID={taskID}
                        isOwner={isOwner}
                        isPerformer={isPerformer}
                    />
                ) : ( 
                    <>
                        <TaskHead>
                            <div>
                                <ImageContainer>
                                    <img src={performer.photoURL} alt='Performer' />
                                    <figcaption>{performer.displayName}</figcaption>
                                </ImageContainer>
                                <h2>{title}</h2>
                            </div>
                            <div>
                                <FlexContainer>
                                <StatusButton onClick={turnOnChangingStatus} isPerformer={isPerformer} isOwner={isOwner} color={{'pending': '#db382c', 'inprogress': '#db8a00', 'completed': '#018c5c'}[status]} >
                                    <img src={{'pending': PendingIcon, 'inprogress': InProgressIcon, 'completed': CompletedIcon}[status]} alt='Pending' />
                                    {
                                        {
                                            'inprogress': 'In progress'
                                        }[status] || status
                                    }
                                </StatusButton>
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
                        </TaskHead>
                        <hr />
                        {expanded ? (
                            <TaskBody>
                                <div>
                                    <h3>Description:</h3>
                                    <p>{description}</p>
                                </div>
                                {steps && 
                                    <div>
                                        <h4>Steps:</h4>
                                        <ul>
                                            {steps.map(({content, checked}, index) => (
                                                <Step isOwner={isOwner} key={`${index}${checked}`}>
                                                    <input onChange={() => handleChangeStepStatus(index)} defaultChecked={checked} disabled={!(isOwner || isPerformer)} type='checkbox' id={`step${index}`} />
                                                    <label htmlFor={`step${index}`}>{content}</label>
                                                </Step>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                {file &&
                                    <div>
                                        <h5>Task Files:</h5>
                                        <DownloadFile href={file.url} download>
                                            <img src={FileIcon} alt='file' />
                                            <p>{file.name}</p>
                                        </DownloadFile>
                                    </div>
                                }
                            </TaskBody>
                        ) : null}
                    </>
                )
            )}
        </TaskContainer>
    )
}

export default Task;