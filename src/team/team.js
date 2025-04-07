import "./team.css";
import m0 from "../images/team/parth.jpg";
import m1 from "../images/team/rushang.jpg";
import m2 from "../images/team/vivek.jpg";
import m3 from "../images/team/member4.png";
import m4 from "../images/team/member5.png";
import m5 from "../images/team/member6.png";
import m6 from "../images/team/member7.png";
import m7 from "../images/team/member8.png";
import data from "./team_members.json";
import { FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Team() {
  const images = [m0, m1, m2, m3, m4, m5, m6, m7]; // Array of all images

  return (
    <div className="team">
      <div className="team-header">
        <h1>
          Our Professional <p>Home / Team</p>
        </h1>
      </div>
      <div className="team-members">
        {data.members
          .filter((m, ind) => ind < 8)
          .map((mbr, i) => (
            <Link to={`/team-single`} key={i}>
              <div className="member">
                <div className="member-photo">
                  <img src={images[i]} alt={`member-${i}`} />
                </div>
                <div className="member-info">
                  <p className="fullname">{mbr.fullname}</p>
                  <p className="m-detail">
                    {mbr.job}, {mbr.country}
                  </p>
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                        <FaLinkedin />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
                        <FaTwitter />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
