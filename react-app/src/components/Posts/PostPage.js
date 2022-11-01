import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getAllPostsThunk } from '../../store/post';
import './PostPage.css'


function PostPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts)
    const { communityId, communityName, postId } = useParams();
    const post = posts[postId]

    if (!post) {
        dispatch(getAllPostsThunk())
        return null
    }

    return (
        <div className='post-page-content'>
            <div className='post-header-info'>{post.poster.username}</div>
            <div className='post-title-div'>{post.title}</div>
            <div className='post-content-div'>{post.content}</div>
            <div className='post-footer-info'>
                <i className='far fa-edit'/>
                {user && user.id === post.poster_id &&(
                <NavLink to={`/${communityId}/${communityName}/post/${postId}/edit`}>edit</NavLink>
                )}
            </div>
        </div>
    )
}

export default PostPage;
