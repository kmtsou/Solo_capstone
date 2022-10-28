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
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    console.log(community)
    console.log(communityId)

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
        if (updatedCommunity) {
            history.push(`/${communityId}/${communityName}`)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteCommunityThunk(communityId))
        history.push('/')
    }

    return (
        <div className="edit-community-container">
            <form className="edit-community-form" onSubmit={handleSubmit}>
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
                    <button type="submit" className="edit-community-button">submit edit</button>
                </div>
            </form>
            <div className="other-buttons-container">
                <button onClick={handleDelete} className='delete-community-button'>Delete</button>
                <button onClick={()=>history.push(`/${communityId}/${communityName}`)} className='cancel-button'>Cancel</button>
            </div>
        </div>
    )

}

export default EditCommunityForm;
