import { useAuthContext } from '../hooks/useAuthContext'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { user } = useAuthContext()
    const { logOut } = useAuth()

    return (
        <div className="navbar--wrapper">
            <span className="navbar--item">
                <Link to='/'aria-current="page">
                    Workout Buddy
                </Link>
            </span>
            <div>
                <nav className="navbar navbar-expand-sm">
                    <button className="navbar-toggler navbar--btn" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse navbar--sign-container" id="navbarNav">
                        {user
                            ? (
                                <button
                                    className="logout"
                                    onClick={logOut}>
                                    Logout
                                </button>
                            )
                            : (
                                <>
                                    <span className="navbar--item">
                                        <Link to='/login'aria-current="page">
                                            Login
                                        </Link>
                                    </span>
                                        <span className="navbar--item">
                                        <Link to='/signup'aria-current="page">
                                            Signup
                                        </Link>
                                    </span>
                                </>
                            )
                        }
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar

            {/*<nav className="navbar--wrapper">*/}
            {/*        <span className="navbar--item">*/}
            {/*            <Link to='/'aria-current="page">*/}
            {/*                Workout Buddy*/}
            {/*            </Link>*/}
            {/*        </span>*/}
            {/*    <div>*/}
            {/*        <span className="navbar--item">*/}
            {/*            <Link to='/login'aria-current="page">*/}
            {/*                Login*/}
            {/*            </Link>*/}
            {/*        </span>*/}
            {/*        <span className="navbar--item">*/}
            {/*            <Link to='/signup'aria-current="page">*/}
            {/*                Signup*/}
            {/*            </Link>*/}
            {/*        </span>*/}
            {/*    </div>*/}
            {/*</nav>*/}
