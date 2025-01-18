import React, { createContext, useState } from "react";

export const USerDataContext = createContext();
function UserContext({ children }) {
  const [user, setUser] = useState({
    fullName: {
      firstname: "",
      lastname: "",
    },
    email: "",
  });
  return (
    <div>
      <USerDataContext.Provider value={user}>
        {children}
      </USerDataContext.Provider>
    </div>
  );
}

export default UserContext;
