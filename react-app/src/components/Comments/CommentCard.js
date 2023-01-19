import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentThunk } from '../../store/comment';
import EditCommentForm from './EditCommentForm';
import './CommentCard.css'

function CommentCard({ comment }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [isEditting, setIsEditting] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteCommentThunk(comment.id))
    }

    const handleEdit = (e) => {
        isEditting ? setIsEditting(false) : setIsEditting(true)
    }

    let localDatetime = new Date(comment.created_at).toLocaleString()

    let madeAVote = false;
    for (let i = 0; i < comment.votes.length; i++) {
        if (user && user.id === comment.votes[i].user_id) {
            madeAVote = true;
        }
    }

    const handleVote = async (e) => {
        e.preventDefault();
        if (!user) alert('Please login to vote')

    }

    let voteStatusUp = 'notvoted'
    let voteStatusDown = 'notvoted'

    return (
        <div className='comment-card'>
            <div className='comment-card-leftside'>
                <div className={`comment-up-arrow-div ${voteStatusUp}`}>
                    <i className='fas fa-arrow-up'></i>
                </div>
                <div>{comment.voteTotal}</div>
                <div className={`comment-down-arrow-div ${voteStatusDown}`}>
                    <i className='fas fa-arrow-down'></i>
                </div>

            </div>
            <div className='comment-card-rightside'>
                <div className='comment-card-header'>
                    <div className='comment-card-header-text'>{comment.commenter.username}</div>
                    <div className='comment-card-header-separator'>•</div>
                    <div className='comment-card-header-date'>{localDatetime}</div>
                </div>
                <div className='comment-card-content'>
                    <div className='comment-card-body-content'>
                        {isEditting ? <EditCommentForm comment={comment} setIsEditting={setIsEditting} /> : comment.content}
                        {/* {comment.content} */}
                    </div>
                </div>
                <div className='comment-card-footer'>
                    {user && user.username === comment.commenter.username && (<>
                        <div className='delete-comment-div' onClick={handleDelete}>
                            <i className='far fa-trash-alt'></i>
                            <div className='comment-footer-text'>Delete</div>
                        </div>
                        <div className='edit-comment-div' onClick={handleEdit}>
                            <i className='far fa-edit'></i>
                            <div className='comment-footer-text'>Edit</div>
                        </div>
                    </>
                    )}
                    <div className='reply-comment-div'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentCard;
