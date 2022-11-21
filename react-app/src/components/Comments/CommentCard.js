import { useDispatch } from 'react-redux';
import { deleteCommentThunk } from '../../store/comment';
import './CommentCard.css'

function CommentCard({ comment }) {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteCommentThunk(comment.id))
    }

    const handleEdit = (e) => {
        return
    }

    return (
        <div className='comment-card'>
            <div className='comment-card-leftside'>

            </div>
            <div className='comment-card-rightside'>
                <div className='comment-card-header'>
                    <div className='comment-card-header-text'>Posted by {comment.commenter.username}, {comment.created_at}</div>
                </div>
                <div className='comment-card-content'>
                    <div className='comment-card-body-content'>
                        {comment.content}
                    </div>
                </div>
                <div className='comment-card-footer'>
                    <div className='delete-comment-div' onClick={handleDelete}>
                        <i className='fas fa-trash'></i>
                    </div>
                    <div className='edit-comment-div' onClick={handleEdit}>
                        <i className='fas fa-edit'></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentCard;
