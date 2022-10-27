import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCommunities } from "../../store/community";
import CommunityIndexCard from "./CommunityIndexCard";

function CommunityIndex() {
    const user = useSelector(state => state.session.user)
    const communities = useSelector(state => state.communities)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCommunities())
    }, [dispatch])

    if (!communities) return null
    const communitiesArr = Object.values(communities)

    return (
        <div className="community-index-container">
            <div className="community-index-header">
                <div>Communities</div>
            </div>
            <div className="community-index-list">
                {communitiesArr.map((community, index) => (
                    <CommunityIndexCard community={community} index={index} key={`community ${community.id}`}/>
                ))}

            </div>
        </div>
    )
};

export default CommunityIndex;
