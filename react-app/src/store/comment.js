const GET_COMMENTS = 'comments/getComments'
const CREATE_ROOT_COMMENT = 'comments/createRootComment'
const EDIT_COMMENT = 'comments/editComment'
const DELETE_COMMENT = 'comments/deleteComment'

const getPostComments = payload => {
    return {
        type: GET_COMMENTS,
        payload
    }
}

const createRootComment = payload => {
    return {
        type: CREATE_ROOT_COMMENT,
        payload
    }
}

const editComment = payload => {
    return {
        type: EDIT_COMMENT,
        payload
    }
}

const deleteComment = (id) => {
    return {
        type: DELETE_COMMENT,
        id
    }
}

//thunks -----------------------------------------

export const getRootCommentsThunk = (postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments`)
    if (response.ok) {
        const data = await response.json();
        dispatch(getPostComments(data.comments))
        return data.comments
    } else {
        return null;
    }
}

export const createRootCommentThunk = (commentData, postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createRootComment(data))
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const editCommentThunk = (commentData, commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editComment(data))
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const deleteCommentThunk = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteComment(commentId))
        return data
    }
}


const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            const rootComments = {};
            action.payload.forEach(comment => {
                rootComments[comment.id] = comment
            })
            return rootComments;
        case CREATE_ROOT_COMMENT:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_COMMENT:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_COMMENT:
            let deleteState = { ...state }
            delete deleteState[action.id]
            return deleteState;
        default:
            return state;
    }
}

export default commentReducer;
