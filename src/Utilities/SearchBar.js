import { useState } from "react";

/**
 * SearchBar - Fires parent function on submit
 * Props:
 * -Handlesearch - function in parent to fire
 */
function SearchBar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  /**Fires parent function */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(searchTerm);
  }

  /**Handles change in input */
  function handleChange(evt) {
    const search = evt.target.value;
    setSearchTerm(search);
  }

  return (
    <form onSubmit={handleSubmit} className="form-inline mb-4 w-25">
      <div className="input-group">
        <input className="form-control" name="search" onChange={handleChange} value={searchTerm} placeholder="Enter search term..."/>
        <button className="btn btn-primary">Search</button>
      </div>
    </form>
  );
}

export default SearchBar
