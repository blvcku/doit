import React, { useState, useEffect } from 'react';
import { auth, storage, db, functions } from '../firebase';

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [currentUserData, setCurrentUserData] = useState({});

    const signUp = async (email, password) => {
        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            const [username] = email.split('@');
            const updatedUsername = username.slice(0, 20);
            const photoURL = await storage.ref('users/default/default.jpg').getDownloadURL();
            return await user.updateProfile({displayName: updatedUsername, photoURL: photoURL});
        }
        catch(error){
            return Promise.reject(error);
        }
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const logout = () => {
        return auth.signOut();
    }

    const resetPassword = async (email) => {
        try{
            const sendPasswordResetMail = functions.httpsCallable('sendPasswordResetMail');
            await sendPasswordResetMail({email: email});
        }
        catch(error){
            return Promise.reject(error);
        }
    }

    const deleteAccount = async () => {
        try{
            const deleteUserAccount = functions.httpsCallable('deleteUserAccount');
            return await deleteUserAccount();
        }
        catch(error){
            return Promise.reject(error);
        }
    }

    const updateUsername = async (username) => {
        try{
            await currentUser.updateProfile({displayName: username.trim()});
            await db.collection('users').doc(currentUser.uid).update({
                displayName: username.trim()
            });
        }
        catch(error){
            return Promise.reject(error);
        }
    }

    const updateEmail = async (email) => {
        try{
            await currentUser.updateEmail(email);
            const sendVerifyEmail = functions.httpsCallable('sendVerifyEmail');
            await sendVerifyEmail();
        }
        catch(error){
            return Promise.reject(error);
        }
    }

    const updatePassword = async (password) => {
        try{
            await currentUser.updatePassword(password.trim());
        }
        catch(error){
            return Promise.reject(error);
        }
    }

    const updateProfileImage = async (file) => {
        try{
            await storage.ref(`users/${currentUser.uid}/profile.jpg`).put(file);
            const url = await storage.ref(`users/${currentUser.uid}/profile.jpg`).getDownloadURL();
            await currentUser.updateProfile({photoURL: url});
            await db.collection('users').doc(currentUser.uid).update({
                photoURL: url
            })
        }
        catch(error){
            return Promise.reject(error);
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if(currentUser){
            const unsubscribe = db.collection('users').doc(currentUser.uid).onSnapshot(snapshot => {
                const data = snapshot.data();
                setCurrentUserData(data);
            })
            return unsubscribe;
        }
    }, [currentUser]);

    const value = {
        currentUserData,
        currentUser,
        signUp,
        login,
        logout,
        resetPassword,
        deleteAccount,
        updateUsername,
        updateEmail,
        updatePassword,
        updateProfileImage
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;