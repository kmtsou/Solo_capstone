import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './PostCard.css'

function PostCard({ post }) {
    // const { communityId, communityName } = useParams();
    const user = useSelector(state => state.session.user)

    let localeDatetime = new Date(post.created_at).toLocaleString()

    const handleVote = async (e) => {
        e.preventDefault();
        if (!user) alert('Please login to vote')

    }

    let voteStatusUp = 'notvoted'
    let voteStatusDown = 'notvoted'

    return (
        <NavLink to={`/${post.community_id}/${post.community.name}/comments/${post.id}`}>
            <div className='post-card'>
                <div className='post-card-leftside'>
                    <div className={`post-up-arrow-div ${voteStatusUp}`}>
                        <i className='fas fa-arrow-up'></i>
                    </div>
                    <div>{post.voteTotal}</div>
                    <div className={`post-down-arrow-div ${voteStatusDown}`}>
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
