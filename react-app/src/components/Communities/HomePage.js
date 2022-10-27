import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadCommunities } from '../../store/community';
import './HomePage.css'

function HomePage() {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCommunities())
    }, [dispatch])


    return (
        <div className="main-page-content">
            <div className="main-page-posts">
                post list
            </div>
            <div className="main-page-sidebar">
                <div>
                    list of top communities
                </div>
                <div className="home-card">
                    <h2>Home</h2>
                    <div>Welcome to the app! Hope you enjoy your stay.</div>
                    <NavLink to='/communities'>
                        Communities
                    </NavLink>
                    {user && (
                        <NavLink to='/communities/new'>
                            Create a Community
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage;
