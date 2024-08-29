import React, { useEffect,useState } from "react";
import "./Filter.css";

const Filter = (props) => {
  const { data,searchParams,setSearchParams} = props;
  const [sortBy,setSortBy]=useState(searchParams.get("sortBy")|| "Sort By");
  const [direction,setDirection]=useState(searchParams.get("direction")|| "Direction");

  useEffect(()=>
  {
    setSortBy(searchParams.get("sortBy")|| "Sort By")
    setDirection(searchParams.get("direction")|| "Direction")
  },[searchParams]
  )

  const options = ["firstName", "lastName"].map((key) => (
    <option key={key} value={key}>
        {key}
    </option>
  ));

  
  const search = () => {
    const sortByValue = document.querySelector("select[name='sortBy']").value;
    const directionValue = document.querySelector("select[name='direction']").value;

    const updatedParams=Object.fromEntries(searchParams);
    if (directionValue !== "Direction") {
      updatedParams.direction=directionValue;
  }
  if (sortByValue !== "Sort By") {
      updatedParams.sortBy=sortByValue;
  }
    setSearchParams(updatedParams);

  };

  
  const reset = () => {
    setSortBy("Sort By")
        setDirection("Direction")
    setSearchParams([]);

  };

  return (
    <div className="filter-container">
      <div className="input-container">
        <label>Sort By:</label>
        <select name="sortBy" value={sortBy} onChange={
                  (e)=>setSortBy(e.target.value) }>
          <option selected>Sort By</option>
          {options}
        </select>
      </div>
      <div className="input-container">
        <label>Direction:</label>
        <select name="direction"  value={direction} onChange={
                  (e)=>setDirection(e.target.value) }>
          <option selected>Direction</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="input-container">
        <button type="button" onClick={search}>
          Search
        </button>
      </div>
      <div className="input-container">
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;