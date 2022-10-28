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

const postReducer = (state = {}, action) => {

}

export default postReducer;
