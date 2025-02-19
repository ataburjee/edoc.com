import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="signup-container d-flex justify-content-center align-items-center vh-100 pt-4">
      <div className="signup-box py-3">
        <h2 className="text-white text-center">Sign Up</h2>
        <form>
          <div className="mb-3">
            <label className="form-label text-white">Name</label>
            <input type="text" className="form-control" placeholder="eg: Jahn Doe" />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input type="email" className="form-control" placeholder="eg: jahndoe@gmail.com" />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input type="password" className="form-control" placeholder="eg: Should be strong password" />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Profile Image</label>
            <input type="file" className="form-control" />
          </div>
          <button type="submit" className="btn btn-light w-100">SIGN UP</button>
          <p className="text-center mt-2 text-white">
          Already have an account?&nbsp;
            <Link to="/" className="text-white">Login Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
