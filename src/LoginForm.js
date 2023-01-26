import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Login Form
 * TODO: add form error handling and validation
 */
function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  /** handles form input changes */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }
  //TODO: make async try catch login and await login
  //make state for errors and make error component to display errors
  /** on form submission calls parent function and redirects to home*/
  function handleSubmit(evt) {
    evt.preventDefault();
    login(formData);
    navigate("/");
  }

  return (
    <div className="w-50 m-auto">
      <div className="card">
        <form onSubmit={handleSubmit} className="card-body form-group">
          <h5 className="card-title">Login</h5>
          <input
            className="form-control mb-2"
            name="username"
            placeholder="username"
            type="text"
            id="username"
            onChange={handleChange}
            value={formData.username}
          />
          <input
            className="form-control mb-2"
            name="password"
            placeholder="password"
            type="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
