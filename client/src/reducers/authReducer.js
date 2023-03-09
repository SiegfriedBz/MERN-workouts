const [ LOGIN, LOGOUT ] = [ 'LOGIN', 'LOGOUT' ]

export const authReducer = (state, action) => {
    switch(action.type) {
        case LOGIN:
            return { user: action.payload }
        case LOGOUT:
            return { user: null }
        default:
            return state
    }
}
