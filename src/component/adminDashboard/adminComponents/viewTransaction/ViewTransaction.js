import React, { useEffect, useState } from 'react';
import { viewAllTransactions } from '../../../../services/AdminServices';
import Table from '../../../../sharedComponents/table/Table';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { sanitizeTransactionData } from '../../../utils/helpers/Data';
import { verifyAdmin } from '../../../../services/AuthServices';
import TransactionFilter from './TransactionFilter'; 

const ViewTransaction = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const [searchParams,setSearchParams]=useSearchParams();
    const page=parseInt(searchParams.get("page") )|| 0;
    const size=parseInt(searchParams.get("size") ) || 5;
    const sortBy=(searchParams.get("sortBy") ) || "id";
    const direction=(searchParams.get("direction") ) || "asc";
    const from =(searchParams.get("from"))|| "";
    const to =(searchParams.get("to"))|| "";
    const [transactions, setTransactions] = useState([]);

    const getAllTransactions = async () => {
        try {
            const data = await viewAllTransactions(from, to, page, size, sortBy, direction);
            if (data && data.content) {
                console.log("Fetched Data:", data);
                const sanitizedData = sanitizeTransactionData(data);
                setTransactions(sanitizedData);
            } else {
                setTransactions([]);
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        getAllTransactions();
    }, [page, size, sortBy, direction, from, to]);

    useEffect(() => {
        const checkAdmin = async () => {
            const response = await verifyAdmin(localStorage.getItem("authToken"));
            console.log("Admin Check Response:", response);
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
        <div className="view-transactions-container">
            {isAdmin && (
                <>
                    <div>
                        <button className="back-button" onClick={() => navigate(-1)}>
                            Back
                        </button>
                    </div>
                    <div className="title">View Transactions</div>
                    <TransactionFilter
                        data={transactions}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                    />
                    <Table
                         data={transactions}
                         searchParams={searchParams}
                         setSearchParams={setSearchParams}
                    />
                </>
             
            )}
        </div>
    );
}

export default ViewTransaction;
