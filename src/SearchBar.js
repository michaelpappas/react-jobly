import { useState } from "react";

function SearchBar() {

  const [searchTerm, setSearchTerm] = useState();

  function handleSubmit(term) {

  }

  return (
    <form>
      <input />
      <submit onClick={handleSubmit} />
    </form>
  );
}