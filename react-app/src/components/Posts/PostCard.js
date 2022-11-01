import { NavLink } from 'react-router-dom';
import './PostCard.css'

function PostCard({ post }) {
    // const { communityId, communityName } = useParams();

    return (
        <NavLink to={`/${post.community_id}/${post.community.name}/comments/${post.id}`}>
            <div className='post-card'>
                <div className='post-card-leftside'>

                </div>
                <div className='post-card-rightside'>
                    <div className='post-card-header'>
                        <div className='post-card-header-community'>{`/${post.community.name}`}</div>
                        <div className='post-card-header-separator'>•</div>
                        <div className='post-card-header-text'>Posted by {post.poster.username}, {post.created_at}</div>
                    </div>
                    <div className='post-card-title'>
                        {post.title}
                    </div>
                    <div className='post-card-content'>
                        {post.content}
                    </div>
                    <div className='post-card-comment-counter'>
                        <i className='far fa-comment' />
                        <div>Comments</div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default PostCard;
