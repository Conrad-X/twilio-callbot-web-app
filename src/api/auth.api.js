import axios from "axios";
import { REACT_APP_SERVER_URL } from "../constants/constants";


const authBaseURL = `${REACT_APP_SERVER_URL}/auth`;
export const signIn = async (email, password) => {
  try {
    const res = await axios.post(`${authBaseURL}/login`, {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const signUp = async (firstName, email, password, lastName = "") => {
  try {
    const res = await axios.post(`${authBaseURL}/signup`, {
      firstName,
      lastName,
      email,
      password,
    });
    return res.data.message;
  } catch (err) {
    throw err;
  }
};

export const verifyUser = async (verificationToken) => {
  try {
    const res = await axios.post(`${authBaseURL}/verify`, {
      verificationToken,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
