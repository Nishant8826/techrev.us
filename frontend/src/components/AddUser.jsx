import { addUser } from "../service/api";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { React, useState } from "react";
const defaultValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  phone: "",
  gender: "",
  password: "",
  confirmPassword: "",
  
};
const AddUser = () => {
  const paperStyle = { padding: "20px 30px", width: 500, margin: "20px auto" };
  const addUserStyle = { margin: "auto" };
  const [category, setCategory] = useState("male");
  const [user, setUser] = useState(defaultValues);
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const addUserDetails = async () => {
    await addUser(user);
  };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <FormGroup>
          <Typography variant="h4" style={addUserStyle}>
            Add User
          </Typography>
          <FormControl>
            <InputLabel>First Name</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name="firstName" />
          </FormControl>
          <FormControl>
            <InputLabel>Last Name</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name="lastName" />
          </FormControl>
          <FormControl>
            <InputLabel>Username</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name="userName" />
          </FormControl>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name="email" />
          </FormControl>
          <FormControl>
            <InputLabel>Phone</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name="phone" />
          </FormControl>
          <FormControl>
            <InputLabel>Password</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name="password" />
          </FormControl>
          <FormControl>
            <InputLabel>Confirm Password</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name="confirmPassword" />
          </FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ display: "initial" }}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
          <br />
          <Typography variant="h6">Address</Typography>
          <FormControl>
            <InputLabel>Address</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name="address[address]" />
          </FormControl>
          <FormControl>
            <InputLabel>Landmark</InputLabel>
            <Input
              onChange={(e) => onValueChange(e)}
              name="address[landmark]"
            />
          </FormControl>
          <FormControl>
            <InputLabel>Country</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name="address[country]" />
          </FormControl>
          <FormControl>
            <InputLabel>State</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name="address[state]" />
          </FormControl>
          <FormControl>
            <InputLabel>City</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name="address[city]" />
          </FormControl>
          <FormControl>
            <InputLabel>Zipcode</InputLabel>
            <Input onChange={(e) => onValueChange(e)} name="address[zipcode]" />
          </FormControl>
          <FormControl>
            <Button variant="contained" onClick={addUserDetails}>
              Submit
            </Button>
          </FormControl>
        </FormGroup>
      </Paper>
    </Grid>
  );
};

export default AddUser;
