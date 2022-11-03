import './SidebarExtraCard.css'

function SidebarExtraCard() {
    return (
        <div className='bottom-card'>
            <div className='bottom-card-info'>
                <div className='bottom-card-technologies'>
                    <div className='bottom-card-technologies-line'>
                        Javascript
                    </div>
                    <div className='bottom-card-technologies-line'>
                        React
                    </div>
                    <div className='bottom-card-technologies-line'>
                        Redux
                    </div>
                    <div className='bottom-card-technologies-line'>
                        Python
                    </div>
                    <div className='bottom-card-technologies-line'>
                        Flask
                    </div>
                    <div className='bottom-card-technologies-line'>
                        SQLAlchemy
                    </div>
                    <div className='bottom-card-technologies-line'>
                        Docker
                    </div>
                </div>
                <div className='bottom-card-links'>
                    <a href='https://github.com/kmtsou' target='_blank' rel='noopener noreferrer' className='github-link'>github</a>
                    <a href='https://www.linkedin.com/' target='_blank' rel='noopener noreferrer' className='linkedin-link'>linkedin</a>
                </div>
            </div>
            <div className='bottom-card-rights-reserved'>
                linkit ©️ 2022. All rights reserved
            </div>
        </div>
    )
}

export default SidebarExtraCard;
