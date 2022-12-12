import { createContext, useState } from "react";

// as the actual value you want to access
// default user value
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

// UserProvider stores a user object -> stores a user state
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser}

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

