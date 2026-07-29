import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <div className="flex gap-4 max-w-xl mt-5">

  <div className="relative flex-1">
    <SearchIcon
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      placeholder="Search students..."
      className="
        bg-white
        rounded-xl
        p-3
        pl-10
        shadow-md
        w-full
      "
    />
  </div>

  <button
    className="
      bg-orange-500
      text-white
      px-5
      rounded-xl
    "
  >
    Search
  </button>

</div>
  )
}

export default SearchBar
