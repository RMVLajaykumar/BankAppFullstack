import React from "react";
import './Table.css';
import Dropdown from "../pagination/DropDown";
import Pagination from "../pagination/Pagination";
import Filter from "../filter/Filter";
//import CustomPagination from "../pagination/CustomPagination";



const Table = (props) => {
  const { data,searchParams,setSearchParams } = props;
  const content = data.content;

  if (content && content.length > 0) {
    
    const tableHeaders = (
      <tr>
        {Object.keys(content[0]).map((key) => (
          <th key={key}>{key}</th>
        ))}
      </tr>
    );

    
    const tableData = content.map((rowData, rowIndex) => (
      <tr key={rowIndex}>
        {Object.keys(rowData).map((key) => {
          if (key === "active") {
            
            return <td key={key}>{rowData[key] ? "Active" : "Inactive"}</td>;
          }
          return <td key={key}>{rowData[key]}</td>;
        })}
      </tr>
    ));

    return (
      <div className="table-container">
        <div className="table-section">
          <table className="table">
            <thead>{tableHeaders}</thead>
            <tbody>{tableData}</tbody>
          </table>
        </div>
        <div className="pagination-container">
          <Dropdown data={data} searchParams={searchParams} setSearchParams={setSearchParams} />
          <Pagination data={data}  searchParams={searchParams} setSearchParams={setSearchParams} />
          {/* <CustomPagination data={data} setPage={setPage}/> */}
        </div>
      </div>
    );
  } 
};

export default Table;