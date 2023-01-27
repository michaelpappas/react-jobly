import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Company from "../Companies/Company";
import Job from "../Jobs/Job";

/**
 * Items: Items to render
 * Props:
 * - currentItems: list of Current Items to render
 * - paginateFor - string to identify which card component to render
 */
function Items({ currentItems, paginateFor }) {
  return (
    <>
      {currentItems &&
        paginateFor === "companies" &&
        currentItems.map((item) => <Company key={item.handle} company={item} />)}

      {currentItems &&
        paginateFor === "jobs" &&
        currentItems.map((item) => <Job key={item.id} job={item} />)}
    </>
  );
}

/***
 * Paginated Items: Renders paginated items and pagination buttons
 * Props:
 * - itemsPerPage - int, num of items to render
 * - items - list of objects (jobs or companies) to render
 * - paginateFor - string to identify which card component to render
 */
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
      {items.length >= itemsPerPage && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          renderOnZeroPageCount={false}
          previousLabel="< prev"
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
      )}
    </>
  );
}

export default PaginatedItems;
