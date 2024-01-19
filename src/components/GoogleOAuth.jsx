import { useNavigate, useLocation } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

export const GoogleOAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickHandler = async () => {
    try {
      // initialize google authentication
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check to see if a user exists
      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);

      // if user DOES NOT exist, create user
      if (!docSnapshot.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          user: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Ooops, Something went wrong!!!");
    }
  };

  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname === "/sign-up" ? "Up" : "In"} with Google</p>
      <button className='socialIconDiv' onClick={onClickHandler}>
        <img className='socialIconImg' src={googleIcon} alt='Google logo' />
      </button>
    </div>
  );
};
