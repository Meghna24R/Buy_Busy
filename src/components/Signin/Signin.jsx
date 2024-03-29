import React, { useState } from 'react';
import './Signin.scss';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useValue } from '../../Context';
import { toast } from 'react-toastify';

export default function Signin() {
  const {  setSignIn, setEmail, email, password, setPassword, emptyField } = useValue();
  const [resetEmail, setResetEmail] = useState('');
  const [resetPasswordSent, setResetPasswordSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      setSignIn(true);
      // Redirect the user to a different page after successful sign in
      navigate('/');

      //clear the input field
      emptyField(); 
    } catch (error) {
      // Handle any errors
      console.error(error);
      toast.error("Something went wrong!!");
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a password reset email to the user's email address
      await sendPasswordResetEmail(auth, resetEmail);
      setResetPasswordSent(true);
      toast.success("Link Send on your mail");
    } catch (error) {
      // Handle any errors
      console.error(error);
      toast.error("Invalid credentials!!");
    }
  };

  return (
    <>
      <div className="signin">
        {!resetPasswordSent ? (
          <form className="signin">
            <h2>Sign In</h2>
            <input
              type="email"
              className="signininput"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              className="signininput"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="signingbtn" onClick={handleSubmit}>
              Sign In
            </button>
            <div className='signup'>
              <Link to="/signup" >
                <p>or Sign Up instead</p>
              </Link>
              <span className="reset-password-link">
                <Link to="#" onClick={() => setResetPasswordSent(true)}>
                  Forgot Password?
                </Link>
              </span>
            </div>
          </form>
        ) : (
          <form className="signin">
            <h2>Reset Password</h2>
            <p>
              Please enter your email address. We will send you a link to reset your password.
            </p>
            <input
              type="email"
              className="signininput"
              placeholder="Enter Email"
              value={resetEmail}
              onChange={(event) => setResetEmail(event.target.value)}
            />
            <button className="signingbtn" onClick={handleResetPassword}>
              Send Reset Email
            </button>
            <div className="reset-password-link">
              <Link to="#" onClick={() => setResetPasswordSent(false)}>
                Go Back
              </Link>
            </div>
          </form>
        )}
      </div>
    </>
  );
}