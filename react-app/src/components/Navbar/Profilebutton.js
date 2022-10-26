import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

function ProfileButton({ sessionUser }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])

    const submitLogOut = async (e) => {
        e.preventDefault();
        let loggedOut = await dispatch(logout());
        return history.push('/')
    };

    return (
        <div className='navright-profile-div'>
            <div className='profile-button-container'>
                <button onClick={openMenu} className='profile-dropdown'>
                    <div className='profile-icon-div'>
                        <i className="fas fa-user-circle fa-2x" />
                    </div>
                </button>
            </div>
            {showMenu && sessionUser && (
                <ul className='profile-details'>
                    <li className='profile-details-li'>
                        <div className='signout-div' onClick={submitLogOut}>Log out</div>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default ProfileButton;
