import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import { Link } from "react-router-dom";

const Login = () => {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let handleLogin = () => {

    fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.message);
        localStorage.setItem("userDetails", JSON.stringify(data.message));
        window.location.href = `/${data.message.user.id}`;
        alert("Login successful");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-box p-4">
        <h2 className="text-white text-center mb-4">Login</h2>
        <form>
          <div className="mb-3">
            <label className="form-label text-white">Username</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person"></i></span>
              <input type="email" className="form-control" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)}/>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label text-white" htmlFor="rememberMe">Remember me</label>
          </div>
          <button type="submit" className="btn btn-light w-100" onClick={handleLogin}>LOGIN</button>
          <p className="text-center mt-2 text-white">
            <a href="#!" className="text-white">Forgot your password?</a>
          </p>
          <p className="text-center mt-2 text-white">
          Don't have an account?&nbsp;
            <Link to="/signup" className="text-white">Signup Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
