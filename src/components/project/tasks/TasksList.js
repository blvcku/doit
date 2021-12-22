import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import AddIcon from './add.svg';

import { TasksListContainer, CreateTask, CreateTaskButton, TaskContainer } from "../MainContainer.styles";
import Task from './Task';
import TaskEdit from './TaskEdit';

const TasksList = ({isOwner, id, members}) => {

    const [isCreating, setIsCreating] = useState(false);
    const [tasks, setTasks] = useState([]);

    const toggleCreating = e => {
        e.preventDefault();
        if(!isOwner) return;
        setIsCreating(true);
    }

    useEffect(() => {
        const unsubscribe = db.collection('tasks').where('projectID', '==', id).orderBy('createdAt').onSnapshot(snapshot => {
            const tasksList = [];
            snapshot.forEach(task => tasksList.unshift({...task.data(), taskID: task.id}));
            setTasks(tasksList);
        })
        return unsubscribe;
    }, [id])

    return(
        <TasksListContainer>
            {isOwner ? (
                isCreating ? (
                    <TaskContainer>
                        <TaskEdit
                            creating={true}
                            members={members}
                            title={''}
                            description={''}
                            isOwner={isOwner}
                            id={id}
                            setIsEditing={setIsCreating}
                        />
                    </TaskContainer>
                ) : (
                    <CreateTask>
                        <CreateTaskButton onClick={toggleCreating} type='button'>
                            <img src={AddIcon} alt='Create' />
                            <p>Create Task</p>
                        </CreateTaskButton>
                    </CreateTask>
                )
            ) : (
                null
            )}
            {tasks.map(({status, title, description, performer, taskID}, index) => (
                <Task 
                    key={index} 
                    isOwner={isOwner}
                    status={status}
                    title={title}
                    description={description}
                    performer={performer}
                    members={members}
                    taskID={taskID}
                    id={id}
                />
            ))}
        </TasksListContainer>
    )
}

export default TasksList;