// Anything that has to do with user value is here
import { createContext,useEffect, useReducer } from "react"

import { createAction } from "../utils/reducer/reducer.utils"

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

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
}

const INITIAL_STATE = {
  currentUser: null,
}

// Use reducer to store current user
const userReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
}

// UserProvider stores a user object -> stores a user state
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null)
  
  // const { currentUser } = state
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) =>
  dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  
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
