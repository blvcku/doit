import { functions } from "../firebase";

export const deleteFriend = async (uid) => {
    try{
        const deleteFunction = functions.httpsCallable('deleteFriend');
        await deleteFunction({friend: uid})
    }
    catch(error){
        Promise.reject(error);
    }
};

export const requestFriend = async (uid) => {
    try{
        const requestFriendFunction = functions.httpsCallable('requestFriend');
        await requestFriendFunction({requestedFriend: uid});
    }
    catch(error){
        Promise.reject(error);
    }
};

export const deleteRequest = async (uid) => {
    try{
        const deleteRequestFunction = functions.httpsCallable('deleteRequest');
        await deleteRequestFunction({requestedFriend: uid});
    }
    catch(error){
        Promise.reject(error);
    }
};

export const declineInvite = async (uid) => {
    try{
        const declineInviteFunction = functions.httpsCallable('declineInvite');
        await declineInviteFunction({invite: uid});
    }
    catch(error){
        Promise.reject(error);
    }
};

export const acceptInvite = async (uid) => {
    try{
        const acceptInviteFunction = functions.httpsCallable('acceptInvite');
        await acceptInviteFunction({invite: uid});
    }
    catch(error){
        Promise.reject(error);
    }
};