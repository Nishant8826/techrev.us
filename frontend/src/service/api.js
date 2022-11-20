import axios from "axios";

export const addUser=async(data)=>{
    try {
        return await axios.post("http://localhost:4000/insertCustomer",data)
    } catch (error) {
        console.log(error.message)
    }
}


export const getUser=async()=>{
    try {
        return await axios.get("http://localhost:4000/selectCustomers")
    } catch (error) {
        console.log(error.message)
    }
}