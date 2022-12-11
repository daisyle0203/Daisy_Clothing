import { useState } from "react"

import FormInput from "../form-input/form-input.component"

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    // if the password does not match the confirm password then throw an alert
    if (password !== confirmPassword) {
      alert("passwords do not match")
      return
    }

    // if password matches confirm password then create an user with email and password and the display name
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      await createUserDocumentFromAuth(user, { displayName })

      // clear the input after user submit
      resetFormFields()
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use")
      } else {
        console.log(error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>

        <FormInput
        label=" Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
        label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
        label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
        label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
