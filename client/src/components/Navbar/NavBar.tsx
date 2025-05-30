// the bar that will have bubble button components that route user to other pages when pressed
// import React from "react"

import { Link, useLocation } from "react-router-dom";
import '../../NavBar.css'
import love from "../../images/love.png"
import home from "../../images/home_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import location from "../../images/location_on_24dp_000000_FILL0_wght400_GRAD0_opsz24 (1).svg"
import inbox from "../../images/inbox_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
const NavBar = () => {
  const currentPage = useLocation().pathname;
  
  return (
            <nav className="nav-bar">
            <ul className='nav-links'>
                <li>
                  <Link
                    to="/"
                    className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                  >
                      <img src={home}/>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/adoption"
                    className={currentPage === '/adoption' ? 'nav-link active' : 'nav-link'}
                  >
                      <img src={love}/>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/meetup"
                    className={currentPage === '/meetup' ? 'nav-link active' : 'nav-link'}
                  >
                      <img src={location}/>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/inbox"
                    className={currentPage === '/inbox' ? 'nav-link active' : 'nav-link'}
                  >
                      <img src={inbox}/>
                  </Link>
                </li>
            </ul>
        </nav>
  )
}

export default NavBar;
