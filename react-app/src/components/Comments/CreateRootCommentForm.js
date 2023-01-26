import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRootCommentThunk } from "../../store/comment";
import './CreateRootCommentForm.css'

function CreateRootComment() {
    const dispatch = useDispatch();
    const { communityId, communityName, postId } = useParams();
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        let valErrors = [];
        if (content.length < 1) {
            valErrors.push('Please provide at least 1 character')
        }
        setValidationErrors(valErrors);
    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) {
            return;
        }
        setErrors([])
        const payload = {
            content
        }
        let createComment = await dispatch(createRootCommentThunk(payload, postId))
        if (createComment) {
            setHasSubmitted(false)
            setContent('')
        }
    }

    return (
        <div className="create-comment-container">
            <form onSubmit={handleSubmit} className='create-comment-form'>
                {hasSubmitted && validationErrors.length > 0 && (
                    <div className="comment-error-header">
                        The following errors were found:
                        <ul>
                            {validationErrors.map((error) => (
                                <li key={error} className='val-errors'>{error}</li>
                            ))}
                            {errors.map((error, idx) => <li key={idx} className='error-line'>{error}</li>)}
                        </ul>
                    </div>
                )}
                <label className="create-comment-label">
                    Text
                </label>
                <div className="comment-form-body">
                    <textarea className="create-comment-textarea"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    >
                    </textarea>
                    <div className="create-comment-button-container">
                        <button className="create-comment-button" type="submit">Comment</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateRootComment;
