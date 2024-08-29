import axios from "axios";
import { NotFoundError,ValidationError,AlreadyAssigned,InternalServerError } from "../component/utils/errors/APIError";

export const getUserId = async(email) => {
    try {
      if(!localStorage.getItem("authToken")){
        throw new NotFoundError("Token is not present");
      }
      console.log(email)
        const response = await axios.get(`http://localhost:8082/api/auth/getCurrentUser`,{
            params:{
                email: email
            }
        })
        console.log(response.data)
    return response.data;
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



export const fetchAllAccounts = async () => {
  try {
    if(!localStorage.getItem("authToken")){
      throw new NotFoundError("Token is not present");
    }
    const response = await axios.get('http://localhost:8082/api/auth/customer/accounts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
     
    return response.data.content; 
  } catch (error) {
    console.log(error.response.data)
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      if(status===400){
        throw new ValidationError(message);
      }
      if(status===409){
        throw new AlreadyAssigned(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};


export const getPassbook = async (
  from,
  to,
  page,
  size,
  sortBy,
  direction,
  accountNumber
) => {
    try{
      if(!localStorage.getItem("authToken")){
        throw new NotFoundError("Token is not present");
      }
      console.log(accountNumber)
        const response = await axios.get(`http://localhost:8082/api/auth/customer/passbook/${accountNumber}`,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('authToken')
            },
            params:{
                from:from,
                to:to,
                page:page,
                size:size,
                sortBy:sortBy,
                direction:direction
                }
        }
    )

    return response.data;
    }
    catch (error) {
      if(error && error.response){
        const {status,message}=error.response.data;
        if(status===404){
          throw new NotFoundError(message);
        }
        if(status===400){
          throw new ValidationError(message);
        }
        throw new InternalServerError("Internal Server Error");
      }
    }
  };


export const performTransaction = async (senderAccount, receiverAccount, amount) => {
  try {
    if(!localStorage.getItem("authToken")){
      throw new NotFoundError("Token is not present");
    }
    const response = await axios.post(
      'http://localhost:8082/api/auth/customer/transactions',
      {}, 
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('authToken')
        },
        params: {
          senderAccountNumber: senderAccount,
          receiverAccountNumber: receiverAccount,
          amount: amount
        }
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      if(status===400){
        throw new ValidationError(message);
      }
      if(status===409){
        throw new AlreadyAssigned(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};
export const depositMoney = async (accountNumber, amount) => {
  try {
    if(!localStorage.getItem("authToken")){
      throw new NotFoundError("Token is not present");
    }
    const response = await axios.put(
      `http://localhost:8082/api/auth/customer/transactions/${accountNumber}/deposit`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('authToken')
        },
        params:{amount}
      }
    );
    return response.data; 
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      if(status===400){
        throw new ValidationError(message);
      }
      if(status===409){
        throw new AlreadyAssigned(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};

export const updateUserProfile = async (formData) => {
  try {
    if(!localStorage.getItem("authToken")){
      throw new NotFoundError("Token is not present");
    }
    const response = await axios.put('http://localhost:8082/api/auth/customer/profile', formData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken')
      },
    });
    return response.data;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      if(status===400){
        throw new ValidationError(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};