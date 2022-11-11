import './NoPostsCard.css'

function NoPostsCard() {
    return (
        <div className='no-posts-container'>
            <div className='no-posts-header'>
                <div className='no-posts-header-text'>No posts yet!</div>
                <div className='no-posts-header-subtext'>Be the first to start a discussion in this community!</div>
            </div>
        </div>
    )
}

export default NoPostsCard;
