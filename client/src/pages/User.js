import { useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import UserForm from '../components/UserForm'
import { spinner } from '../utils/spinner'

const PATH = {
    '/login': 'login',
    '/signup': 'signup'
}

const User = () => {
    const { login, signup, error, isLoading }  = useAuth()

    const location = useLocation();
    const path = PATH[location.pathname]

    const onSubmit = path === 'login' ? login : signup

    return(
        <div className="sign-card">
            <div className="content">
                { isLoading && spinner }
                <UserForm
                    path={path}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                />
                { error && <div className="error">{error}</div> }
            </div>
        </div>
    )
}

export default User
