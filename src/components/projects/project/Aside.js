import { useState, useEffect } from 'react';
import { functions } from '../../../firebase';
import CalendarIcon from '../../../images/calendar.svg';
import PeopleAssignedIcon from '../../../images/peopleassignedwhite.svg';
import DeleteIcon from '../../../images/delete.svg';
import ChatIcon from '../../../images/chat.svg';
import { useHistory, Link } from 'react-router-dom';
import useConfirmBox from '../../../hooks/useConfirmBox';
import useError from '../../../hooks/useError';
import { AsideContainer, DateContainer, ButtonsContainer } from "./Project.styles";

const Aside = ({isEditing, isOwner, date, id}) => {

    const history = useHistory();
    const { dispatchError } = useError();
    const [minDate, setMinDate] = useState('');
    const [formatedDate, setFormatedDate] = useState();
    const { setConfirmInfo } = useConfirmBox();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const today = new Date();
        setMinDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)
    }, [])

    useEffect(() => {
        if(date){
            setFormatedDate(new Date(date).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}));
        }
    }, [date])

    const handleDeleteProject = e => {
        e.preventDefault();
        setConfirmInfo({message: 'delete this project', action: deleteProject});
    }

    const deleteProject = async () => {
        try{
            setLoading(true);
            const deleteProjectFunction = functions.httpsCallable('deleteProject');
            dispatchError({type: 'reset'});
            await deleteProjectFunction({id: id});
            return history.push('/dashboard');
        }
        catch(error){
            dispatchError({type: 'projects/delete'});
        }
        setLoading(false);
    }

    const handleLeaveProject = e => {
        e.preventDefault();
        setConfirmInfo({message: 'leave this project', action: leaveProject});
    }

    const leaveProject = async () => {
        try{
            setLoading(true);
            const leaveProjectFunction = functions.httpsCallable('leaveProject');
            dispatchError({type: 'reset'});
            await leaveProjectFunction({projectID: id});
            return history.push('/dashboard');
        }
        catch(error){
            dispatchError({type: 'projects/leave'});
        }
        setLoading(false);
    }

    return(
        <AsideContainer>
            <DateContainer>
                <img src={CalendarIcon} alt='Calendar'/>
                <h2>Due:</h2>
                {isEditing ? (
                    <input form='main-form' defaultValue={date} name='date' min={minDate} aria-label='Due date' type='date' />
                ) : (
                    <p>{formatedDate ? formatedDate : 'Not set'}</p>
                )}
            </DateContainer>
            <ButtonsContainer>
                {isOwner ? (
                        <button disabled={loading} style={{background: '#DB382C'}} onClick={handleDeleteProject} type='button' aria-label='Delete project'>
                            <img src={DeleteIcon} alt='delete' />
                            Delete Project
                        </button>
                    ) : (
                        <button disabled={loading} style={{background: '#DB382C'}} onClick={handleLeaveProject} type='button' aria-label='Delete project'>
                            Leave Project
                        </button>
                )}
                <Link to={`/dashboard/projects/${id}/members`}>
                    <img src={PeopleAssignedIcon} alt='People Assigned' />
                    People Assigned
                </Link>
                <Link to={`/dashboard/projects/${id}/chat`}>
                    <img src={ChatIcon} alt='chat' />
                    Chat
                </Link>
            </ButtonsContainer>
        </AsideContainer>
    )
}

export default Aside;