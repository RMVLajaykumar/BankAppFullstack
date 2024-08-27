import React from "react";
const TransactionFilter = ({ data,searchParams,setSearchParams }) => {
    const options = ["id", "amount","transactionDate"].map((key) => <option key={key} value={key}>{key}</option>);

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
        document.querySelector("input[name='from']").value = "";
        document.querySelector("input[name='to']").value = "";
        document.querySelector("select[name='sortBy']").value = "Sort By";
        document.querySelector("select[name='direction']").value = "Direction";
        setSearchParams([])
    };

    return (
        <div className="filter-container">
            <div className="input-container">
                <label>From Date:</label>
                <input type="date" name="from" />
            </div>
            <div className="input-container">
                <label>To Date:</label>
                <input type="date" name="to" />
            </div>
            <div className="input-container">
                <select name="sortBy">
                    <option>Sort By</option>
                    {options}
                </select>
            </div>
            <div className="input-container">
                <select name="direction">
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
