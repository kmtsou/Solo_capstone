import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadCommunities } from '../../store/community';

function HomePage() {

    return (
        <div className="main-page-content">
            <div className="main-page-posts"></div>
            <div className="main-page-sidebar"></div>
        </div>
    )
}

export default HomePage;
