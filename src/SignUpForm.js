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

  /** handles form input changes */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }
  /** on form submission calls parent function and redirects to home*/
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
      <div className="card">
        <form onSubmit={handleSubmit} className="card-body form-group">
          <h5 className="card-title">Sign Up</h5>
          <input
            className="form-control mb-2"
            name="username"
            placeholder="Username"
            type="text"
            id="username"
            onChange={handleChange}
            value={formData.username}
          />
          <input
            className="form-control mb-2"
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
          />
          <input
            className="form-control mb-2"
            name="firstName"
            placeholder="First Name"
            type="text"
            id="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
          <input
            className="form-control mb-2"
            name="lastName"
            placeholder="Last Name"
            type="text"
            id="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
          <input
            className="form-control mb-2"
            name="email"
            placeholder="Email"
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
