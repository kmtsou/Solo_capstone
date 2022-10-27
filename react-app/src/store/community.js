const GET_COMMUNITIES = 'communities/getCommunities'
// const GET_COMMUNITY_BY_ID = 'communities/getCommunityById'
const CREATE_COMMUNITY = 'communities/createCommunity'
const EDIT_COMMUNITY = 'communities/editCommunity'
const DELETE_COMMUNITY = 'communities/deleteCommunity'

const getAllCommunities = payload => {
    return {
        type: GET_COMMUNITIES,
        payload
    }
}

// const getCommunityById = payload => {
//     return {
//         type: GET_COMMUNITY_BY_ID,
//         payload
//     }
// }

const createCommunity = payload => {
    return {
        type: CREATE_COMMUNITY,
        payload
    }
}

const editCommunity = payload => {
    return {
        type: EDIT_COMMUNITY,
        payload
    }
}

const deleteCommunity = (id) => {
    return {
        type: DELETE_COMMUNITY,
        id
    }
}

//thunks ------------------------------------------
export const loadCommunities = () => async (dispatch) => {
    const responce = await fetch('/api/communities/')
    if (responce.ok) {
        const data = await responce.json();
        dispatch(getAllCommunities(data.communities))
    }
}

export const createCommunityThunk = (communityData) => async (dispatch) => {
    const responce = await fetch('/api/communities/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(communityData)
    });

    if (responce.ok) {
        const data = await responce.json();
        dispatch(createCommunity(data.community));
        return data.community;
    }
}

export const editCommunityThunk = (communityData, communityId) => async (dispatch) => {
    const responce = await fetch(`/api/communities/${communityId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(communityData)
    });

    if (responce.ok) {
        const data = await responce.json();
        dispatch(editCommunity(data))
        return data;
    }
}

export const deleteCommunityThunk = (communityId) => async (dispatch) => {
    const responce = await fetch(`/api/communities/${communityId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
    if (responce.ok) {
        const data = await responce.json();
        dispatch(deleteCommunity(communityId))
        return data
    }
}


// const initialState = {communities: []}

const communityReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_COMMUNITIES:
            const allCommunities = {};
            action.payload.forEach(community => {
                allCommunities[community.id] = community
            });
            return { ...allCommunities };
        // case GET_COMMUNITY_BY_ID:
        //     const newState = {};
        //     newState[action.payload.id] = action.payload
        //     return {allCommunities: {...state.allCommunities}, communityById: {...newState}};
        case CREATE_COMMUNITY:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_COMMUNITY:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_COMMUNITY:
            const removeState = { ...state }
            delete removeState[action.id]
            return removeState;
        default:
            return state;
    }
}

export default communityReducer;
