import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import CalendarIcon from '../../../images/calendar.svg';
import PeopleAssignedIcon from '../../../images/peopleassignedwhite.svg';
import { useHistory } from 'react-router-dom';

import useConfirmBox from '../../../hooks/useConfirmBox';
import useError from '../../../hooks/useError';

import { AsideContainer, DateContainer, DeleteButton, PeopleAssignedButton, SecondContainer } from "./Project.styles";

const Aside = ({isEditing, isOwner, date, id}) => {

    const history = useHistory();
    const { dispatchError } = useError();
    const [minDate, setMinDate] = useState('');
    const [formatedDate, setFormatedDate] = useState();
    const { setConfirmInfo } = useConfirmBox();

    useEffect(() => {
        const today = new Date();
        setMinDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)
    }, [])

    useEffect(() => {
        if(date){
            setFormatedDate(new Date(date));
        }
    }, [date])

    const handleDeleteProject = e => {
        e.preventDefault();
        setConfirmInfo({message: 'delete this project', action: deleteProject});
    }

    const deleteProject = async () => {
        try{
            dispatchError({type: 'reset'});
            history.push('/dashboard');
            await db.collection('projects').doc(id).delete();
        }
        catch(error){
            dispatchError({type: 'projects/delete'});
        }
    }

    return(
        <AsideContainer isOwner={isOwner}>
            <DateContainer>
                <img src={CalendarIcon} alt='Calendar'/>
                <h2>Due:</h2>
                {isEditing ? (
                    <input form='main-form' defaultValue={date} name='date' min={minDate} aria-label='Due date' type='date' />
                ) : (
                    <p>{formatedDate ? formatedDate.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}) : 'Not set'}</p>
                )}
            </DateContainer>
            <SecondContainer>
                {isOwner ? (
                        <DeleteButton onClick={handleDeleteProject} type='button' aria-label='Delete project'>
                            Delete Project
                        </DeleteButton>
                    ) : (
                        null
                )}
                <PeopleAssignedButton to={`/dashboard/projects/${id}/members`} isOwner={isOwner}>
                    <img src={PeopleAssignedIcon} alt='People Assigned' />
                    <p>People Assigned</p>
                </PeopleAssignedButton>
            </SecondContainer>
        </AsideContainer>
    )
}

export default Aside;