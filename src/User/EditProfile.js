import userContext from "./userContext";
import { useContext, useState } from "react";
import Errors from "../Utilities/Errors";
import JoblyApi from "../api";

/**
 * Edit profile form
 *
 * States:
 * - formData - for handling change of form inputs
 * - errors - list of error messages to display if error
 * - success - boolean for displaying if update is successful
 *
 * App -> RouteList -> EditProfile
 */
function EditProfile() {
  const { user, setUser } = useContext(userContext);

  const initialForm = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  /** Handles form input changes */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  /** On submit, calls JoblyApi method for updating a user,
   * calls setUser with updated user information from API patch
   * setSuccess to true if successful, setsErrors if errs
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    setErrors([]);
    try {
      const updatedUser = await JoblyApi.updateUser(formData, user.username);
      const newUserData = { ...updatedUser, applications: user.applications };
      setSuccess(true);
      setUser((curr) => ({ ...curr, data: newUserData }));
    } catch (err) {
      setSuccess(false);
      setErrors(err);
    }
  }

  return (
    <div className="EditProfile w-50 m-auto">
      {errors.length !== 0 && <Errors errors={errors} />}
      {success && <div className="alert alert-success">Updated profile!</div>}
      <h5>Profile</h5>
      <div className="card">
        <form onSubmit={handleSubmit} className="card-body form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            className="form-control mb-2"
            name="username"
            type="text"
            id="username"
            disabled
            value={user.username}
          />
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            className="form-control mb-2"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            className="form-control mb-2"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control mb-2"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
          <button className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
