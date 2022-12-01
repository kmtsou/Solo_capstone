import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { editCommentThunk } from '../../store/comment';
import './EditCommentForm.css'

function EditCommentForm({ comment, setIsEditting }) {
    const dispatch = useDispatch();
    const { communityId, communityName, postId } = useParams();
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        if (comment && comment.content) {
            setContent(comment.content)
        }
    }, [comment])

    useEffect(() => {
        let valErrors = [];
        if (content.length < 1) {
            valErrors.push('Please provide at least 1 character')
        }
        setValidationErrors(valErrors);
    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validationErrors.length > 0) {
            return;
        }
        setErrors([])
        const payload = {
            content
        }
        let edittedComment = await dispatch(editCommentThunk(payload, comment.id))
        if (edittedComment) {
            setHasSubmitted(false)
            setIsEditting(false)
        }
    }

    return (
        <div className='edit-comment-form-container'>
            <form onSubmit={handleSubmit} className='edit-comment-form'>
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
                <label className='edit-comment-label'>
                    Text
                </label>
                <div className='edit-comment-form-body'>
                    <textarea
                        className='edit-comment-textarea'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    >
                    </textarea>
                    <div className='edit-comment-button-container'>
                        <button className='edit-comment-button' type='submit'>Submit</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default EditCommentForm
