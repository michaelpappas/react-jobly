import Company from "./Company";

/**
 * CompanyList - renders list of Company comps
 * Props:
 * - companies - list of obj like [{ name, description, handle, ... }, ...]
 */
function CompanyList({ companies }) {
  return (<div>
    {companies.map(company => <Company key={company.handle} company={company} />)}
  </div>
  );

}

export default CompanyList;