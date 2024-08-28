import React from "react";
import { useState,useEffect } from "react";
const TransactionFilter = ({ data,searchParams,setSearchParams }) => {
    const options = ["id", "amount","transactionDate"].map((key) => <option key={key} value={key}>{key}</option>);
    const [from,setFrom]=useState(searchParams.get("from")|| "");
    const [to,setTo]=useState(searchParams.get("to")|| "");
    const [sortBy,setSortBy]=useState(searchParams.get("sortBy")|| "Sort By");
    const [direction,setDirection]=useState(searchParams.get("direction")|| "Direction");

    useEffect(()=>{
        setFrom(searchParams.get("from")|| "")
        setTo(searchParams.get("to")|| "")
        setSortBy(searchParams.get("sortBy")|| "Sort By")
        setDirection(searchParams.get("direction")|| "Direction")
    },[searchParams]
    )
    




    


    const search = () => {
        const fromValue = document.querySelector("input[name='from']").value;
        const toValue = document.querySelector("input[name='to']").value;
        const sortByValue = document.querySelector("select[name='sortBy']").value;
        const directionValue = document.querySelector("select[name='direction']").value;

        // if (directionValue !== "Direction") {
        //     setDirection(directionValue);
        // }
        // if (sortByValue !== "Sort By") {
        //     setSortBy(sortByValue);
        // }
        // setFromDate(fromValue);
        // setToDate(toValue);
        const updatedParams=Object.fromEntries(searchParams);
        updatedParams.sortBy=sortByValue;
        updatedParams.direction=directionValue;
        updatedParams.from=fromValue;
        updatedParams.to=toValue;
        setSearchParams(updatedParams);
    }


    const reset = () => {
        setFrom("")
        setTo("")
        setSortBy("Sort By")
        setDirection("Direction")
        
        setSearchParams([])
    };

    return (
        <div className="filter-container">
            <div className="input-container">
                <label>From Date:</label>
                <input type="date" name="from" value={from} onChange={
                    (e)=>setFrom(e.target.value)
                }/>
            </div>
            <div className="input-container">
                <label>To Date:</label>
                <input type="date" name="to" value={to} onChange={
                    (e)=>setTo(e.target.value) } />
            </div>
            <div className="input-container" >

                <select name="sortBy" value={sortBy} onChange={
                    (e)=>setSortBy(e.target.value) }>
                    <option>Sort By</option>
                    {options}
                </select>
            </div>
            <div className="input-container">
                <select name="direction" value={direction} onChange={
                    (e)=>setDirection(e.target.value) }>
                    <option>Direction</option>
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

export default TransactionFilter;
