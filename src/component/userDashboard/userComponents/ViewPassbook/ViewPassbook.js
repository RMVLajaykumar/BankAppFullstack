import React from "react";
import { useNavigate, useParams,useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Table from "../../../../sharedComponents/table/Table";
import "./ViewPassbook.css";
import { sanitizeTransactionData } from "../../../utils/helpers/Data";
import ViewPassbookFilter from "../../../adminDashboard/adminComponents/viewTransaction/TransactionFilter";
import { getPassbook as fetchPassbook } from "../../../../services/customerServices";
import { verifyUser } from "../../../../services/authServices";
import { errorToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";

const ViewPassbook = () => {
  const routeParams=useParams();
  const accountNumber=routeParams.accountNumber;
  const navigate = useNavigate();
  const [searchParams,setSearchParams]=useSearchParams();
  const page=parseInt(searchParams.get("page") ) || 0;
  const size=parseInt(searchParams.get("size") ) || 5;
  const sortBy=(searchParams.get("sortBy") ) || "id";
  const direction=(searchParams.get("direction") ) || "asc";
  const from =(searchParams.get("from"))|| "";
  const to =(searchParams.get("to"))|| "";
  const [transactions, setTransactions] = useState([]);
  const [isUser,setIsUser]=useState();



  const getAllTransactions = async () => {
    
    try {
      const data = await fetchPassbook(
        from,
        to,
        page,
        size,
        sortBy,
        direction,
        accountNumber
      );
      if (data && data.content) {
        const sanitizedData = sanitizeTransactionData(data);
        setTransactions(sanitizedData);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      const statusCode = error.statusCode || "Unknown";
      const errorMessage = error.message || "An error occurred";
      const errorType = error.errorType || "Error";
      errorToast(`Error ${statusCode}: ${errorType}` );
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [page, size, sortBy, direction,from,to]);
 
  useEffect(() => {
    const checkUser = async () => {
      const response = await verifyUser(localStorage.getItem("authToken"));
      if (!response) {
        navigate('/');
        return;
      } else {
        setIsUser(true);
      }
    };

    checkUser();
  }, [navigate])
  
  return (
    <div className="view-transactions-container">
      {isUser && (
          <>
          <div>
            <button
              className="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>
          <div className="title">View Passbook</div>
          <ViewPassbookFilter
            data={transactions}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Table
            data={transactions}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <ToastContainer/>
        </>
      )}
      
    </div>
  );
};

export default ViewPassbook;