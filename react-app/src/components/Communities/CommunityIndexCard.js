import { NavLink } from "react-router-dom";
import './CommunityIndexCard.css'

function CommunityIndexCard({ community, index, user }) {

    // const handleJoin = (e) => {
    //     e.preventDefault();
    // }

    // const handleUnjoin = (e) => {
    //     e.preventDefault();
    // }

    return (
        <NavLink to={`/${community.id}/${community.name}`} className='community-card-link'>
            <div className='community-card'>
                <div className="community-card-left">
                    <div className="community-card-left-text">
                        <div className="community-card-left-number">{index + 1}.</div>
                        <div className="community-card-left-name">/{community.name}</div>
                    </div>
                </div>
                <div className="community-card-right">
                    {/* <div>
                    {user && (
                        <button
                            onClick={(e) => e.preventDefault()}
                        >
                            Join
                        </button>
                    )}
                    {!user && (
                        <button
                            onClick={(e) => e.preventDefault()}
                        >
                            Login in first
                        </button>
                    )}
                </div>
                <div>{community.community_follows.length}</div>
                <div>follows</div> */}
                </div>
            </div>
        </NavLink>
    )
}

export default CommunityIndexCard;
