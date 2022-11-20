import { useEffect, useState } from "react";
import { getUser } from "../service/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const AllUser = () => {

  const [users,setUsers]=useState([]);

  useEffect(()=>{
    getAllUsers()
  },[])

  const getAllUsers=async()=>{
    const response=await getUser()
    setUsers(response.data)
  }
  const data=users.data
  
  return (
    <>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Address</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* {
          data.map((user)=>{
            return (
              <TableRow>
                <TableCell>{user.firstName+" "+user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address}</TableCell>
              </TableRow>
            )
          })
        } */}
      </TableBody>
    </Table>
    <div className="container">
    {
      
      data.map((user)=>{
        console.log(user.firstName)
      })
    }
    </div>
    </>
  );
};

export default AllUser;
