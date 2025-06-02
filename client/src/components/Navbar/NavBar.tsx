// the bar that will have bubble button components that route user to other pages when pressed
// import React from "react"

import { Link, useLocation } from "react-router-dom";
import '../../main.css'
import PawLove from "../../images/PawLove";
import home from "../../images/home_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import location from "../../images/location_on_24dp_000000_FILL0_wght400_GRAD0_opsz24 (1).svg"
import inbox from "../../images/inbox_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import { motion } from "framer-motion";
const NavBar = () => {
  const currentPage = useLocation().pathname;
  
  return (
            <nav className="nav-bar">
            <ul className='nav-links'>
                <li>
                  <motion.div whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 300, dampling: 15 }}>
                    <Link
                      to="/"
                      className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                    >
                        <img src={home}/>
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 300, dampling: 15 }} >
                    <Link
                      to="/adoption"
                      className={currentPage === '/adoption' ? 'nav-link active' : 'nav-link'}
                    >
                        <PawLove />
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 300, dampling: 15 }}>
                    <Link
                      to="/meetup"
                      className={currentPage === '/meetup' ? 'nav-link active' : 'nav-link'}
                    >
                        <img src={location}/>
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileTap={{ scale: 0.85 }} transition={{ type: "spring", stiffness: 300, dampling: 15 }}>
                    <Link 
                      to="/inbox"
                      className={currentPage === '/inbox' ? 'nav-link active' : 'nav-link'}
                    >
                        <img src={inbox}/>
                    </Link>
                  </motion.div>
                </li>
            </ul>
        </nav>
  )
}

export default NavBar;
