import { Link } from "react-router-dom";
import "./Company.css";

/**
 * Company - renders company information
 * Props:
 * - company - obj like { name, description, handle, ... }
 */
function Company({ company }) {

  return (
    <Link to={`/companies/${company.handle}`} className="Company card mb-2">
      <div className="card-body">
        <h1>{company.name}</h1>
        <p>{company.description}</p>
        {company.logoUrl && <img src={company.logoUrl} alt={company.handle} />}
      </div>
    </Link>
  );
}

export default Company;
