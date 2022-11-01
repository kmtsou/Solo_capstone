import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getCommunityPostsThunk } from '../../store/post';
import PostCard from './PostCard';
import './CommunityPostList.css'

function CommunityPostList() {
    const dispatch = useDispatch();
    const { communityId, communityName } = useParams();
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts)

    const postsArr = Object.values(posts);

    useEffect(() => {
        dispatch(getCommunityPostsThunk(communityId))
    }, [dispatch])

    if (!posts) return null

    return (
        <>
            {postsArr.map(post => (
                <PostCard post={post} />
            ))}
        </>
    )
}

export default CommunityPostList;