import { useState, useEffect } from 'react';
import { db } from '../../../../firebase';
import AddIcon from '../../../../assets/icons/plus.svg';
import {
    TasksListContainer,
    CreateTask,
    CreateTaskButton,
    TaskContainer,
} from './Tasks.styles';
import Task from './Task';
import TaskEdit from './TaskEdit';
import Loader from '../../../loading/Loader';

const TasksList = ({ isOwner, id, members }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const toggleCreating = (e) => {
        e.preventDefault();
        if (!isOwner) return;
        setIsCreating(true);
    };

    useEffect(() => {
        const unsubscribe = db
            .collection('tasks')
            .where('projectID', '==', id)
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                const tasksList = [];
                snapshot.forEach((task) =>
                    tasksList.unshift({ ...task.data(), taskID: task.id }),
                );
                setTasks(tasksList);
            });
        return unsubscribe;
    }, [id]);

    return (
        <TasksListContainer>
            {isOwner ? (
                isCreating ? (
                    <TaskContainer>
                        {loading && <Loader />}
                        <TaskEdit
                            creating={true}
                            members={members}
                            title={''}
                            description={''}
                            id={id}
                            setIsEditing={setIsCreating}
                            setLoading={setLoading}
                        />
                    </TaskContainer>
                ) : (
                    <CreateTask>
                        <CreateTaskButton
                            onClick={toggleCreating}
                            type="button"
                        >
                            <img src={AddIcon} alt="" />
                            <span>Create Task</span>
                        </CreateTaskButton>
                    </CreateTask>
                )
            ) : null}
            {tasks.map(
                ({
                    status,
                    title,
                    description,
                    performer,
                    taskID,
                    file,
                    steps,
                }) => (
                    <Task
                        key={taskID}
                        isOwner={isOwner}
                        status={status}
                        title={title}
                        description={description}
                        performer={performer}
                        members={members}
                        taskID={taskID}
                        id={id}
                        file={file}
                        steps={steps}
                    />
                ),
            )}
        </TasksListContainer>
    );
};

export default TasksList;
