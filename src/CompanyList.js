import Company from "./Company";

function CompanyList({ companies }) {

  return (<div>
    {companies.map(company => <Company key={company.handle} company={company} />)}
  </div>
  );

}

export default CompanyList;