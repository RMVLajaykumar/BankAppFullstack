import React from "react";
import './Pagination.css';

const Pagination = (props) => {
  const { data, searchParams, setSearchParams } = props;
  const totalPages = data.totalPages;

  const page = () => {
    const pages = [];
    for (let index = 1; index <= totalPages; index++) {
      pages.push(
        <li key={index} className={`page-item ${data.page === index - 1 ? "active" : ""}`}>
          <p className="page-link" onClick={() => {
            const updatedParams = Object.fromEntries(searchParams);
            updatedParams.page = index-1;
            setSearchParams(updatedParams);
          }}>
            {index}
          </p>
        </li>
      );
    }
    return pages;
  };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <p className="page-link" onClick={() => {
              if (data.page > 0) {
                const updatedParams = Object.fromEntries(searchParams);
                updatedParams.page = data.page - 1;
                setSearchParams(updatedParams);
              }
            }}>
              Previous
            </p>
          </li>
          {page()}
          <li className="page-item">
            <p className="page-link" onClick={() => {
              if (data.page < totalPages - 1) {
                const updatedParams = Object.fromEntries(searchParams);
                updatedParams.page = data.page + 1;
                setSearchParams(updatedParams);
              }
            }}>
              Next
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
