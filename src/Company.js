import { Link } from "react-router-dom";

/**
 * Company - renders company information
 * Props:
 * - company - obj like { name, description, handle, ... }
 */
function Company({ company }) {
  return (
    <Link to={`/companies/${company.handle}`}>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
    </Link>
  );
}

export default Company;
