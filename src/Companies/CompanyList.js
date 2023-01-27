import Company from "./Company";
import PaginatedItems from "../Utilities/Paginate";

/**
 * CompanyList - renders list of Company comps
 * Props:
 * - companies - list of obj like [{ name, description, handle, ... }, ...]
 */
function CompanyList({ companies }) {
  return (<div>
    <PaginatedItems itemsPerPage={10} items={companies} paginateFor="companies" />
  </div>
  );

}

export default CompanyList;