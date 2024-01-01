import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    // Update formData state using the form input id as the key
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <main>
          <form>
            <input
              className='nameInput'
              type='text'
              placeholder='Name'
              id='name'
              value={name}
              onChange={onChangeHandler}
            />
            <input
              className='emailInput'
              type='text'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChangeHandler}
            />
            <div className='passwordInputDiv'>
              <input
                type={showPassword ? "text" : "password"}
                className='passwordInput'
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChangeHandler}
              />
              <img
                className='showPassword'
                src={visibilityIcon}
                alt='show password'
                onClick={() => setShowPassword((toggle) => !toggle)}
              />
            </div>

            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'>
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          {/* Google O Auth */}

          <Link to='/sign-in' className='registerLink'>
            Already Have an Account? Sign In
          </Link>
        </main>
      </div>
    </>
  );
};
