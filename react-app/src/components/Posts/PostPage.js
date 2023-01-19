import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getAllPostsThunk } from '../../store/post';
import CommentList from '../Comments/CommentList';
import CreateRootComment from '../Comments/CreateRootCommentForm';
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

    let localeDatetime = new Date(post.created_at).toLocaleString()

    const handleVote = async (e) => {
        e.preventDefault();
        if (!user) alert('Please login to vote')

    }
    let voteStatusUp = 'notvoted'
    let voteStatusDown = 'notvoted'

    return (
        <div className='post-page-content'>
            <div className='post-page-main'>
                <div className='main-post-container'>
                    <div className='main-post-container-leftside'>
                        <div className={`post-up-arrow-div ${voteStatusUp}`}>
                            <i className='fas fa-arrow-up'></i>
                        </div>
                        <div>{post.voteTotal}</div>
                        <div className={`post-down-arrow-div ${voteStatusDown}`}>
                            <i className='fas fa-arrow-down'></i>
                        </div>
                    </div>
                    <div className='main-post-container-rightside'>
                        <div className='post-header-info'>
                            <div className='main-post-header-community'>{`/${post.community.name}`}</div>
                            <div className='main-post-header-separator'>•</div>
                            <div className='main-post-header-text'>Posted by {post.poster.username}, {localeDatetime}</div>
                        </div>
                        <h3 className='post-title-div'>
                            {post.title}
                        </h3>
                        <div className='post-content-div'>
                            {post.content}
                        </div>
                        <div className='post-footer-info'>

                            {user && user.id === post.poster_id && (
                                <>

                                    <NavLink to={`/${communityId}/${communityName}/post/${postId}/edit`} className='edit-post-link'>
                                        <i className='far fa-edit' />
                                        <div className='edit-post-link-text'>Edit</div>
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className='comment-on-post-container'>
                    <h3 className='comment-header-text'>Comments</h3>
                    {user && (
                        <CreateRootComment />
                    )}
                </div>
                <div className='comment-list-container'>
                    <CommentList />
                </div>
            </div>
            <div className='post-page-sidebar'>
                <div className="community-about-card">
                    <div className="community-about-header">
                        <div className="community-about-header-text">About Community</div>
                    </div>
                    <div className='community-name-container'>
                        <div className='community-name-div'>
                            <NavLink to={`/${post.community.id}/${post.community.name}`} className='community-name-link'>
                                /{post.community.name}
                            </NavLink>
                        </div>
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
