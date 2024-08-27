import axios from "axios";
export const signin=async(email,password)=>{
    try{
    const response = await axios.post(`http://localhost:8082/api/auth/signin`,{
    email:email ,
    password:password
    });
    return response;
}
catch(error){
    console.log("error occured while authentication")
}
}
export const verifyAdmin = async (token) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/auth/verifyAdmin`, {
        params: {
          auth:token
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  export const verifyUser = async (token) => {
    // const token=localStorage.getItem("auth");
    try {
      const response = await axios.get(`http://localhost:8082/api/auth/verifyUser`, {
        params: {
          auth:token
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const signup = async (name, email, password, role) => {
    try {
      const response = await axios.post(`http://localhost:8082/api/auth/signup`, {
        name: name,
        email: email,
        password: password,
        admin: role
      });
      return response;
    } catch (error) {
      console.log("Error occurred while registering:", error);
      throw error;
    }
  };
