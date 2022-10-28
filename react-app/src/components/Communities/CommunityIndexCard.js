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
        <div className='community-card'>
            <div className="community-card-left">
                <div>
                    <NavLink to={`/${community.id}/${community.name}`} className='community-card-link'>
                        {community.name}
                    </NavLink>
                </div>
            </div>
            <div className="community-card-right">
                <div>
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
                {/* <div>{community.community_follows.length}</div> */}
                <div>follows</div>
            </div>
        </div>
    )
}

export default CommunityIndexCard;
