import React from "react";
// import "./Header.css";
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div className="header">
            <nav className="desktop-nav-header">
                <ul>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    {/* <Link to="/marvelcharacters">
                        <li> Marvel</li>
                    </Link> */}
                    {/* <Link> 
                        <li>Something elser</li>
                    </Link> */}
                    
                </ul>
            </nav>
        </div>
    )
}