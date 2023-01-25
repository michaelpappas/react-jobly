import { Link } from "react-router-dom";
import "./Company.css";

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
      {company.logoUrl && <img src={company.logoUrl} alt={company.handle} />}
    </Link>
  );
}

export default Company;
