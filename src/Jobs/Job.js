import userContext from "../User/userContext";
import { useContext, useState } from "react";
import Errors from "../Utilities/Errors";
import JoblyApi from "../api";


/**
 * Renders a job card
 * Props: job - object like { id, title, salary, equity }
 */
function Job({ job }) {
  const { user, setUser } = useContext(userContext);
  const [errors, setErrors] = useState([]);

  const username = user.username;

  async function applyForJob(evt) {
    evt.preventDefault();
    try {
      await JoblyApi.applyToJob(username, job.id);
      const updatedUser = await JoblyApi.getUser(username);
      setUser((curr) => ({ ...curr, data: updatedUser }));

    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="Job card mb-2">
      {errors.length !== 0 && <Errors errors={errors} />}
      <div className="card-body">
        <p>{job.title}</p>
        <p>{job.companyHandle}</p>
        <p>Salary:{job.salary}</p>
        <p>Equity:{job.equity}</p>
        {!user.applications.includes(job.id) ? (
          <button className="btn btn-danger" onClick={applyForJob}>Apply</button>
        ) : (
          <button className="btn btn-success" disabled>You've Applied</button>
        )}
      </div>
    </div>
  );
}

export default Job;
