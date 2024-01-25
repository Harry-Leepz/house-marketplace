import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export const CreateListing = () => {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      // check the current authentication state
      onAuthStateChanged(auth, (user) => {
        // if a user is authenticated, update formdata with the user id from firebase auth
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  if (loading) {
    return <Loading />;
  }

  return <div>CreateListing</div>;
};
