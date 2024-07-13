import {Link} from 'react-router-dom'
import './style.css'
export default function UserNavbar(){
    return(<header class="navigation-header">
        <nav>
            <div class="logo-container">
                Logo
            </div>
            <div class="navigation-items" id="navigation-items">
                <Link to="/first">Signup</Link>  
                <Link to="/auth">Sign in</Link>
            </div>
            <div class="hamburger">
                <span id="openHam">&#9776;</span>
                <span id="closeHam">&#x2716;</span>
            </div>
        </nav>
        </header>
        )
}