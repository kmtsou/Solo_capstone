import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SignUpFormModal from './SignupModal';
import LoginFormModal from './LoginModal';

function Navbar({ loaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);


    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <NavLink exact to='/' className='home-link'>
                    <div className='logo-div'>
                        logo goes here
                    </div>
                </NavLink>
            </div>
            <div className='navbar-right'>
                {!sessionUser && (
                    <div className='login-signup-container'>
                        <div onClick={() => setShowLoginModal(true)} className='login-signup-button'>
                            <p className='login-signup-text'>Log In</p>
                        </div>
                        <div onClick={() => setShowSignUpModal(true)} className='login-signup-button'>
                            <p className='login-signup-text'>Sign Up</p>
                        </div>
                    </div>
                )}
                {sessionUser && (
                    <div>profilebutton</div>
                )}
            </div>
            <LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
            <SignUpFormModal showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal}/>
        </div>
    )
}

export default Navbar;
