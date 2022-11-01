import { NavLink, useParams } from 'react-router-dom';
import './PostCard.css'

function PostCard({ post }) {
    const { communityId, communityName } = useParams();

    return (
        <NavLink to={`/${communityId}/${communityName}/comments/${post.id}`}>
            <div className='post-card'>
                <div className='post-card-leftside'></div>
                <div className='post-card-rightside'>
                    <div className='post-card-header'>
                        <div>{`/${communityName}`}</div>
                        <div>•</div>
                        <div>Posted by</div>
                        <div>{post.poster.username}</div>
                        <div>{post.created_at}</div>
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
