import { Link } from "react-router-dom";

function Company({ company }) {
  console.log('company',company);
  return (
    <Link to={`/companies/${company.handle}`}>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
    </Link>
  );
}

export default Company;
