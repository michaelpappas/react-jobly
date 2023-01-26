/**
 * Renders a job card
 * Props: job - object like { id, title, salary, equity }
 */
function Job({job}) {
  return (
    <div className="Job card mb-2">
      <div className="card-body">
        <p>{job.title}</p>
        <p>{job.companyHandle}</p>
        <p>Salary:{job.salary}</p>
        <p>Equity:{job.equity}</p>
      </div>
    </div>
  )
}

export default Job;