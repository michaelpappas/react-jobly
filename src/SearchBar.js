import { useState } from "react";

function SearchBar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(searchTerm);
    // call parent function to set state
  }

  function handleChange(evt) {
    const search = evt.target.value;
    setSearchTerm(search);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="search" onChange={handleChange} value={searchTerm} placeholder="Enter search term..."/>
      <button>Search</button>
    </form>
  );
}

export default SearchBar
