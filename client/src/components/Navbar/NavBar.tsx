// the bar that will have bubble button components that route user to other pages when pressed
// import React from "react"
import { FaHome, FaPaw, } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdOutlineComment } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import '../../NavBar.css'

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
                      <FaHome/>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Adoption"
                    className={currentPage === '/Adoption' ? 'nav-link active' : 'nav-link'}
                  >
                      <FaPaw/>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/MeetUp"
                    className={currentPage === '/MeetUp' ? 'nav-link active' : 'nav-link'}
                  >
                      <IoLocation/>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Inbox"
                    className={currentPage === '/Inbox' ? 'nav-link active' : 'nav-link'}
                  >
                      <MdOutlineComment/>
                  </Link>
                </li>
            </ul>
        </nav>
  )
}

export default NavBar;
