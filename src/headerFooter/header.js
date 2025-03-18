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
            <li><Link to={`/`}>HOME</Link></li>
            <li><Link to={`team`}>TEAM</Link></li>
            <li><Link to={`/services`}>SERVICES</Link></li>
            <li><Link to={`/projects`}>PROJECTS</Link></li>
            <li><Link to={`/blog`}>BLOG</Link></li>
            <li><Link to={`/contact`}>CONTACT</Link></li>
            <li><Link to={`/Signup`}>LOGIN</Link></li>
          {/* <Link to={`/AdminDashboard`}></Link> */}
            <Link to={`/UserDashboard`}>PRODUCTS</Link>

        </ul>
        
      </div>
    </div>
  );
}
