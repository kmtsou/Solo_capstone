import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import './CreatePostForm.css'
import { createPostThunk } from "../../store/post";
import SidebarExtraCard from "../Communities/SidebarExtraCard";

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

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/${communityId}/${communityName}`)
    }

    return (
        <div className="create-post-container">
            <div>
                <div className="create-post-header">
                    <div className="create-post-header-text">Create a Post in /{communityName}</div>
                </div>
                <div className="create-post-form-container">
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
                                Text
                            </label>
                            <textarea className="create-post-textarea"
                                value={content}
                                onChange={(e) => { setContent(e.target.value) }}>
                            </textarea>
                        </div>
                        <div className="create-post-button-container">
                            <button onClick={handleCancel} className='cancel-button'>Cancel</button>
                            <button className="create-post-submit-button" type="submit">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
            <div className="create-post-sidebar">
                <div className="create-post-rules-card">
                    <div className="create-post-rules-header">
                        Posting on linkit:
                    </div>
                    <div className="create-post-rules-line">
                        1. Remember the human
                    </div>
                    <div className="create-post-rules-line">
                        2. Behave like you would in real life
                    </div>
                    <div className="create-post-rules-line">
                        3. Look for the original source of content
                    </div>
                    <div className="create-post-rules-line">
                        4. Search for duplicates before posting
                    </div>
                    <div className="create-post-rules-line">
                        5. Read the community's rules
                    </div>
                </div>
                <SidebarExtraCard />
            </div>
        </div>
    )
}

export default CreatePost;
