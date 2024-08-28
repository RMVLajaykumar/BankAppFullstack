import React, { useEffect, useState } from "react";
import { sanitizeData } from "../../../utils/helpers/Data";
import { viewAllCustomers as fetchAllCustomers } from "../../../../services/adminServices";
import Table from '../../../../sharedComponents/table/Table';
import { useNavigate, useSearchParams } from "react-router-dom";
import Filter from "../../../../sharedComponents/filter/Filter";
import '../../../../sharedComponents/filter/Filter.css';
import { verifyAdmin } from "../../../../services/authServices";
import { errorToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";

const ViewCustomers = () => {
  const [isAdmin, setIsAdmin] = useState();
  const [customers, setCustomers] = useState({});
  const navigate = useNavigate();
  const [searchParams,setSearchParams]=useSearchParams();
  const page=parseInt(searchParams.get("page"))|| 0;
  const size=parseInt(searchParams.get("size") ) || 5;
  const sortBy=(searchParams.get("sortBy") ) || "firstName";
  const direction=(searchParams.get("direction") ) || "asc";

  const getAllCustomers = async () => {
    try {
      const data = await fetchAllCustomers(page, size, sortBy, direction);
      if (data && data.content) {
        const sanitizedData = sanitizeData(data, [
          "customer_id",
          "firstName",
          "lastName",
          "email",
          "active"
        ], setCustomers);
        setCustomers(sanitizedData);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      const statusCode = error.statusCode || "Unknown";
      const errorMessage = error.message || "An error occurred";
      const errorType = error.errorType || "Error";
      errorToast(`Error ${statusCode}: ${errorType}` );
      
    }
  };
  useEffect(() => {
    getAllCustomers();
  }, [page, size, sortBy, direction]);

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await verifyAdmin(localStorage.getItem("authToken"));
      if (!response) {
        navigate('/');
        return;
      } else {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, [navigate]);

  
  return (
    <div className="view-customers-container">
      {isAdmin && (
        <>
          <div>
            <button className="back-button" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
          <div className="title">View Customers</div>
          <div className="filter">
            <Filter
            data={customers}
            searchParams={searchParams}
            setSearchParams={setSearchParams}

            />
          </div>
          <Table
           data={customers}
           searchParams={searchParams}
           setSearchParams={setSearchParams}

          />
          <ToastContainer/>
        </>
      )}
    </div>
  );
};

export default ViewCustomers;
