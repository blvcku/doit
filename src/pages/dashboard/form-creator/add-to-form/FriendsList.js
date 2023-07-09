import { useEffect, useState } from 'react';
import { functions } from '../../../../services/firebase';
import { useRouteMatch } from 'react-router-dom';
import PlusIcon from '../../../../assets/icons/plus-white.svg';
import useAuth from '../../../../contexts/auth-context/useAuth';
import {
    StatusButton,
    StatusContainer,
    List,
    CustomLink,
} from './AddToForm.styles';
import Loader from '../../../../components/loading/Loader';
import Person from './Person';

const FriendsList = ({
    status,
    setForm,
    addToForm,
    deleteFromForm,
    members,
}) => {
    const [friendsData, setFriendsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUserData: { friends = [] } = {} } = useAuth();
    const { path } = useRouteMatch();

    const setStatusToPublic = (e) => {
        e.preventDefault();
        setForm((prev) => ({ ...prev, status: 'public' }));
    };

    const setStatusToPrivate = (e) => {
        e.preventDefault();
        setForm((prev) => ({ ...prev, status: 'private' }));
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const getUsersData = functions.httpsCallable('getUsersData');
                const { data } = await getUsersData({ uids: friends });
                setFriendsData(data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        getData();
    }, [friends]);

    return (
        <>
            {loading && <Loader />}
            <h2>Add People</h2>
            <StatusContainer status={status}>
                <h3>Status</h3>
                <StatusButton
                    onClick={setStatusToPublic}
                    selected={status === 'public'}
                    type="button"
                >
                    Public
                </StatusButton>
                <StatusButton
                    onClick={setStatusToPrivate}
                    selected={status === 'private'}
                    type="button"
                >
                    Private
                </StatusButton>
            </StatusContainer>
            <CustomLink to={`${path}/projects`}>
                <img src={PlusIcon} alt="Add" />
                From project
            </CustomLink>
            <List>
                {friendsData.map(({ displayName, photoURL, uid }) => (
                    <Person
                        key={uid}
                        displayName={displayName}
                        photoURL={photoURL}
                        uid={uid}
                        deleteFromForm={deleteFromForm}
                        addToForm={addToForm}
                        isAdded={members.includes(uid)}
                    />
                ))}
            </List>
        </>
    );
};

export default FriendsList;
