import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadCommunities } from '../../store/community';
import PostList from "../Posts/PostList";
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
                <PostList />
            </div>
            <div className="main-page-sidebar">
                <div>
                    list of top communities
                </div>
                <div className="home-card">
                    <h3 className="home-card-header">Home</h3>
                    <div>Welcome to the app! Hope you enjoy your stay.</div>
                    <NavLink to='/communities' className={'main-page-index-link'}>
                        Communities
                    </NavLink>
                    {user && (
                        <NavLink to='/communities/new' className={'main-page-create-link'}>
                            Create a Community
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage;
