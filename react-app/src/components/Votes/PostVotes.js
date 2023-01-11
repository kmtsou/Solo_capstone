import {useEffect} from 'react';

function PostVotes() {

    return (
        <div className='post-vote-container'>
            <div className='post-vote-uparrow'>
                <i className='fas fa-arrow-up'></i>
            </div>
            <div className='post-vote-total'>

            </div>
            <div className='post-vote-downarrow'>
                <i className='fas fa-arrow-down'></i>
            </div>
        </div>
    )
}

export default PostVotes;
