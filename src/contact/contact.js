import { useState } from "react";
import "./contact.css";
import { BsArrowRight } from "react-icons/bs";

export function Contact() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, email, subject, phone, message } = formData;

    if (!fullname || !email || !subject || !phone || !message) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Message saved successfully!");
        setFormData({ fullname: "", email: "", subject: "", phone: "", message: "" }); // Clear form
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ An error occurred. Please try again.");
    }
  };

  return (
    <div className="contact">
      <div className="contact-header">
        <h1>
          Contact Us<p>Home / Contact</p>
        </h1>
      </div>
      <div className="contact-content">
        <h2>We love meeting new people and helping them.</h2>
        <div className="contact-form">
          <form onSubmit={handleSubmit} className="contact-form-fill">
            <div className="nameEmail">
              <input
                name="fullname"
                placeholder="Name"
                value={formData.fullname}
                onChange={handleChange}
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="subjectPhone">
              <input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="interested">
              <textarea
                name="message"
                placeholder="Hello, I am interested in.."
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div className="send">
              <button type="submit">
                Send Now
                <BsArrowRight style={{ marginLeft: "5px" }} color="#CDA274" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
