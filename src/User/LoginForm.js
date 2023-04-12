import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "../Utilities/Errors";
/**
 * Login Form
 *
 * Props:
 * - Login - function to call from parent
 *
 * App -> RouteList -> LoginForm
 */

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: "guest",
    password: "guestpassword",
  });

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  /** handles form input changes */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }
  //make state for errors and make error component to display errors
  /** on form submission calls parent function and redirects to home*/
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="w-50 m-auto">
      {errors.length !== 0 && <Errors errors={errors} />}
      <h5>Login</h5>
      <div className="card">
        <form onSubmit={handleSubmit} className="card-body form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            className="form-control mb-2"
            name="username"
            type="text"
            id="username"
            onChange={handleChange}
            value={formData.username}
          />
          <label htmlFor="password" className="form-label">Password</label>
          <input
            className="form-control mb-2"
            name="password"
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
