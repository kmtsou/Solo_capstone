import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SignUpFormModal from './SignupModal';
import LoginFormModal from './LoginModal';
import ProfileButton from './Profilebutton';
import './Navbar.css'

function Navbar() {
    const sessionUser = useSelector(state => state.session.user);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);


    return (
        <div className='navbar'>
            <div className='nav-left'>
                <NavLink exact to='/' className='home-link'>
                    <div className='logo-div'>
                        logo goes here
                    </div>
                </NavLink>
            </div>
            <div className='nav-right'>
                {!sessionUser && (
                    <div className='login-signup-container'>
                        <div onClick={() => setShowSignUpModal(true)} className='signup-button'>
                            <div className='signup-text'>Sign Up</div>
                        </div>
                        <div onClick={() => setShowLoginModal(true)} className='login-button'>
                            <div className='login-text'>Log In</div>
                        </div>
                    </div>
                )}
                {sessionUser && (
                    <ProfileButton sessionUser={sessionUser}/>
                )}
            </div>
            <LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
            <SignUpFormModal showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal}/>
        </div>
    )
}

export default Navbar;