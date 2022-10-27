import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCommunities } from '../../store/community';

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
                <div>
                    link to community index
                </div>
            </div>
        </div>
    )
}

export default HomePage;
