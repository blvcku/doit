import { Link, useRouteMatch } from "react-router-dom";
import PlusIcon from '../../../../images/pluswhite.svg';
import SearchIcon from '../../../../images/searchwhite.svg';
import DefaultImage from '../../../../images/defaultProject.jpg';
import useAuth from "../../../../hooks/useAuth";
import { ProjectContainer } from "./AddToForm.styles";

const Project = ({photoURL, title, projectMembers, members, setForm, id}) => {

    const { path } = useRouteMatch();
    const { currentUser: { uid } } = useAuth(); 

    const handleAddEveryone = e => {
        e.preventDefault();
        const tempMembers = new Set([...members, ...projectMembers]);
        //delete creator of form from form members
        tempMembers.delete(uid);
        setForm(prev => ({...prev, members: [...tempMembers]}));
    }

    return(
        <ProjectContainer photoURL={photoURL || DefaultImage} >
            <div>
                <h3>{title}</h3>
                <Link to={`${path}/${id}`}>
                    <img src={SearchIcon} alt='See' />
                    See people
                </Link>
                <button onClick={handleAddEveryone} type='button'>
                    <img src={PlusIcon} alt='Add' />
                    Add everyone
                </button>
            </div>
        </ProjectContainer>
    )
}

export default Project;