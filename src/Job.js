import userContext from "./userContext";
import { useContext, useState } from "react";

/**
 * Renders a job card
 * Props: job - object like { id, title, salary, equity }
 */
function Job({ job, applyForJob }) {

  const { user, setUser } = useContext(userContext);

  // const applied =

  return (
    <div className="Job card mb-2">
      <div className="card-body">
        <p>{job.title}</p>
        <p>{job.companyHandle}</p>
        <p>Salary:{job.salary}</p>
        <p>Equity:{job.equity}</p>
        <button onClick={applyForJob(job.id)} />
      </div>
    </div>
  );
}

export default Job;