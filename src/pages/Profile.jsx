import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";

import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";

export const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onClickHandler = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmitHandler = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update current display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  const onChangeHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageheader'>My Profile</p>
        <button type='button' className='logOut' onClick={onClickHandler}>
          Logout
        </button>
      </header>

      <main>
        <div className='profileFetailsheader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmitHandler();
              setChangeDetails((previous) => !previous);
            }}
          >
            {changeDetails ? "Done" : "Change"}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChangeHandler}
            />
            <input
              type='email'
              id='email'
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changeDetails}
              value={email}
              onChange={onChangeHandler}
            />
          </form>
        </div>

        <Link className='createListing' to='/create-listing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>
      </main>
    </div>
  );
};
