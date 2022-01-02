import React, { useState, useEffect } from 'react';
import { auth, storage, db } from '../firebase';

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [currentUserData, setCurrentUserData] = useState({});

    const signUp = async (email, password) => {
        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            const [username] = email.split('@');
            const photoURL = await storage.ref('users/default/default.jpg').getDownloadURL();
            return await user.updateProfile({displayName: username, photoURL: photoURL});
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

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if(currentUser){
            const unsubscribe = db.collection('users').doc(currentUser.uid).onSnapshot(snapshot => {
                const data = snapshot.data();
                setCurrentUserData(data);
                setLoading(false);
            })
            return unsubscribe;
        }
    }, [currentUser])

    const value = {
        currentUserData,
        currentUser,
        signUp,
        login,
        logout,
        resetPassword
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;