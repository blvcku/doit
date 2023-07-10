import { useState, useEffect } from 'react';
import { db } from '../../../../../services/firebase';
import AddIcon from '../../../../../assets/icons/plus.svg';
import {
    ProjectTasksListContainer,
    ProjectTasksListTaskCreatorContainer,
    ProjectTasksListTaskCreateButton,
    ProjectTasksListTaskCreateButtonIcon,
    ProjectTasksListTaskCreateButtonText,
} from './ProjectTasksList.styles';
import { ProjectTaskContainer } from '../project-task/ProjectTask.styles';
import ProjectTask from '../project-task/ProjectTask';
import ProjectTaskEditor from '../project-task-editor/ProjectTaskEditor';
import Loader from '../../../../../components/loading/Loader';

const ProjectTasksList = ({ isOwner, id, members }) => {
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
        <ProjectTasksListContainer>
            {isOwner ? (
                isCreating ? (
                    <ProjectTaskContainer>
                        {loading && <Loader />}
                        <ProjectTaskEditor
                            creating={true}
                            members={members}
                            title={''}
                            description={''}
                            id={id}
                            setIsEditing={setIsCreating}
                            setLoading={setLoading}
                        />
                    </ProjectTaskContainer>
                ) : (
                    <ProjectTasksListTaskCreatorContainer>
                        <ProjectTasksListTaskCreateButton
                            onClick={toggleCreating}
                            type="button"
                        >
                            <ProjectTasksListTaskCreateButtonIcon
                                src={AddIcon}
                                alt=""
                            />
                            <ProjectTasksListTaskCreateButtonText>
                                Create Task
                            </ProjectTasksListTaskCreateButtonText>
                        </ProjectTasksListTaskCreateButton>
                    </ProjectTasksListTaskCreatorContainer>
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
                    <ProjectTask
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
        </ProjectTasksListContainer>
    );
};

export default ProjectTasksList;
