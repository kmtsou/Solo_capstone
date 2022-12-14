import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommunityThunk, editCommunityThunk } from "../../store/community";
import './EditCommunity.css'

function EditCommunityForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { communityId, communityName } = useParams();
    const community = useSelector(state => state.communities[communityId])
    const user = useSelector(state => state.session.user)
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        if (community && community.description) {
            setDescription(community.description)
        }
    }, [community])

    useEffect(() => {
        let errors = [];
        if (description.length < 20) {
            errors.push('Please provide a description with at least 20 characters')
        }
        if (description.length > 250) {
            errors.push('Please provide a description of at most 250 characters')
        }
        if (description.trim().length === 0) {
            errors.push('Please provide a valid description')
        }
        setValidationErrors(errors);
    }, [description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) {
            return;
        }
        setErrors([])
        const payload = {
            description
        }
        let updatedCommunity = await dispatch(editCommunityThunk(payload, communityId))
        if (typeof updatedCommunity === 'object' && updatedCommunity !== null && !Array.isArray(updatedCommunity)) {
            history.push(`/${communityId}/${communityName}`)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteCommunityThunk(communityId))
        history.push('/')
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/${communityId}/${communityName}`)
    }


    // if (user.id !== community.owner_id) {
    //     return null
    // }

    return (
        <div className="edit-community-container">
            <form className="edit-community-form" onSubmit={handleSubmit}>
                <div className="edit-community-form-header">
                    <div>Change community description</div>
                </div>
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
                <div className='edit-community-line'>
                    <label className='edit-community-label'>
                        description
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className='edit-community-textarea'
                    />
                </div>
                <div className="edit-community-button-container">
                    <button onClick={handleDelete} className='delete-community-button'>Delete</button>
                    <div>
                        <button onClick={handleCancel} className='cancel-button'>Cancel</button>
                        <button type="submit" className="edit-community-button">Submit Edit</button>
                    </div>
                </div>
            </form>
            <div className="other-buttons-container">


            </div>
        </div>
    )

}

export default EditCommunityForm;
