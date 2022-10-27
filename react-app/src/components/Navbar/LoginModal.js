import { Modal } from '../../context/Modal'
import LoginForm from '../auth/LoginForm'
import DemoUser from './DemoUser'

function LoginFormModal({ showLoginModal, setShowLoginModal }) {
    return (
        <>
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm setShowLoginModal={setShowLoginModal} />
                    <DemoUser setShowLoginModal={setShowLoginModal}/>
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal
