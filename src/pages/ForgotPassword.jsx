import { useState } from "react";
import { Link } from "react-router-dom";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

import React from "react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onChangeHandler = (event) => setEmail(event.target.value);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email Was Sent!!");
    } catch (error) {
      console.log(error);
      toast.error("Something went horribly wrong...");
    }
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password?</p>
      </header>
      <main>
        <form onSubmit={onSubmitHandler}>
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChangeHandler}
          />
          <Link className='forgotPasswordLink' to='/sign-in'>
            Sign In
          </Link>

          <div className='signInBar'>
            <div className='signInText'>Send Reset Link</div>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
