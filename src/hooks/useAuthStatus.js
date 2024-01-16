import { useEffect, usestate } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// https://stackoverflow.com/questions/65505665/protected-route-with-firebase
// custom hook to check the user's auth status
export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = usestate(false);
  const [loading, setLoading] = usestate(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setLoading(false);
    });
  });

  return { loading, loggedIn };
};
