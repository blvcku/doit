import { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { functions, db } from '../../../../firebase';
import PlusIcon from '../../../../images/plus-white.svg';
import useAuth from '../../../../hooks/useAuth';
import { ListOfProjectMembers, AddEveryoneButton } from './AddToForm.styles';
import Loader from '../../../loading/Loader';
import Person from './Person';

const ProjectMembers = ({status, members, deleteFromForm, addToForm, setForm}) => {

    const { id } = useParams();
    const { currentUser: { uid } } = useAuth();
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState({});
    const [membersData, setMembersData] = useState([]);

    const handleAddEveryone = e => {
        e.preventDefault();
        const tempMembers = new Set([...members, ...project.members]);
        //delete creator of form from form members
        tempMembers.delete(uid);
        setForm(prev => ({...prev, members: [...tempMembers]}));
    }

    useEffect(() => {
        const unsubscribe = db.collection('projects').doc(id).onSnapshot(project => {
            setProject({...project.data(), id: project.id});
        }, error => setLoading(false))
        return unsubscribe;
    }, [id]);

    useEffect(() => {
        const getData = async () => {
            try{
                const getUsersData = functions.httpsCallable('getUsersData');
                const { data } = await getUsersData({uids: project.members});
                setMembersData(data);
            }
            catch(error){
                console.error(error);
            }
            setLoading(false);
        }
        if(project.members) getData();
    }, [project]);

    if(status === 'public') return <Redirect to='/dashboard/forms/create/add' />
    return(
        <>
            {loading ? (
                <Loader />
            ) : (
                project.title ? (
                    <>
                        <h2>Adding from <br/>{project.title}</h2>
                        <AddEveryoneButton onClick={handleAddEveryone} type='button'>
                            <img src={PlusIcon} alt='' />
                            Add everyone
                        </AddEveryoneButton>
                        <ListOfProjectMembers>
                            {membersData.map(({photoURL, displayName, uid: memberUID}) => {
                                if(uid === memberUID) return null
                                return(
                                    <Person 
                                        key={memberUID} 
                                        displayName={displayName} 
                                        photoURL={photoURL} 
                                        uid={memberUID} 
                                        deleteFromForm={deleteFromForm}
                                        addToForm={addToForm}
                                        isAdded={members.includes(memberUID)}
                                    />
                                )
                            })}
                        </ListOfProjectMembers>
                    </>
                ) : (
                    <Redirect to='/dashboard/forms/create/add' />
                )
            )}
        </>
    )
}

export default ProjectMembers;