import React from "react";
import './DropDown.css';

const Dropdown = (props) => {
  const { data, searchParams, setSearchParams } = props;

  
  const options = () => {
    if (!data || !data.totalPages) return null; // Handle cases where data isn't loaded yet
    const sizes = [];
    for (let i = 1; i <= data.totalElements; i++) {
      sizes.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
      console.log(data)
    }

    
    return sizes;
  };

  const handleChange = (e) => {
    const updatedParams = Object.fromEntries([...searchParams]);
    updatedParams.page = 0; 
    updatedParams.size = e.target.value;
    setSearchParams(updatedParams);
  };

  return (
    <div>
      <select
        className="form-select"
        aria-label="Select page size"
        onChange={handleChange}
        value={searchParams.get("size") || ""}
      >
        <option value="" disabled>
          Page Size
        </option>
        {options()}
      </select>
    </div>
  );
};

export default Dropdown;
