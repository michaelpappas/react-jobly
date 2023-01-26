import { useState } from "react";

/**
 * SignUp Form
 *{username, firstName, lastName, password, email}
 */
function SignUpForm({ signUp }) {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: ""
  });
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    signUp(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="username"
        type="text"
        id="username"
        onChange={handleChange}
        value={formData.username}
      />
      <input
        name="password"
        placeholder="password"
        type="password"
        id="password"
        onChange={handleChange}
        value={formData.password}
      />
      <input
        name="firstName"
        placeholder="firstName"
        type="text"
        id="firstName"
        onChange={handleChange}
        value={formData.firstName}
      />
      <input
        name="lastName"
        placeholder="lastName"
        type="text"
        id="lastName"
        onChange={handleChange}
        value={formData.lastName}
      />
      <input
        name="email"
        placeholder="email"
        type="email"
        id="email"
        onChange={handleChange}
        value={formData.email}
      />
      <button>Sign Up</button>
    </form>
  );
}

export default SignUpForm;
