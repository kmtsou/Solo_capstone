import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadCommunities } from '../../store/community';
import './CommunityPage.css'

function CommunityPage() {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const { community } = useParams();

    useEffect(() => {
        dispatch(loadCommunities())
    }, [dispatch])

    return (
        <div className="community-page-content">
            <div className="community-page-posts">
                post list
            </div>
            <div className="community-page-sidebar">
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default CommunityPage;
