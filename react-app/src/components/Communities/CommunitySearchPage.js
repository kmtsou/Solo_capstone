import { useSelector } from 'react-redux';
import { isEmptyObject } from "../../utils";
import CommunityIndexCard from "./CommunityIndexCard";
import SidebarExtraCard from './SidebarExtraCard'
import './CommunitySearchPage.css'

function CommunitySearchIndex() {
    const searchArr = useSelector(state => state.search)
    const user = useSelector(state => state.session.user)

    if (!searchArr) return null

    if (isEmptyObject(searchArr)) {
        return (
            <div className="no-results-header">
                <h2>No Results found</h2>
            </div>)
    }

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
                        <div>Community Search Results</div>
                    </div>
                    {searchArr.map((community, index) => (
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

export default CommunitySearchIndex;
