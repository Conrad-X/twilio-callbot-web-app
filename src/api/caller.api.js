import axios from 'axios'
import { REACT_APP_SERVER_URL } from '../constants/constants';
import { getAuthConfig } from '../utils/general.util';
// require('dotenv').config()

const authBaseURL = `${REACT_APP_SERVER_URL}/caller`;

export const addCaller = async (props) => {
    const { name, description, phoneNumber } = props
    const config = getAuthConfig()
    // console.log(name, description, phoneNumber, config);
    try {
        const res = await axios.post(`${authBaseURL}`, {
            name,
            description,
            phoneNumber,
        }, config)

        return res.data;
    } catch (err) {
        throw err.response.data
    }
}

export const deleteCaller = async (props) => {
    const { id } = props
    const config = getAuthConfig()
    const updatedConfig = {...config, params: {
        id
    },}

    try {
        const res = await axios.delete(`${authBaseURL}`, updatedConfig)
        
        return res.data;
    } catch (err) {
        throw err.response.data
    }
}

export const getCallers = async () => {
    const config = getAuthConfig()

    try {
        const res = await axios.get(`${authBaseURL}`, config)
        console.log(res.data);
        return res.data;
    } catch (err) {
        throw err.response.data
    }
}


export const getCallerListPaginated = async (page) =>{
    const config = getAuthConfig()
    
    // console.log("page req",page);
    const limit=2
    try {
        const res = await axios.get(`${authBaseURL}/paginatedcallers?page=${page}&limit=${limit}`, config)

        // console.log("caller result", res)

        return res.data;
    } catch (err) {
        throw err.response.data
    }
}


export const updateCaller = async (props) => {
    // console.log("update caller",props)
    const { id, name, description, phoneNumber } = props
    const config = getAuthConfig()

    try {
        const res = await axios.post(`${authBaseURL}/updateCaller`, {
            id,
            name,
            description,
            phoneNumber,
        }, config)

        return res.data;
    } catch (err) {
        throw err.response.data
    }
}

