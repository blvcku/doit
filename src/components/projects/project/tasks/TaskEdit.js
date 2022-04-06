import { useState, useEffect } from 'react';
import SaveIcon from '../../../../images/save.svg';
import AssingIcon from '../../../../images/assign.svg';
import { db, fb, functions, storage } from '../../../../firebase';
import useAuth from '../../../../hooks/useAuth';
import useError from '../../../../hooks/useError';
import { TaskEditHead, ImageContainer, SmallButton, SaveButton, TaskHeadFirst, TaskHeadSecond } from "./Tasks.styles";
import SelectPerformer from './selectPerformer/SelectPerformer';
import TaskEditBody from './TaskEditBody';

const TaskEdit = ({setLoading, performer = {}, members: membersIDs, title: initialTitle = '', description: initialDescription = '', taskID, creating, id, setIsEditing, file, steps: initialSteps = []}) => {

    const [selectedPerformer, setSelectedPerformer] = useState(performer);
    const [isSelectingPerformer, setIsSelectingPerformer] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedFile, setSelectedFile] = useState(file);
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [steps, setSteps] = useState(initialSteps);
    const { currentUser } = useAuth();
    const { dispatchError } = useError();

    const toggleOnSelectingPerformer = e => {
        e.preventDefault();
        setIsSelectingPerformer(true);
    }

    const createUpdateTask = async e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        if(!title.trim()) return dispatchError({type: 'projects/task-title-too-short'});
        if(!description.trim()) return dispatchError({type: 'projects/task-description-too-short'});
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
    }, [creating, currentUser]);

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
                        <TaskHeadFirst>
                            <ImageContainer>
                                <img src={selectedPerformer && selectedPerformer.photoURL} alt='Performer' />
                            </ImageContainer>
                            <h3>{selectedPerformer && selectedPerformer.displayName}</h3>
                        </TaskHeadFirst>
                        <TaskHeadSecond>
                            <SmallButton onClick={toggleOnSelectingPerformer} type='button'>
                                <img src={AssingIcon} alt='Assing' />
                            </SmallButton>
                            <SaveButton type='submit'>
                                <img src={SaveIcon} alt='Submit' />
                                Save
                            </SaveButton>
                        </TaskHeadSecond>
                    </TaskEditHead>
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