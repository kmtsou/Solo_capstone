import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadCommunities } from '../../store/community';

function CommunityPage() {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const { community } = useParams();

    useEffect(() => {
        dispatch(loadCommunities())
    }, [dispatch])

    return (
        <div></div>
    )
}

export default CommunityPage;
