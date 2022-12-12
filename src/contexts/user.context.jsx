// Anything that has to do with user value is here
import { createContext, useState, useEffect } from "react"

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils"

// as the actual value you want to access
// default user value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

// UserProvider stores a user object -> stores a user state
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }

  // only run this function once when the component mounts
  // the moment you initialize the listener, you will run this callback once
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
    // if a user comes through then create a user document from auth
      if (user) {
        createUserDocumentFromAuth(user)
      }
      // otherwise just set the current user
      setCurrentUser(user)
    })

    // returns a function that makes the cleanup, removing the listener, so it doesn't stack multiple unused listeners
    // That's what useEffect return receives, a cleanup function.
    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
