import Job from "./Job";

/**
 * Renders lists of Job cards
 * Props:
 * - jobs - list of obj like [ {id, title, salary, equity }, ...]
 */
function JobList({ jobs }) {
  return (
    <div>
      {jobs.map((job) => (
        <Job key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
