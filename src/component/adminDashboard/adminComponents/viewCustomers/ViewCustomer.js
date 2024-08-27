import React, { useEffect, useState } from "react";
import { sanitizeData } from "../../../utils/helpers/Data";
import { viewAllCustomers as fetchAllCustomers } from "../../../../services/AdminServices";
import Table from '../../../../sharedComponents/table/Table';
import { useNavigate, useSearchParams } from "react-router-dom";
import Filter from "../../../../sharedComponents/filter/Filter";
import '../../../../sharedComponents/filter/Filter.css';
import { verifyAdmin } from "../../../../services/AuthServices";


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
      console.error('Error fetching customers:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
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
            <button className="back-button" onClick={() => navigate(`/admin-dashboard`)}>
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
        </>
      )}
    </div>
  );
};

export default ViewCustomers;
