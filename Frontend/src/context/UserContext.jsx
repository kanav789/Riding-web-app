import React, { createContext, useState } from "react";

export const USerDataContext = createContext();

function UserContext({ children }) {
  const [user, setUser] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
  });
  return (
    <div>
      <USerDataContext.Provider value={{ user, setUser }}>
        {children}
      </USerDataContext.Provider>
    </div>
  );
}

export default UserContext;
