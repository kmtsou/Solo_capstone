import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllPostsThunk } from '../../store/post';
import PostCard from './PostCard';
import './PostList.css'

function PostList() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts)

    const postsArr = Object.values(posts);

    useEffect(() => {
        dispatch(getAllPostsThunk())
    }, [dispatch])

    if (!posts) return null

    return (
        <>
        {postsArr.map(post => (
            <PostCard post={post} key={`post ${post.id}`}/>
        ))}
        </>
    )
}

export default PostList;
