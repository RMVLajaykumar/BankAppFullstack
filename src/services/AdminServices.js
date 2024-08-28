import axios from "axios";
import { NotFoundError,InternalServerError,AlreadyAssigned } from "../component/utils/errors/APIError";
export const viewAllCustomers=async (page,size,sortBy,direction)=>{
    try{
        const response=await axios.get(`http://localhost:8082/api/auth/admin`,{
            headers:{
                authorization:`Bearer ${localStorage.getItem('authToken')}`
            },
            params:{page,size,sortBy,direction}
        })
        return response.data
    }
    catch (error) {
        if(error && error.response){
          const {status,message}=error.response.data;
          if(status===404){
            throw new NotFoundError(message);
          }
          throw new InternalServerError("Internal Server Error");
        }
      }
    };

export const activateCustomer = async (customerID) => {
    try {
        const response = await axios.put(
           `http://localhost:8082/api/auth/admin/customers/active/${customerID}`, 
            {}, 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        if(error && error.response){
          const {status,message}=error.response.data;
          if(status===404){
            throw new NotFoundError(message);
          }
          if(status===409){
            throw new AlreadyAssigned(message);
          }
          throw new InternalServerError("Internal Server Error");
        }
      }
    };

export const deactivateCustomer = async (customerID) => {
    try {
        const response = await axios.delete(
            `http://localhost:8082/api/auth/admin/customers/${customerID}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        );
        return response.data;
    }catch (error) {
        if(error && error.response){
          const {status,message}=error.response.data;
          if(status===404){
            throw new NotFoundError(message);
          }
          if(status===409){
            throw new AlreadyAssigned(message);
          }
          throw new InternalServerError("Internal Server Error");
        }
      }
    };


export const addCustomer = async (userID, firstName, lastName) => {
    try {
        const response = await axios.post(
            `http://localhost:8082/api/auth/admin/${userID}`,
            { firstName, lastName },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        if(error && error.response){
          const {status,message}=error.response.data;
          if(status===404){
            throw new NotFoundError(message);
          }
          if(status===409){
            throw new AlreadyAssigned(message);
          }
          throw new InternalServerError("Internal Server Error");
        }
      }
    };


export const viewAllTransactions=async(from,to,page,size,sortBy,direction)=>{
    try{
        const response=await axios.get(`http://localhost:8082/api/auth/admin/transactions`,{
            headers:{
                authorization:`Bearer ${localStorage.getItem('authToken')}`
            },
            params:{from,to,page,size,sortBy,direction}
        })
        return response.data
    }
    catch (error) {
        if(error && error.response){
          const {status,message}=error.response.data;
          if(status===404){
            throw new NotFoundError(message);
          }
          throw new InternalServerError("Internal Server Error");
        }
      }
    };

export const checkUserIDExists = async (userID) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/auth/admin/users/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response.data;
    }   catch (error) {
        if(error && error.response){
          const {status,message}=error.response.data;
          if(status===404){
            throw new NotFoundError(message);
          }
          throw new InternalServerError("Internal Server Error");
        }
      }
    };

  export const addBankAccount = async (customerId, bankId) => {
    try {
        const response = await axios.post(
            `http://localhost:8082/api/auth/admin/${customerId}/account/${bankId}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        if(error && error.response){
          const {status,message}=error.response.data;
          if(status===404){
            throw new NotFoundError(message);
          }
          if(status===409){
            throw new AlreadyAssigned(message);
          }
          throw new InternalServerError("Internal Server Error");
        }
      }
    };