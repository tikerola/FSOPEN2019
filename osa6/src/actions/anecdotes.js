import service from '../services/anecdotes'

export const initialize = () => {
    
    return async dispatch => {
        const anecdotes = await service.getAll()

        dispatch({
            type: 'INITIALIZE',
            anecdotes
        })
    }
    
}

export const vote = id => {
    
    return async dispatch => {
        await service.update(id)

        dispatch({
            type: 'VOTE',
            id
        })

    }
}

export const create = anecdote => {

    return async dispatch => {
        const createdAnecdote = await service.create(anecdote)
        dispatch({
            type: 'CREATE',
            anecdote: createdAnecdote
        })
    }
}