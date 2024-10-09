import { Link } from 'react-router-dom';

function Header(){
    return(
        <header>
            <div>
                <h1>Todos App</h1>
                <nav>
                    <Link to="/todos">Todos</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
            </div>
        </header>
    );
}
export default Header;
