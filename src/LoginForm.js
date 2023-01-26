import { useState } from "react";

/**
 * Login Form
 * @returns
 */
function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    login(formData);
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
      <button>Login</button>
    </form>
  );
}

export default LoginForm;
