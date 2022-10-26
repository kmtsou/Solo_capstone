import {useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

function ProfileButton({sessionUser}) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div></div>
    )
}

export default ProfileButton;
