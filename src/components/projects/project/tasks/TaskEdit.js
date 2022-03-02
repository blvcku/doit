import { useState, useEffect } from 'react';
import SaveIcon from '../../../../images/project/tasks/save.svg';
import AssingIcon from '../../../../images/project/tasks/ppladd.svg';
import { db, fb, functions, storage } from '../../../../firebase';

import useAuth from '../../../../hooks/useAuth';
import useError from '../../../../hooks/useError';

import { TaskEditHead, ImageContainer, SmallButton, SaveButton } from "./Tasks.styles";
import SelectPerformer from './selectPerformer/SelectPerformer';
import TaskEditBody from './TaskEditBody';

const TaskEdit = ({setLoading, performer, members: membersIDs, title: initialTitle, description: initialDescription, taskID, creating, id, setIsEditing, file, steps: initialSteps}) => {

    const [selectedPerformer, setSelectedPerformer] = useState();
    const [isSelectingPerformer, setIsSelectingPerformer] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [steps, setSteps] = useState([]);
    const { currentUser } = useAuth();
    const { dispatchError } = useError();

    const toggleOnSelectingPerformer = e => {
        e.preventDefault();
        setIsSelectingPerformer(true);
    }

    const createUpdateTask = async e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        if(title.trim().length === 0) return dispatchError({type: 'projects/task-title-too-short'});
        if(description.trim().length === 0) return dispatchError({type: 'projects/task-description-too-short'});
        for(const step of steps){
            if(!step.content.trim()) return dispatchError({type: 'projects/step-empty'});
        }
        let task = taskID;
        setIsEditing(false);
        if(creating){
            try{
                const { id:createdTaskID } = await db.collection('tasks').add({
                    performer: selectedPerformer,
                    createdAt: fb.firestore.FieldValue.serverTimestamp(),
                    projectID: id,
                    status: 'pending',
                    title: title.trim(),
                    description: description.trim(),
                    authorID: currentUser.uid,
                    steps: steps
                });
                task = createdTaskID;
            }
            catch(error){
                return dispatchError({type: 'projects/task-create'})
            }
        }
        else{
            try{
                await db.collection('tasks').doc(taskID).update({
                    performer: selectedPerformer,
                    title: title.trim(),
                    description: description.trim(),
                    steps: steps
                });
            }
            catch(error){
                return dispatchError({type: 'projects/task-update'})
            }
        }
        if(selectedFile && selectedFile.type){
            const moveTaskFile = functions.httpsCallable('moveTaskFile');
            const reader = new FileReader();
            reader.onloadend = async e => {
                try{
                    await storage.ref(`temp/tasks/${task}/file`).putString(e.target.result, 'data_url', { customMetadata: { owner: currentUser.uid } });
                    await moveTaskFile({taskID: task});
                    const url = await storage.ref(`tasks/${task}/file`).getDownloadURL();
                    await db.collection('tasks').doc(task).update({
                        file:{
                            url: url,
                            name: selectedFile.name
                        }
                    })
                }
                catch(error){
                    dispatchError({type: 'projects/task-file'});
                }
            }
            reader.readAsDataURL(selectedFile);
        }
    }

    useEffect(() => {
        if(creating){
            setSelectedPerformer({
                displayName: currentUser.displayName,
                uid: currentUser.uid,
                photoURL: currentUser.photoURL
            });
        }
        else{
            setSelectedPerformer(performer);
            setSelectedFile(file);
            setTitle(initialTitle);
            setDescription(initialDescription)
            setSteps(initialSteps);
        }
    }, [creating, performer, currentUser, file, initialTitle, initialDescription, initialSteps]);

    useEffect(() => {
        const getUsersData = functions.httpsCallable('getUsersData');
        const getData = async () => {
            try{
                const { data } = await getUsersData({uids: membersIDs});
                setMembers(data);
                setLoading(false);
            }
            catch(error){
                console.error(error);
            }
        }
        getData();
    }, [membersIDs, setLoading])

    useEffect(() => {
        setLoading(true);
    }, [setLoading])

    return(
        <form onSubmit={createUpdateTask} noValidate>
            {isSelectingPerformer ? (
                <SelectPerformer 
                    members={members} 
                    setSelectedPerformer={setSelectedPerformer} 
                    setIsSelectingPerformer={setIsSelectingPerformer}
                /> 
            ) : (
                <>
                    <TaskEditHead>
                        <div>
                            <ImageContainer>
                                <img src={selectedPerformer && selectedPerformer.photoURL} alt='Performer' />
                            </ImageContainer>
                            <h2>{selectedPerformer && selectedPerformer.displayName}</h2>
                        </div>
                        <div>
                            <SmallButton onClick={toggleOnSelectingPerformer} type='button'>
                                <img src={AssingIcon} alt='Assing' />
                            </SmallButton>
                            <SaveButton type='submit'>
                                <img src={SaveIcon} alt='Submit' />
                                Save
                            </SaveButton>
                        </div>
                    </TaskEditHead>
                    <hr />
                    <TaskEditBody 
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
        </form>
    )
}

export default TaskEdit;