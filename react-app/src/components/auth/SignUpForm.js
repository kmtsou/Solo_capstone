import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = ({ setShowSignUpModal }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let valErrors = [];
    if (password.length < 6) {
      valErrors.push('Please provide a password with at least 6 characters')
    }
    if (password.length > 255) {
      valErrors.push('Please provide a password with at most 255 characters')
    }
    if (username.length > 40) {
      valErrors.push('Please provide a username with 40 characters or less')
    }
    if (username.length < 2) {
      valErrors.push('Please provide a username with at least 2 characters')
    }
    if (!email.includes('@') || !email.includes('.')) {
      valErrors.push('Please provide a valid email')
    }
    if (email.length > 255) {
      valErrors.push('Please provide a valid email')
    }
    if (email.length < 6) {
      valErrors.push('Please provide a valid email')
    }
    setValidationErrors(valErrors);
  }, [password, email, username])

  if (user) {
    setShowSignUpModal(false)
    return <Redirect to='/' />;
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (validationErrors.length > 0) {
      return;
    }
    setErrors([])
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };


  return (
    <div className='signup-form-container'>
      <form onSubmit={onSignUp} className='signup-form'>
        <div className='signup-header'>
          <h3 className='signup-header-text'>Sign Up</h3>
        </div>
        <div className='signup-errors-container'>
          {hasSubmitted && validationErrors.length > 0 && (
            validationErrors.map((error) => (
              <div key={error} className='val-errors-signup'>{error}</div>
            ))
          )}
          {errors.map((error, ind) => (
            <div key={ind} className='signup-errors-line'>{error}</div>
          ))}
        </div>
        <div className='signup-row'>
          <label className='signup-form-label'>User Name</label>
          <input
            className='signup-form-input'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            required
          ></input>
        </div>
        <div className='signup-row'>
          <label className='signup-form-label'>Email</label>
          <input
            className='signup-form-input'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            required
          ></input>
        </div>
        <div className='signup-row'>
          <label className='signup-form-label'>Password</label>
          <input
            className='signup-form-input'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            required
          ></input>
        </div>
        <div className='signup-row'>
          <label className='signup-form-label'>Repeat Password</label>
          <input
            className='signup-form-input'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className='signup-button-container'>
          <button type='submit' className='signup-submit-button'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
