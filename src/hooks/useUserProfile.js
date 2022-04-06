import { useContext } from "react";
import { UserProfileContext } from '../contexts/UserProfileContext';

const useUserProfile = () => (
    useContext(UserProfileContext)
)

export default useUserProfile;