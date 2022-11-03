import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './EditPostForm.css'
import { deletePostThunk, editPostThunk } from "../../store/post";
import SidebarExtraCard from "../Communities/SidebarExtraCard";

function EditPost() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { communityId, communityName, postId } = useParams();
    const post = useSelector(state => state.posts[postId]);
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        if (post && post.title && post.content) {
            setTitle(post.title)
            setContent(post.content)
        }
    }, [post])

    useEffect(() => {
        let valErrors = [];
        if (title.length < 2) {
            valErrors.push('Please provide a post title with more than 1 character')
        }
        if (title.length > 300) {
            valErrors.push('Please provide a post title with less than 300 characters')
        }
        if (content.length > 40000) {
            valErrors.push('Character limit of 40000 for post exceeded')
        }
        if (content.length < 4) {
            valErrors.push('Please provide a post body of at least 4 characters')
        }
        setValidationErrors(valErrors);
    }, [title, content])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) {
            return;
        }
        setErrors([])
        const payload = {
            title,
            content
        }
        let edittedPost = await dispatch(editPostThunk(payload, postId))
        if (edittedPost) {
            history.push(`/${communityId}/${communityName}/comments/${postId}`)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deletePostThunk(postId))
        history.push(`/${communityId}/${communityName}`)
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/${communityId}/${communityName}/comments/${postId}`)
    }

    // if (user.id !== post.poster_id) {
    //     return null
    // }

    return (
        <div className="edit-post-container">
            <div>
                <div className="edit-post-header">
                    <div className="edit-post-header-text">Editing your post /{communityName}</div>
                </div>
                <div className="edit-post-form-container">
                    <form onSubmit={handleSubmit} className='edit-post-form'>
                        {hasSubmitted && validationErrors.length > 0 && (
                            <div>
                                The following errors were found:
                                <ul>
                                    {validationErrors.map((error) => (
                                        <li key={error} className='val-errors'>{error}</li>
                                    ))}
                                    {errors.map((error, idx) => <li key={idx} className='error-line'>{error}</li>)}
                                </ul>
                            </div>
                        )}
                        <div className="edit-post-line">
                            <label className="edit-post-label">
                                Title
                            </label>
                            <input className="edit-post-input"
                                type="text"
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}>
                            </input>
                        </div>
                        <div className="edit-post-line">
                            <label className="edit-post-label">
                                Text
                            </label>
                            <textarea className="edit-post-textarea"
                                value={content}
                                onChange={(e) => { setContent(e.target.value) }}>
                            </textarea>
                        </div>
                        <div className="edit-post-button-container">
                            <button onClick={handleDelete} className='delete-post-button'>Delete</button>
                            <div>
                                <button onClick={handleCancel} className='cancel-button'>Cancel</button>
                                <button className="edit-post-submit-button" type="submit">submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="edit-post-sidebar">
                <div className="edit-post-rules-card">
                    <div className="edit-post-rules-header">
                        Posting on linkit:
                    </div>
                    <div className="edit-post-rules-line">
                        1. Remember the human
                    </div>
                    <div className="edit-post-rules-line">
                        2. Behave like you would in real life
                    </div>
                    <div className="edit-post-rules-line">
                        3. Look for the original source of content
                    </div>
                    <div className="edit-post-rules-line">
                        4. Search for duplicates before posting
                    </div>
                    <div className="edit-post-rules-line">
                        5. Read the community's rules
                    </div>
                </div>
                <SidebarExtraCard />
            </div>
        </div>
    )
}

export default EditPost;
