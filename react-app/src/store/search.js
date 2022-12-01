const SEARCH_COMMUNITIES = 'search/searchCommunities'

const getSearchCommunities = (payload) => {
    return {
        type: SEARCH_COMMUNITIES,
        payload
    }
}

export const getSearchCommunitiesThunk = (search) => async dispatch => {
    const responce = await fetch('/api/search/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search })
    });
    if (responce.ok) {
        const data = await responce.json();
        dispatch(getSearchCommunities(data.communities))
        return data
    }
}

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_COMMUNITIES:
            // const searchedProducts = {}
            // action.payload.forEach(product => {
            //     searchedProducts[product.id] = product
            // });
            let searchedCommunitiesArr = action.payload
            return searchedCommunitiesArr
        default:
            return state
    }
}

export default searchReducer;
