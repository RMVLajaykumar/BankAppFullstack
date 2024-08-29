import axios from "axios";
import { ValidationError,InternalServerError,UnAuthorized,NotFoundError } from "../component/utils/errors/APIError";
export const signin=async(email,password)=>{
    try{
    const response = await axios.post(`http://localhost:8082/api/auth/signin`,{
    email:email ,
    password:password
    });
    return response;
}
catch (error) {
  if (error.response) {
    const { status, message } = error.response.data;
    console.log(error.response.data)
    if (status === 400) {
      throw new ValidationError(message || "Internal Server Error");
    }
    if (status === 404) {
      throw new NotFoundError(message || "Not Found");
    }
    if (status === 401) {
      throw new UnAuthorized(message || "Unauthorized");
    }
  } else {
    throw new InternalServerError("Internal Server Error");
  }
}
};

export const verifyAdmin = async (token) => {
    try {
      if(!localStorage.getItem("authToken")){
        throw new NotFoundError("Token is not present");
      }
      const response = await axios.get(`http://localhost:8082/api/auth/verifyAdmin`, {
        params: {
          auth:token
        },
      });
      return response;
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        console.log(error.response.data)
        if (status === 401) {
          throw new UnAuthorized(message || "Unauthorized");
        }
      } else {
        throw new InternalServerError("Internal Server Error");
      }
    }
    };
  export const verifyUser = async (token) => {
    try {
      if(!localStorage.getItem("authToken")){
        throw new NotFoundError("Token is not present");
      }
      const response = await axios.get(`http://localhost:8082/api/auth/verifyUser`, {
        params: {
          auth:token
        },
      });
      return response;
    }catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        console.log(error.response.data)
        if (status === 401) {
          throw new UnAuthorized(message || "Unauthorized");
        }
      } else {
        throw new InternalServerError("Internal Server Error");
      }
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
      if (error.response) {
        const { status, message } = error.response.data;
        console.log(error.response.data)
        if (status === 400) {
          throw new ValidationError(message || "Internal Server Error");
        }
        if (status === 404) {
          throw new NotFoundError(message || "Not Found");
        }
        if (status === 401) {
          throw new UnAuthorized(message || "Unauthorized");
        }
      } else {
        throw new InternalServerError("Internal Server Error");
      }
    }
  };
