import { useHistory, Switch, Route, useRouteMatch } from 'react-router-dom';
import CloseIcon from '../../../../assets/icons/close.svg';
import { Container, CloseButton } from './AddToForm.styles';
import FriendsList from './FriendsList';
import ProjectsList from './ProjectsList';
import ProjectMembers from './ProjectMembers';

const AddToForm = ({ status, setForm, members }) => {
    const history = useHistory();
    const { path } = useRouteMatch();

    const handleClose = (e) => {
        e.preventDefault();
        history.goBack();
    };

    const addToForm = (e, uid) => {
        e.preventDefault();
        const tempMembers = new Set([...members]);
        tempMembers.add(uid);
        setForm((prev) => ({ ...prev, members: [...tempMembers] }));
    };

    const deleteFromForm = (e, uid) => {
        e.preventDefault();
        const tempMembers = new Set([...members]);
        tempMembers.delete(uid);
        setForm((prev) => ({ ...prev, members: [...tempMembers] }));
    };

    return (
        <Container status={status}>
            <CloseButton type="button" onClick={handleClose}>
                <img src={CloseIcon} alt="Close window" />
            </CloseButton>
            <Switch>
                <Route
                    exact
                    path={path}
                    render={() => (
                        <FriendsList
                            status={status}
                            setForm={setForm}
                            addToForm={addToForm}
                            deleteFromForm={deleteFromForm}
                            members={members}
                        />
                    )}
                />
                <Route
                    exact
                    path={`${path}/projects`}
                    render={() => (
                        <ProjectsList
                            setForm={setForm}
                            status={status}
                            members={members}
                        />
                    )}
                />
                <Route
                    path={`${path}/projects/:id`}
                    render={() => (
                        <ProjectMembers
                            status={status}
                            members={members}
                            deleteFromForm={deleteFromForm}
                            addToForm={addToForm}
                            setForm={setForm}
                        />
                    )}
                />
            </Switch>
        </Container>
    );
};

export default AddToForm;
