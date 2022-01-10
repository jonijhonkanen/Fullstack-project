//import './Nav.css';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="nav_bar">
      <Link className="admin_link" to="/">
        Admin
      </Link>
      <Link className="student_link" to="/student">
        Student
      </Link>
    </div>
  );
}

export default Navigation;
