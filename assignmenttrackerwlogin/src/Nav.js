import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
    <nav className="navbar">
    <h1 style={{color:'#4a148c'}}>Academic Tracker</h1>
    <div className="links">
        
        <Link to="/dashboard">Assignment Tracker</Link>
        <Link to="/exams">Exam Tracker</Link>
        <Link to="/">Logout</Link>
    </div>
    </nav>
     );
}
 
export default Navbar;