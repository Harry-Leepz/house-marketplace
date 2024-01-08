import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
  }, []);

  return user ? <div>{user.displayName}</div> : <div>Not logged in </div>;
};
