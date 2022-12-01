const GET_POST = 'posts/getPost'
const GET_ALL_POSTS = 'posts/getAllPosts'
const GET_COMMUNITY_POSTS = 'posts/getCommunityPosts'
const CREATE_POST = 'posts/createPost'
const EDIT_POST = 'posts/editPost'
const DELETE_POST = 'posts/deletePost'

const getPost = payload => {
    return {
        type: GET_POST,
        payload
    }
}

const getAllPosts = payload => {
    return {
        type: GET_ALL_POSTS,
        payload
    }
}

const getCommunityPosts = payload => {
    return {
        type: GET_COMMUNITY_POSTS,
        payload
    }
}

const createPost = payload => {
    return {
        type: CREATE_POST,
        payload
    }
}

const editPost = payload => {
    return {
        type: EDIT_POST,
        payload
    }
}

const deletePost = (id) => {
    return {
        type: DELETE_POST,
        id
    }
}

//thunks ---------------------------------------------------

export const getAllPostsThunk = () => async dispatch => {
    const response = await fetch('/api/posts/')
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllPosts(data.posts))
    }
}

export const getCommunityPostsThunk = (communityId) => async dispatch => {
    const response = await fetch(`/api/communities/${communityId}/posts`)
    if (response.ok) {
        const data = await response.json();
        dispatch(getCommunityPosts(data.posts))
        return data
    }
}

export const createPostThunk = (postData, communityId) => async dispatch => {
    const response = await fetch(`/api/communities/${communityId}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createPost(data))
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const editPostThunk = (postData, postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editPost(data))
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const deletePostThunk = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(deletePost(id))
        return data;
    }
}


const postReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            const allPosts = {};
            action.payload.forEach(post => {
                allPosts[post.id] = post
            })
            return allPosts;
        case GET_COMMUNITY_POSTS:
            const communityPosts = {};
            action.payload.forEach(post => {
                communityPosts[post.id] = post
            })
            return communityPosts
        case CREATE_POST:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_POST:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_POST:
            const removedState = { ...state }
            delete removedState[action.id]
            return removedState;
        default:
            return state;
    }
}

export default postReducer;
