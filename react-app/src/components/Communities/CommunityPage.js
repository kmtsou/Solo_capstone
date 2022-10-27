import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { loadCommunities } from '../../store/community';
import './CommunityPage.css'

function CommunityPage() {
    const { communityId } = useParams();
    const user = useSelector((state) => state.session.user);
    const community = useSelector((state) => state.communities[communityId])
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(loadCommunities())
    }, [dispatch])

    if (!community) return null

    return (
        <div className="community-page-content">
            <div className="community-page-posts">
                post list
            </div>
            <div className="community-page-sidebar">
                <div className="community-about-card">
                    <div className="community-about-header">
                        <h2>{community.name}</h2>
                    </div>
                    <div className="community-about-description">
                        <div>{community.description}</div>
                    </div>
                    {user && user.id === community.owner_id && (
                    <div>
                        <NavLink to={`/${communityId}/${community.name}/edit`}>Edit Community Page</NavLink>
                    </div>
                    )}
                </div>
                <div className="community-rules-card">
                    <div className="community-rules-header">
                        <h4>{community.name} Rules</h4>
                    </div>
                    <div>
                        <div>1. Be Respectful.</div>
                        <div>2. Posts should relate to topic.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityPage;
