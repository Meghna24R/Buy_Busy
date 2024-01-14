import React, { useState } from 'react';
import '../Signin/Signin.scss';
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useValue } from '../../Context';
import { toast } from 'react-toastify';

export default function Signup() {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState(''); 
  // const [password, setPassword] = useState('');
  const { name,  email, password, setName, setEmail, setPassword} = useValue();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update the user's display name with the entered name
        updateProfile(user, {
          displayName: name
        });

        // Save user information to Firebase Firestore
        addDoc(collection(db, 'users'), {
          name,
          email
        });

        //
        toast.success(`Welcome ${name}, you have successfully signed up`);

        // Redirect the user to a different page after successful signup
        navigate('/signin');
    } 
    catch (error) {
      // Handle any errors
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <>
      <div className="signin">
        <form className="signin">
          <h2>Sign Up</h2>
          <input
            type="text"
            className="signininput"
            placeholder="Enter Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
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
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}