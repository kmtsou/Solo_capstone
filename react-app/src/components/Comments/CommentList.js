import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRootCommentsThunk } from "../../store/comment";
import CommentCard from "./CommentCard";
import './CommentList.css'

function CommentList() {
    const dispatch = useDispatch();
    const { communityId, communityName, postId } = useParams();
    const comments = useSelector(state => state.comments)

    const commentsArr = Object.values(comments);

    useEffect(() => {
        dispatch(getRootCommentsThunk(postId))
    }, [dispatch])

    if (!commentsArr) return null

    let isEmptyArray = commentsArr.length === 0;

    return (
        <>
        {commentsArr.map(comment => (
            <CommentCard comment={comment} key={`comment ${comment.id}`}/>
        ))}
        {isEmptyArray && (
            <div className="no-comments-container">
                <div className="no-comments-text">No comments yet</div>
            </div>
        )}
        </>
    )
}

export default CommentList;
