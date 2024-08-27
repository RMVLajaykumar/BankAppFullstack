import axios from "axios";

export const getUserId = async(email) => {
    try {
      console.log(email)
        const response = await axios.get(`http://localhost:8082/api/auth/getCurrentUser`,{
            params:{
                email: email
            }
        })
        console.log(response.data)
    return response.data;
}
catch(error){
    console.error(error);
}
};



export const fetchAllAccounts = async () => {
  try {
    const response = await axios.get('http://localhost:8082/api/auth/customer/accounts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    return response.data.content; 
  } catch (error) {
    console.error('Error fetching accounts:', error.response ? error.response.data : error.message);
    throw error;
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
    catch(error){
        console.error(error);
    }
};


export const performTransaction = async (senderAccount, receiverAccount, amount) => {
  try {
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
    console.error('Transaction failed:', error);
    throw error;
  }
};
export const depositMoney = async (accountNumber, amount) => {
  try {
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
    console.error('Deposit failed:', error);
    throw error; 
  }
};

export const updateUserProfile = async (formData) => {
  try {
    const response = await axios.put('http://localhost:8082/api/auth/customer/profile', formData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken')
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user profile');
  }
};
