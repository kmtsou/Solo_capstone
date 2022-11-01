import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './EditPostForm.css'
import { deletePostThunk, editPostThunk } from "../../store/post";

function EditPost() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { communityId, communityName, postId } = useParams();
    const post = useSelector(state => state.posts[postId]);
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
            errors.push('Please provide a post title with more than 1 character')
        }
        setValidationErrors(valErrors);
    }, [title])

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

    return (
        <div className="edit-post-container">
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

                    </label>
                    <textarea className="edit-post-textarea"
                        value={content}
                        onChange={(e) => { setContent(e.target.value) }}>
                    </textarea>
                </div>
                <div className="edit-post-button-container">
                    <button className="edit-post-submit-button" type="submit">submit</button>
                </div>
            </form>
            <div>
                <button onClick={handleDelete} className='delete-post-button'>Delete</button>
                <button onClick={()=>history.push(`/${communityId}/${communityName}/comments/${postId}`)}>Cancel</button>
            </div>
        </div>
    )
}

export default EditPost;
