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
        if (name.length < 2) {
            errors.push('Please provide a name with more than 1 character')
        }
        if (description.length < 20) {
            errors.push('Please provide a description with at least 20 characters')
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
        // if (createdCommunity) {
        //     setErrors(createdCommunity)
        // }

        if (createdCommunity) {
            history.push(`/communities/${createdCommunity.id}/${createdCommunity.name}`)
        }
    }

    return (
        <div className="create-community-container">
            <form className="create-community-form" onSubmit={handleSubmit}>
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
                <div className='create-community-line'>
                    <label className='create-community-label'>
                        name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        maxLength={50}
                        className='create-community-input'
                    />
                </div>
                <div className='create-community-line'>
                    <label className='create-community-label'>
                        description
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className='create-community-textarea'
                    />
                </div>
                <div className="create-community-button-container">
                    <button type="submit" className="create-community-button">create community</button>
                </div>
            </form>
        </div>
    )
};

export default CreateCommunityForm;
