import React from "react";

const Pagination = ({ rowsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPageNumbersToShow = 5;
  let firstPageNumberToShow = Math.max(
    1,
    currentPage - Math.floor(totalPageNumbersToShow / 2)
  );
  let lastPageNumberToShow = firstPageNumberToShow + totalPageNumbersToShow - 1;

  if (lastPageNumberToShow > pageNumbers.length) {
    lastPageNumberToShow = pageNumbers.length;
    firstPageNumberToShow = Math.max(
      1,
      lastPageNumberToShow - totalPageNumbersToShow + 1
    );
  }

  const visiblePageNumbers = pageNumbers.slice(
    firstPageNumberToShow - 1,
    lastPageNumberToShow
  );

  return (
    <div className='pagination flex space-x-1'>
      <button
        onClick={() => paginate(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        &#171; Prev
      </button>

      {visiblePageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
            currentPage === number
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : ""
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => paginate(Math.min(currentPage + 1, pageNumbers.length))}
        disabled={currentPage === pageNumbers.length}
        className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
          currentPage === pageNumbers.length
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        Next &#187;
      </button>
    </div>
  );
};

export default Pagination;
