import { useParams } from "react-router-dom";

/**
 * Display Jobs and company details from a specific company
 * State:
 * - company - a company object like { handle, name, numEmployees, jobs }
 *    jobs - a list of objects like { id, title, salary, equity }
 */

function CompanyDetails() {
  const { handle } = useParams();
  return (
    <div>
      <h1>CompanyDetails for {handle}</h1>
    </div>
  );
};

export default CompanyDetails;