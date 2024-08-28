import React, { useEffect, useState } from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { fetchAllAccounts } from '../../../../services/customerServices';
import { useNavigate, useParams } from 'react-router-dom';
import { errorToast } from '../../../utils/toast';


const ViewPassbookModal = ({
  show,
  handleClose,
  selectedOption,
  setSelectedOption
}) => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [error,setError]=useState(false)

  const handleViewPassbook = () => {
    console.log(selectedOption)
    if (selectedOption) {
      navigate(`/user-dashboard/view-passbook/${selectedOption}`);
    }
  };

  useEffect(() => {
    const getAllAccounts = async () => {
      try {
        const response = await fetchAllAccounts();
        const accountOptions = response.map((account) => ({
          value: account.accountNumber,
          label: account.accountNumber
        }));
        setOptions(accountOptions);
      } catch (error) {
        setError(true)
        const statusCode = error.statusCode || "Unknown";
        const errorMessage = error.message || "An error occurred";
        const errorType = error.errorType || "Error";
        errorToast(`Error ${statusCode}: ${errorType}` );
      }
    };

    getAllAccounts();
  }, []);

  return (
    <BootstrapModal
      show={show}
      onHide={handleClose}
      dialogClassName="custom-modal"
      backdropClassName="custom-backdrop"
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>View Passbook</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <form>
          <div className="form-group">
            {!error && (
              <>
              <label htmlFor="passbookSelect">Select an Account:</label>
              <select
                id="passbookSelect"
                className="form-control"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="" >Select an option</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              </>
            )}
            {error && (<>
            <p style={{color:"red"}}>
              You have to be customer of bank to check passbook.Contact Admin
            </p>
            </>)}
          </div>
        </form>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary"  onClick={handleViewPassbook} disabled={error} >
          View
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default ViewPassbookModal;