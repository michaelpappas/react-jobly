import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Errors from "./Errors";

/**
 * SignUp Form
 *
 * Props: signUp - function to call from parent
 *
 * State:
 * - formData - input changing
 * - errors - array of errors from API to display
 *
 *  * App -> RouteList -> SignupForm
 */
function SignUpForm({ signUp }) {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  /** Handles form input changes */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }
  /** On submit, calls parent function and redirects to home*/
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signUp(formData);
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="w-50 m-auto">
      {errors.length !== 0 && <Errors errors={errors} />}
      <h5 className="card-title">Sign Up</h5>
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
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            className="form-control mb-2"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            className="form-control mb-2"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
          <label htmlFor="email" className="form-label">Email</label>
          <input
            className="form-control mb-2"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
          <button className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
