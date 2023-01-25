/**
 * Renders a job card
 * Props: job - object like { id, title, salary, equity }
 */
function Job({job}) {
  return (
    <div className="Job" style={{"border":"2px solid black"}}>
      <p>{job.title}</p>
      <p>{job.companyHandle}</p>
      <p>Salary:{job.salary}</p>
      <p>Equity:{job.equity}</p>
    </div>
  )
}

export default Job;