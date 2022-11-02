import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCommunities } from "../../store/community";
import CommunityIndexCard from "./CommunityIndexCard";
import SidebarExtraCard from './SidebarExtraCard'
import './CommunityIndex.css'

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
            <div className="community-index-header-container">
                <div className="community-index-header">
                    <div className="community-index-header-text">Communities</div>
                    <div className="community-index-header-subtext">Browse linkit's growing communities. Find the community that resonates with you!</div>
                </div>
            </div>
            <div className="community-index-content-container">
                <div className="community-index-list">
                    <div className="community-index-list-header">
                        <div>Top Communities</div>
                    </div>
                    {communitiesArr.map((community, index) => (
                        <CommunityIndexCard community={community} index={index} user={user} key={`community ${community.id}`} />
                    ))}

                </div>
                <div className="community-index-sidebar">
                    <SidebarExtraCard />
                </div>
            </div>
        </div>
    )
};

export default CommunityIndex;
