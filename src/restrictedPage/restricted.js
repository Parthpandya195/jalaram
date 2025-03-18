import "./restricted.css";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ For redirection

export function RestrictedPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ React Router navigation

  const handlePasswordSubmit = () => {
    const correctPassword = "jalaram123321";

    if (password === correctPassword) {
      navigate("/AdminDashboard"); // ✅ Redirect on correct password
    } else {
      setError("❌ Incorrect password. Try again.");
    }
  };

  return (
    <div className="restricted">
      <div className="restricted-header">
        <h1>Restricted Page<p>Home / Restricted Page</p></h1>
      </div>

      <div className="passwordPart">
        <div className="p-text-part">
          <h1>Password Protected</h1>
          <p>
            This page is password protected. If you are the website admin, or have access to this page, please type your password below.
          </p>
        </div>

        <div className="enterPassword">
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handlePasswordSubmit}>
            Submit Now <BsArrowRight style={{ marginLeft: "5px" }} color="#CDA274" />
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ Show error message */}
      </div>
    </div>
  );
}
