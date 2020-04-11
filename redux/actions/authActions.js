
export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

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
            throw new Error('Something went wrong')
        }
        
        const resData = await res.json()
        console.log(resData)

        dispatch({
            type: SIGNUP,
        })
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
            throw new Error('Something went wrong')
        }
        
        const resData = await res.json()
        console.log(resData)
        
        dispatch({
            type: LOGIN
        })
    }
}