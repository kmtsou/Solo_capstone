import { NavLink } from "react-router-dom";

function CommunityIndexCard({ community, index }) {

    return (
        <div className='community-card'>
            <div className="community-card-left">
                <div>
                    {community.name}
                </div>
            </div>
            <div className="community-card-right">

            </div>
        </div>
    )
}

export default CommunityIndexCard;
