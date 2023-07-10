import { useState, useEffect } from 'react';
import SaveIcon from '../../../../../assets/icons/save.svg';
import AssingIcon from '../../../../../assets/icons/assign.svg';
import { db, fb, functions, storage } from '../../../../../services/firebase';
import useAuth from '../../../../../contexts/auth-context/useAuth';
import useError from '../../../../../contexts/error-context/useError';
import { ProjectTaskEditorHeading, ProjectTaskEditorButton, ProjectTaskEditorButtonIcon, ProjectTaskEditorContainer } from './ProjectTaskEditor.styles';
import {
    ProjectTaskHeadContainer,
    ProjectTaskPerformerContainer,
    ProjectTaskPerformerProfileImage,
    ProjectTaskSmallButton,
    ProjectTaskSmallButtonIcon,
    ProjectTaskButtonsContainer,
    ProjectTaskPerformerWrapper,
} from '../project-task/ProjectTask.styles';
import ProjectTaskPerformerSelect from '../project-task-performer-select/ProjectTaskPerformerSelect';
import ProjectTaskEditorBody from '../project-task-editor-body/ProjectTaskEditorBody';

const ProjectTaskEditor = ({
    setLoading,
    performer = {},
    members: membersIDs,
    title: initialTitle = '',
    description: initialDescription = '',
    taskID,
    creating,
    id,
    setIsEditing,
    file,
    steps: initialSteps = [],
}) => {
    const [selectedPerformer, setSelectedPerformer] = useState(performer);
    const [isSelectingPerformer, setIsSelectingPerformer] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedFile, setSelectedFile] = useState(file);
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [steps, setSteps] = useState(initialSteps);
    const { currentUser } = useAuth();
    const { dispatchError } = useError();

    const toggleOnSelectingPerformer = (e) => {
        e.preventDefault();
        setIsSelectingPerformer(true);
    };

    const createUpdateTask = async (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        if (!title.trim())
            return dispatchError({ type: 'projects/task-title-too-short' });
        if (!description.trim())
            return dispatchError({
                type: 'projects/task-description-too-short',
            });
        for (const step of steps) {
            if (!step.content.trim())
                return dispatchError({ type: 'projects/step-empty' });
        }
        let task = taskID;
        setIsEditing(false);
        if (creating) {
            try {
                const { id: createdTaskID } = await db.collection('tasks').add({
                    performer: selectedPerformer,
                    createdAt: fb.firestore.FieldValue.serverTimestamp(),
                    projectID: id,
                    status: 'pending',
                    title: title.trim(),
                    description: description.trim(),
                    authorID: currentUser.uid,
                    steps: steps,
                });
                task = createdTaskID;
            } catch (error) {
                return dispatchError({ type: 'projects/task-create' });
            }
        } else {
            try {
                await db.collection('tasks').doc(taskID).update({
                    performer: selectedPerformer,
                    title: title.trim(),
                    description: description.trim(),
                    steps: steps,
                });
            } catch (error) {
                return dispatchError({ type: 'projects/task-update' });
            }
        }
        if (selectedFile && selectedFile.type) {
            const moveTaskFile = functions.httpsCallable('moveTaskFile');
            const reader = new FileReader();
            reader.onloadend = async (e) => {
                try {
                    await storage
                        .ref(`temp/tasks/${task}/file`)
                        .putString(e.target.result, 'data_url', {
                            customMetadata: { owner: currentUser.uid },
                        });
                    await moveTaskFile({ taskID: task });
                    const url = await storage
                        .ref(`tasks/${task}/file`)
                        .getDownloadURL();
                    await db
                        .collection('tasks')
                        .doc(task)
                        .update({
                            file: {
                                url: url,
                                name: selectedFile.name,
                            },
                        });
                } catch (error) {
                    dispatchError({ type: 'projects/task-file' });
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    useEffect(() => {
        if (creating) {
            setSelectedPerformer({
                displayName: currentUser.displayName,
                uid: currentUser.uid,
                photoURL: currentUser.photoURL,
            });
        }
    }, [creating, currentUser]);

    useEffect(() => {
        const getUsersData = functions.httpsCallable('getUsersData');
        const getData = async () => {
            try {
                const { data } = await getUsersData({ uids: membersIDs });
                setMembers(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, [membersIDs, setLoading]);

    useEffect(() => {
        setLoading(true);
    }, [setLoading]);

    return (
        <ProjectTaskEditorContainer onSubmit={createUpdateTask} noValidate>
            {isSelectingPerformer ? (
                <ProjectTaskPerformerSelect
                    members={members}
                    setSelectedPerformer={setSelectedPerformer}
                    setIsSelectingPerformer={setIsSelectingPerformer}
                />
            ) : (
                <>
                    <ProjectTaskHeadContainer>
                        <ProjectTaskPerformerWrapper>
                            <ProjectTaskPerformerContainer>
                                <ProjectTaskPerformerProfileImage
                                    src={
                                        selectedPerformer &&
                                        selectedPerformer.photoURL
                                    }
                                    alt="Performer"
                                />
                            </ProjectTaskPerformerContainer>
                            <ProjectTaskEditorHeading>
                                {selectedPerformer &&
                                    selectedPerformer.displayName}
                            </ProjectTaskEditorHeading>
                        </ProjectTaskPerformerWrapper>
                        <ProjectTaskButtonsContainer>
                            <ProjectTaskSmallButton
                                onClick={toggleOnSelectingPerformer}
                                type="button"
                            >
                                <ProjectTaskSmallButtonIcon
                                    src={AssingIcon}
                                    alt="open the menu with option of choosing the performer of the task"
                                />
                            </ProjectTaskSmallButton>
                            <ProjectTaskEditorButton type="submit">
                                <ProjectTaskEditorButtonIcon src={SaveIcon} alt="" />
                                Save
                            </ProjectTaskEditorButton>
                        </ProjectTaskButtonsContainer>
                    </ProjectTaskHeadContainer>
                    <ProjectTaskEditorBody
                        steps={steps}
                        setSteps={setSteps}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        setSelectedFile={setSelectedFile}
                        title={title}
                        description={description}
                        selectedFile={selectedFile}
                    />
                </>
            )}
        </ProjectTaskEditorContainer>
    );
};

export default ProjectTaskEditor;
