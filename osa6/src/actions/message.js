
export const addMessage = (message, time) => {

    return async dispatch => {

        dispatch({
            type: 'ADD_MESSAGE',
            message
        })

        setTimeout(() => {
            dispatch({
                type: 'ADD_MESSAGE',
                message: ''
            })
        }, time * 1000)
    }
}