import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./header.css";

export function Header() {
  return (
    <div className="header">
      <div className="header-logo-text">
        <Link style={{display:"flex"}} to="/">
          <div className="header-logo">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="header-text">
            <p>Jalaram</p>
          </div>
        </Link>
      </div>
      <div className="header-pages">
        <ul>
            <li><Link to={`/`}>Home</Link></li>
            <li><Link to={`team`}>Team</Link></li>
            <li><Link to={`/services`}>Services</Link></li>
            <li><Link to={`/projects`}>Projects</Link></li>
            <li><Link to={`/blog`}>Blog</Link></li>
            <li><Link to={`/contact`}>Contact</Link></li>
            <li><Link to={`/Signup`}>Login</Link></li>
            <li><Link to={`/AdminDashboard`}>admin</Link></li>
            <Link to={`/UserDashboard`}>our product</Link>

        </ul>
        
      </div>
    </div>
  );
}
