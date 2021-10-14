const errorReducer = (state, action) => {
    switch(action.type){
        case 'auth/email-already-exists':
            return state = 'This email address is already being used.';
        case 'auth/email-already-in-use':
            return state = 'This email address is already being used.';
        case 'auth/invalid-password':
            return state = 'Invalid email or password.';
        case 'auth/wrong-password':
            return state = 'Invalid email or password.';
        case 'auth/user-not-found':
            switch(action.cat){
                case 'resetpassword':
                    return state = 'The account with given address email does not exist.';
                default:
                    return state = 'Invalid email or password.';
            }
        case 'auth/passwords-not-match':
            return state = 'Passwords do not match.';
        case 'auth/invalid-email':
            return state = 'Given email address is not valid.';
        case 'auth/password-too-short':
            return state = 'Your password is too short. Minimum 6 characters.';
        case 'reset':
            return state = '';
        default:
            return state = 'Something went wrong. Try again later.';
    }
}

export default errorReducer;