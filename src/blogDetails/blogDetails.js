import "./blogDetails.css";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { BsArrowRight, BsSearch } from "react-icons/bs";
import photo1 from "../images/blogContent1.png";
import photo2 from "../images/blogContent2.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";  // ✅ Import axios for API requests

export function BlogDetails() {
  // State to store form data
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const pClassList = e.target.parentElement;
    if (e.target.classList.contains("nonselected")) {
      for (let i = 0; i < pClassList.childNodes.length; i++) {
        if (pClassList.childNodes[i].className === "blogD-tag selected") {
          pClassList.childNodes[i].className = "blogD-tag nonselected";
        }
      }
      e.target.classList.remove("nonselected");
      e.target.classList.add("selected");
    } else if (e.target.classList.contains("selected")) {
      for (let i = 0; i < pClassList.childNodes.length; i++) {
        if (pClassList.childNodes[i].className === "blogD-tag selected") {
          pClassList.childNodes[i].className = "blogD-tag nonselected";
        }
      }
    }
  };

  // ✅ Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ✅ Submit form data to MongoDB
  const handleSubmit = async () => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/blog-contact", formData);

      if (response.data.success) {
        setSuccessMessage("✅ Message sent successfully!");
        setFormData({
          fullname: "",
          email: "",
          subject: "",
          phone: "",
          message: "",
        });
      } else {
        setErrorMessage("❌ Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setErrorMessage("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blogDetails">
      <div className="blogD-header"></div>
      <div className="blogDetailsAll">
        <div className="blog-content">
          <h1>Let's Get Solution for Building Construction Work</h1>
          <div className="bc-photo">
            <img src={photo1} alt="blog"></img>
          </div>
          <div className="datePath">
            <p className="date">26 December 2022</p>
            <p className="path">Interior / Design / Home / Decore</p>
          </div>
          <div className="bc-text t1">
            <p>
              Lorem ipsum dolor sit amet, adipiscing Aliquam eu sem vitae...
            </p>
          </div>

          <div className="blog-leave-reply">
            <p>Leave a Reply</p>
            
            <div className="nameEmail">
              <input
                name="fullname"
                placeholder="Name"
                value={formData.fullname}
                onChange={handleInputChange}
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="sitePhone">
              <input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="interested">
              <textarea
                name="message"
                placeholder="Hello, I am interested in.."
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>

            <div className="blogD-saving-send">
              <div className="send">
                <button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Sending..." : "Send Now"}
                  <BsArrowRight style={{ marginLeft: "5px" }} color="#CDA274" />
                </button>
              </div>
            </div>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>

        <div className="blogD-sidebar">
          <div className="search-box">
            <input type="search" name="search" placeholder="Search" />
            <button>
              <BsSearch />
            </button>
          </div>
          <div className="latest-news">
            <h2>Latest News</h2>
            <div className="news">
              <Link to={`/blog-details`}><p className="news-title">We Focus On Comfort And Gorgeous</p></Link>
              <p className="news-date">28/02/2023</p>
            </div>
          </div>
          <div className="blogD-categories">
            <h2>Categories</h2>
            <ul>
              <li>Decoration</li>
              <li>Door Windows</li>
              <li>Home Land</li>
              <li>Roof Installation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
