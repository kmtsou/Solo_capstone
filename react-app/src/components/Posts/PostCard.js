import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CreateVotePostThunk, RemoveVotePostThunk } from '../../store/post';
import './PostCard.css'

function PostCard({ post }) {
    // const { communityId, communityName } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [isDisabled, setIsDisabled] = useState(false);

    let localeDatetime = new Date(post.created_at).toLocaleString()

    let madeAVote = false;
    let typeOfVote;
    let voteId;
    let voteStatusUp = 'notvoted'
    let voteStatusDown = 'notvoted'
    let votesArray = Object.values(post.votes)
    for (let i = 0; i < votesArray.length; i++) {
        if (user && user.id === votesArray[i].user_id) {
            madeAVote = true;
            typeOfVote = votesArray[i].vote
            voteId = votesArray[i].id
            typeOfVote === 1 ? voteStatusUp = 'upvoted' : voteStatusDown = 'downvoted'
        }
    }

    const handleUpVote = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!user) {
            alert('Please login to vote')
            return
        }
        if (isDisabled) {
            return
        }
        setIsDisabled(true)
        if (madeAVote) {
            await dispatch(RemoveVotePostThunk(voteId))
        }
        else {
            await dispatch(CreateVotePostThunk(post.id, true))
        }
        setIsDisabled(false)
    }
    const handleDownVote = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!user) {
            alert('Please login to vote')
            return
        }
        if (isDisabled) {
            return
        }
        setIsDisabled(true)
        if (madeAVote) {
            await dispatch(RemoveVotePostThunk(voteId))
        }
        else {
            await dispatch(CreateVotePostThunk(post.id, false))
        }
        setIsDisabled(false)
    }

    return (
        <NavLink to={`/${post.community_id}/${post.community.name}/comments/${post.id}`}>
            <div className='post-card'>
                <div className='post-card-leftside'>
                    <div className={`post-up-arrow-div ${voteStatusUp}`} onClick={handleUpVote}>
                        <i className='fas fa-arrow-up'></i>
                    </div>
                    <div>{post.voteTotal}</div>
                    <div className={`post-down-arrow-div ${voteStatusDown}`} onClick={handleDownVote}>
                        <i className='fas fa-arrow-down'></i>
                    </div>
                </div>
                <div className='post-card-rightside'>
                    <div className='post-card-header'>
                        <div className='post-card-header-community'>{`/${post.community.name}`}</div>
                        <div className='post-card-header-separator'>•</div>
                        <div className='post-card-header-text'>Posted by {post.poster.username}, {localeDatetime}</div>
                    </div>
                    <h3 className='post-card-title'>
                        {post.title}
                    </h3>
                    <div className='post-card-content'>
                        <div className='post-card-body-content'>
                            {post.content}
                        </div>
                    </div>
                    <div className='post-card-comment-counter'>
                        <i className='far fa-comment' />
                        <div>{post.comments.length}</div>
                        <div>Comments</div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default PostCard;
