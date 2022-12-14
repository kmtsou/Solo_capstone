import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCommunityThunk } from "../../store/community";
import './CreateCommunity.css'

function CreateCommunityForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        let errors = [];
        if (name.length < 4) {
            errors.push('Please provide a name with at least 3 characters')
        }
        if (name.length > 21) {
            errors.push('Please provide a name with at most 21 characters')
        }
        if (description.length < 20) {
            errors.push('Please provide a description with at least 20 characters')
        }
        if (description.length > 250) {
            errors.push('Please provide a description of at most 250 characters')
        }
        if (name.trim().length === 0) {
            errors.push('Please provide a valid community name')
        }
        if (description.trim().length === 0) {
            errors.push('Please provide a valid description')
        }
        setValidationErrors(errors);
    }, [name, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) {
            return;
        }
        setErrors([])
        const payload = {
            name,
            description
        };

        let createdCommunity = await dispatch(createCommunityThunk(payload))
        if (createdCommunity) {
            setErrors(createdCommunity)
        }

        if (typeof createdCommunity === 'object' && createdCommunity !== null && !Array.isArray(createdCommunity)) {
            history.push(`/${createdCommunity.id}/${createdCommunity.name}`)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/')
    }

    return (
        <div className="create-community-container">
            <form className="create-community-form" onSubmit={handleSubmit}>
                <div className="create-community-form-header">
                    <div>Create a community</div>
                    <div className="create-community-form-subheader">
                        Community names can not be changed after creation.
                    </div>
                </div>
                {hasSubmitted && (
                    <div>
                        The following errors were found:
                        <ul>
                            {validationErrors.length > 0 && (validationErrors.map((error) => (
                                <li key={error} className='val-errors'>{error}</li>
                            )))}

                            {errors.length > 0 && (errors.map((error, idx) => <li key={idx} className='error-line'>{error}</li>))}
                        </ul>
                    </div>
                )}
                <div className='create-community-line'>
                    <label className='create-community-label'>
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        maxLength={21}
                        className='create-community-input'
                    />
                </div>
                <div className='create-community-line'>
                    <label className='create-community-label'>
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className='create-community-textarea'
                    />
                </div>
                <div className="create-community-button-container">
                    <button onClick={handleCancel} className='cancel-button'>Cancel</button>
                    <button type="submit" className="create-community-button">Create Community</button>
                </div>
            </form>
        </div>
    )
};

export default CreateCommunityForm;
