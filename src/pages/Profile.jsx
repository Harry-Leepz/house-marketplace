import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const onClickHandler = () => {
    auth.signOut();
    toast.info("Logged Out Successfully!!!");
    navigate("/");
  };

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageheader'>My Profile</p>
        <button type='button' className='logOut' onClick={onClickHandler}>
          Logout
        </button>
      </header>
    </div>
  );
};
