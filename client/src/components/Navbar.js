import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar--wrapper">
            <ul>
                <li className="navbar--item">
                    <Link to='/'aria-current="page">
                        Workout Buddy
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
