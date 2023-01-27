import PaginatedItems from "../Utilities/Paginate";

/**
 * Renders lists of Job cards
 * Props:
 * - jobs - list of obj like [ {id, title, salary, equity }, ...]
*/
function JobList({ jobs }) {
  return (
    <div>
      <PaginatedItems itemsPerPage={10} items={jobs} paginateFor="jobs" />
    </div>
  );
}

export default JobList;
