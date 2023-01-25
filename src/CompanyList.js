import Company from "./Company";

function CompanyList({ companies }) {


  return (<div>
    {companies.map(company => <Company company={company} />)}
  </div>
  );

}

export default CompanyList;