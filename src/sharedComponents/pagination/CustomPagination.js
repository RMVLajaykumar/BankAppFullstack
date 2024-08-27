import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({ totalPages, currentPage, setPage }) => {
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage + 1}
        onClick={() => handlePageChange(number - 1)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => currentPage > 0 && setPage(currentPage - 1)}
        disabled={currentPage === 0}
      />
      {items}
      <Pagination.Next
        onClick={() => currentPage < totalPages - 1 && setPage(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      />
    </Pagination>
  );
};

export default CustomPagination;
