import {Link } from 'react-router-dom';
export default function Navbar(){
    return(<nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/dep">Department</Link>
          </li>
          <li>
            <Link to="/first">Signup</Link>
          </li>
          <li>
            <Link to="/fullform">Profile</Link>
          </li>
          <li>
            <Link to="/auth">Auth</Link>
          </li>
        </ul>
      </nav>)
}