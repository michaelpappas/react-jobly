import { Link } from "react-router-dom";

function Company({ company }) {

  return (<Link to={`/companies/${company.handle}`}><h1>{company.name}</h1></Link>);
};

export default Company;