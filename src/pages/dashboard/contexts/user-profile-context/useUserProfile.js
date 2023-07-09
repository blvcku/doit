import { useContext } from 'react';
import { UserProfileContext } from './UserProfileContext';

const useUserProfile = () => useContext(UserProfileContext);

export default useUserProfile;
