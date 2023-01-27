import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Company from '../Companies/Company';
import Job from '../Jobs/Job';

function Items({ currentItems, paginateFor }) {
  return (
    <>
      {currentItems && paginateFor === "companies" &&
        currentItems.map((item) => (
          <Company company={item} />

        ))}

      {currentItems && paginateFor === "jobs" &&
        currentItems.map((item) => (
          <Job job={item} />

        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage, items, paginateFor }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} paginateFor={paginateFor} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center pb-4"
        activeClassName="active"
      />
    </>
  );
}



export default PaginatedItems;