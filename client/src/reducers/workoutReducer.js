const [
    SET_WORKOUTS, CREATE_WORKOUT, DELETE_WORKOUT] = [
    "SET_WORKOUTS", "CREATE_WORKOUT", "DELETE_WORKOUT"]

export const workoutReducer = (state, action) => {
    switch (action.type) {
        case SET_WORKOUTS:
            return { workouts: action.payload }
        case CREATE_WORKOUT:
            return { workouts: [action.payload, ...state.workouts]}
        case DELETE_WORKOUT:
            return {
                workouts: state.workouts.filter(w => {
                    return w._id !== action.payload._id
                })
            }
        default:
            return state
    }
}
