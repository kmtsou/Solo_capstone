import { NavLink } from 'react-router-dom';
import './PostCard.css'

function PostCard({ post }) {


    return (
        <div className='post-card'>
            <div className='post-card-leftside'></div>
            <div className='post-card-rightside'>
                <div className='post-card-header'>
                    <div>Link goes here</div>
                    <div>• Posted by</div>
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
                    <i className='far fa-comment'/>
                    <div>Comments</div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;
