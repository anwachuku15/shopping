import {AsyncStorage} from 'react-native'
export const AUTHENTICATE = 'AUTHENTICATE'
// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


export const signup = (email, password) => {
    return async dispatch => {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjFDet9PN8mZjani67TVYKumPfqouGQyE',
        {
            method: 'POST',
            headesr: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!res.ok) {
            const err = await res.json()
            const errorMessage = err.error.message
            let message = 'Something went wrong'
            if (errorMessage === 'EMAIL_EXISTS') {
                message = 'This email exists already.'
            }
            throw new Error(message)
        }
        
        const resData = await res.json()

        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000))
        // dispatch({
        //     type: SIGNUP,
        //     token: resData.idToken,
        //     userId: resData.localId
        // })
        const expDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjFDet9PN8mZjani67TVYKumPfqouGQyE',
        {
            method: 'POST',
            headesr: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!res.ok) {
            const error = await res.json()
            const err = error.error
            let message = 'Something went wrong'
            if (err.code === 400) {
                message = 'Invalid credentials. Try again.'
            }
            throw new Error(message)
            // const errorMessage = error.error.message
            // if (errorMessage === 'EMAIL_NOT_FOUND') {
            //     message = 'Email doesn\'t exist'
            // } else if (errorMessage === 'INVALID_PASSWORD') {
            //     message = 'Wrong password. Try again.'
            // }
        }
        
        const resData = await res.json()
        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000))
        // dispatch({
        //     type: LOGIN,
        //     token: resData.idToken,
        //     userId: resData.localId
        // })
        const expDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expDate)
    }
}

export const authenticate = (token, userId, expTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expTime))
        dispatch({
            type: AUTHENTICATE,
            token: token,
            userId: userId
        })
    }
}

const saveDataToStorage = (token, userId, expDate) => {
    AsyncStorage.setItem('authData', JSON.stringify({
        token: token,
        userId: userId,
        expDate: expDate.toISOString()
    }))
}

let timer

const setLogoutTimer = exp => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, exp)
    }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('authData')
    return {type: LOGOUT }
}




