import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getAllPostsThunk } from '../../store/post';
import SidebarExtraCard from '../Communities/SidebarExtraCard';
import './PostPage.css'


function PostPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts)
    // const communities = useSelector(state => state.communities)
    const { communityId, communityName, postId } = useParams();
    const post = posts[postId]
    // const community = communities[communityId]

    if (!post) {
        dispatch(getAllPostsThunk())
        return null
    }

    return (
        <div className='post-page-content'>
            <div className='post-page-main'>
                <div className='main-post-container'>
                    <div className='post-header-info'>
                        <div className='main-post-header-community'>{`/${post.community.name}`}</div>
                        <div className='main-post-header-separator'>•</div>
                        <div className='main-post-header-text'>Posted by {post.poster.username}, {post.created_at}</div>
                    </div>
                    <div className='post-title-div'>
                        {post.title}
                    </div>
                    <div className='post-content-div'>
                        {post.content}
                    </div>
                    <div className='post-footer-info'>

                        {user && user.id === post.poster_id && (
                            <>
                                <i className='far fa-edit' />
                                <NavLink to={`/${communityId}/${communityName}/post/${postId}/edit`}>edit</NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className='post-page-sidebar'>
                <div className="community-about-card">
                    <div className="community-about-header">
                        <div className="community-about-header-text">About Community</div>
                    </div>
                    <div className="community-about-description">
                        <div className="community-about-description-text">
                            {post.community.description}
                        </div>
                    </div>
                </div>
                <div className="community-rules-card">
                    <div className="community-rules-header">
                        <div className="community-rules-header-text">/{post.community.name} Rules</div>
                    </div>
                    <div className="community-rules-list">
                        <div className="community-rules-line">1. Be Respectful.</div>
                        <div className="community-rules-line">2. Posts should relate to topic.</div>
                        <div className="community-rules-line">3. No explicit content.</div>
                    </div>
                </div>
                <SidebarExtraCard />
            </div>
        </div>
    )
}

export default PostPage;
