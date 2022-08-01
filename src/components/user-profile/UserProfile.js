import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import DefaultImage from '../../images/default.jpg';
import CloseIcon from '../../images/close-grey.svg';
import useUserProfile from '../../hooks/useUserProfile';
import useAuth from '../../hooks/useAuth';
import { Container, Wrapper, CloseButton, UserImage } from './UserProfile.styles';
import Loader from '../loading/Loader';
import UserProfileButton from './UserProfileButton';

const UserProfile = () => {

    const { userID, setUserID } = useUserProfile();
    const { currentUser: { uid }, currentUserData: { friends = [], requests = [], invites = [] } = {} } = useAuth();
    const [userData, setUserData] = useState({});
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [status, setStatus] = useState('');

    const handleClose = e => {
        e.preventDefault();
        setUserID('');
        setLoaderVisible(true);
    }

    useEffect(() => {
        if(!userID) return;
        const unsubscribe = db.collection('users').doc(userID).onSnapshot(user => {
            const data = user.data();
            setUserData(data);
            setLoaderVisible(false);
        }, error => setLoaderVisible(false));
        return unsubscribe;
    }, [userID]);

    useEffect(() => {
        if(uid === userID) return setStatus('you');
        if(friends.includes(userID)) return setStatus('friend');
        if(requests.includes(userID)) return setStatus('request');
        if(invites.includes(userID)) return setStatus('invite');
        setStatus('');
    }, [uid, userID, friends, invites, requests]);

    return(
        <>
            {userID && userData.uid &&  (
                <Container>
                    <Wrapper>
                        {loaderVisible && <Loader />}
                        <CloseButton onClick={handleClose} type='button'>
                            <img src={CloseIcon} alt={`Close ${userData.displayName} profile`} />
                        </CloseButton>
                        <UserImage src={userData.photoURL || DefaultImage} alt='' />
                        <p>{userData.displayName}</p>
                        <UserProfileButton setUserID={setUserID} displayName={userData.displayName} uid={userID} status={status}/>
                    </Wrapper>
                </Container>
            )}
        </>
    )
}

export default UserProfile;
