import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(
    localStorage.getItem("userToken") || null
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || null
  );
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken != null) {
      setUserLogin(userToken);
    }
  }, []);

  function tokenDetails() {
    if (userLogin) {
      const decodedToken = jwtDecode(userLogin);
      const { id } = decodedToken;
      setUserId(id);
    }
  }

  useEffect(() => {
    tokenDetails();
  }, [userLogin]);

  return (
    <userContext.Provider
      value={{
        userName,
        userId,
        userLogin,
        setUserLogin,
        setUserName,
        setUserId,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
}
