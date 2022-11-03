import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { loadCommunities } from '../../store/community';
import CommunityPostList from "../Posts/CommunityPostList";
import './CommunityPage.css'
import SidebarExtraCard from "./SidebarExtraCard";

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
        <>
            <div className="community-page-header-container">
                <div className="community-page-header-colorblock"></div>
                <div className="community-page-header-textblock">
                    <div className="community-page-header-text">
                        {community.name}
                    </div>
                    <div className="community-page-header-subtext">
                        /{community.name}
                    </div>
                </div>
            </div>
            <div className="community-page-content">
                <div className="community-page-posts">
                    <CommunityPostList />
                </div>
                <div className="community-page-sidebar">
                    <div className="community-about-card">
                        <div className="community-about-header">
                            <div className="community-about-header-text">About Community</div>
                        </div>
                        <div className="community-about-description">
                            <div className="community-about-description-text">
                                {community.description}
                            </div>

                            {user && (

                                <NavLink className='create-post-link' to={`/${communityId}/${community.name}/post`}>
                                    Create a Post
                                </NavLink>

                            )}

                            {user && user.id === community.owner_id && (

                                <NavLink to={`/${communityId}/${community.name}/edit`} className='edit-community-link'>
                                    Edit Community Page
                                </NavLink>

                            )}

                        </div>
                    </div>
                    <div className="community-rules-card">
                        <div className="community-rules-header">
                            <div className="community-rules-header-text">/{community.name} Rules</div>
                        </div>
                        <div className="community-rules-list">
                            <div className="community-rules-line">1. Be Respectful.</div>
                            <div className="community-rules-line">2. Posts should relate to topic.</div>
                            <div className="community-rules-line">3. No explicit content.</div>
                        </div>
                    </div>
                    <SidebarExtraCard />
                </div>
            </div>
        </>
    )
}

export default CommunityPage;
