import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import './CreatePostForm.css'
import { createPostThunk } from "../../store/post";

function CreatePost() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { communityId, communityName } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        let valErrors = [];
        if (title.length < 2) {
            valErrors.push('Please provide a post title with more than 1 character')
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
        let createdPost = await dispatch(createPostThunk(payload, communityId))
        if (createdPost) {
            history.push(`/${communityId}/${communityName}`)
        }
    }

    return (
        <div className="create-post-container">
            <form onSubmit={handleSubmit} className='create-post-form'>
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
                <div className="create-post-line">
                    <label className="create-post-label">
                        Title
                    </label>
                    <input className="create-post-input"
                        type="text"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}>
                    </input>
                </div>
                <div className="create-post-line">
                    <label className="create-post-label">

                    </label>
                    <textarea className="create-post-textarea"
                        value={content}
                        onChange={(e) => { setContent(e.target.value) }}>
                    </textarea>
                </div>
                <div className="create-post-button-container">
                    <button className="create-post-submit-button" type="submit">Submit</button>
                </div>
            </form>
            <div className="cancel-post-container">
                <button onClick={() => history.push(`/${communityId}/${communityName}`)} className='cancel-button'>Cancel</button>
            </div>
        </div>
    )
}

export default CreatePost;
