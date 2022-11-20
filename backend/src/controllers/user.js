const bcrypt = require("bcrypt");
const tryCatch = require("../middleware/tryCatch");
const { findOne } = require("../models/user");
const usermodel = require("../models/user");
const { uploadFile } = require("../utils/awsConfig");
const Error = require("../utils/errorClass");
const { isAlpha, isPhone, isPassword, isEmail } = require("../utils/validation");

exports.createUser = tryCatch(async (req, res, next) => {
  let data = req.body;
  console.log(data)
  //----------------validations for requiered field ------------------
  let {
    firstName,
    lastName,
    userName,
    email,
    phone,
    dob,
    gender,
    password,
    confirmPassword,
    address,
  } = data;
  let files = req.files;
  const requiredField = [
    "firstName",
    "lastName",
    "userName",
    "email",
    "phone",
    "dob",
    "gender",
    "password",
    "confirmPassword",
    "address",
  ];
  for (let field of requiredField) {
    if (!data[field]) {
      return next(new Error(`Please provide ${field} field`, 400));
    }
  }
  const addressRequiredField = [
    "address",
    "landmark",
    "city",
    "state",
    "country",
    "zipcode",
  ];
  for (let field of addressRequiredField) {
    if (!data.address[field]) {
      return next(new Error(`Please provide ${field} in address`));
    }
  } //----------------------------------------------------------
  if (!firstName.match(/^[a-zA-Z]{2,20}$/)) {
    return next(new Error(`First Name only contain letters`, 400));
  }
  data.firstName = firstName[0].toUpperCase() + firstName.slice(1);
  if (!lastName.match(/^[a-zA-Z]{2,20}$/)) {
    return next(new Error(`Last Name only contain letters`, 400));
  }
  data.lastName = lastName[0].toUpperCase() + lastName.slice(1);
  if (!isPhone(phone)) {
    return next(new Error(`Please provide Indian valid number`, 400));
  }
  if(!isEmail(email)){
    return next(new Error(`Email is not valid`,400))
  }
  const isEmailUnique = await usermodel.findOne({ email });
  if (isEmailUnique) {
    return next(new Error(`This email is already registered`, 400));
  }
  const genderFiels = ["Male", "Female", "Others"];
  if (!genderFiels.includes(gender)) {
    return next(new Error(`Please select from Male, Female, Others`));
  }
  if (!isPassword(password)) {
    return next(
      new Error(`Password Suggestion : 8-15 digits contains !@#$%^&*`, 400)
    );
  }
  if (password != confirmPassword) {
    return next(new Error(`password is not matching`, 400));
  }
  data.password = await bcrypt.hash(password, 12);
  data.confirmPassword = data.password;
  if (!address.zipcode.match(/^[1-9][0-9]{5}$/)) {
    return next(new Error(`enter valid pincode`, 400));
  }
  if (!files[0]) {
    return next(new Error(`Please provide image File`, 400));
  }
  let fileURL = await uploadFile(files[0]);
  data.image = fileURL;

  const saveData = await usermodel.create(data);
  res.cookie("user_Id", saveData._id.toString(), {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  return res.status(201).send({ success: true, data: saveData });
});
//---------------------------------------------------------------------
exports.fetchUser = tryCatch(async (req, res, next) => {
  const users = await usermodel.find({ isDeleted: false });
  if (users.length == 0) {
    return next(new Error(`No User found`, 404));
  }
  return res.status(200).send({
    success: true,
    Users: `${users.length}`,
    data: users,
  });
});
//---------------------------------------------------------------------
exports.fetchUserById = tryCatch(async (req, res, next) => {
  const { user_Id } = req.cookies;
  const isValidUser = await usermodel.findOne({ _id:user_Id, isDeleted: false });
  if (!isValidUser) {
    return next(new Error(`User not found`, 404));
  }
  return res.status(200).send({
    success: true,
    data: isValidUser,
  });
});
//----------------------------------------------------------------------
exports.updateCustomer = tryCatch(async (req, res, next) => {
  const data = req.body;
  const files = req.files;
  const prevDoc = await usermodel.findOne({ _id: req.cookies.user_Id });
  if (!prevDoc) {
    return next(new Error(`user not found`, 404));
  }
  const updatedObj = {};
  if (data.firstName) {
    if (!data.firstName.match(/^[a-zA-Z]{2,20}$/)) {
      return next(new Error(`First Name only contain letters`, 400));
    }
    updatedObj.firstName =
      data.firstName[0].toUpperCase() + data.firstName.slice(1);
  }
  if (data.lastName) {
    if (!data.lastName.match(/^[a-zA-Z]{2,20}$/)) {
      return next(new Error(`Last Name only contain letters`, 400));
    }
    updatedObj.lastName =
      data.lastName[0].toUpperCase() + data.lastName.slice(1);
  }
  if (data.email) {
    const isEmailUnique = await usermodel.findOne({ email: data.email });
    if (isEmailUnique) {
      return next(new Error(`This email is already registered`, 400));
    }
    updatedObj.email = data.email;
  }
  if (data.gender) {
    const genderFiels = ["Male", "Female", "Others"];
    if (!genderFiels.includes(data.gender)) {
      return next(new Error(`Please select from Male, Female, Others`));
    }
    updatedObj.gender = data.gender;
  }
  if (data.password) {
    if (!isPassword(data.password)) {
      return next(
        new Error(`Password Suggestion : 8-15 digits contains !@#$%^&*`, 400)
      );
    }
    if (data.password != data.confirmPassword) {
      return next(new Error(`password is not matching`, 400));
    }
    updatedObj.password = await bcrypt.hash(data.password, 12);
    updatedObj.confirmPassword = updatedObj.password;
  }
  if (files) {
    if (!files[0]) {
      return next(new Error(`Please provide image File`, 400));
    }
    let fileURL = await uploadFile(files[0]);
    updatedObj.image = fileURL;
  }
  if (data.address) {
    updatedObj.address = prevDoc.address;
    if (data.address.address) {
      updatedObj.address.address = data.address.address;
    }
    if (data.address.landmark) {
      updatedObj.address.landmark = data.address.landmark;
    }
    if (data.address.city) {
      updatedObj.address.city = data.address.city;
    }
    if (data.address.country) {
      updatedObj.address.country = data.address.country;
    }
    if (data.address.zipcode) {
      if (!data.address.zipcode.match(/^[1-9][0-9]{5}$/)) {
        return next(new Error(`enter valid pincode`, 400));
      }
      updatedObj.address.zipcode = data.address.zipcode;
    }
  }
  const updateCustomerObject = await usermodel.findByIdAndUpdate(
    req.cookies.user_Id,
    updatedObj,
    { new: true }
  );
  return res.status(200).send({ success: true, data: updateCustomerObject });
});
//------------------------------------------------------------------------
exports.deleteCustomer = tryCatch(async (req, res, next) => {
  const { user_Id } = req.cookies;
  const isValidUser = await usermodel.findOne({
    _id: user_Id,
    isDeleted: false,
  });
  if (!isValidUser) {
    return next(new Error(`User Deleted`, 404));
  }
  const deleteDoc = await usermodel.findOneAndUpdate(
    { _id: user_Id },
    { $set: { isDeleted: true } }
  );
  res.cookie("user_Id",null,{
    expires:new Date(Date.now()),
    httpOnly:true
  })
  return res.status(200).send({ success: true, msg: "Deleted successfully" });
});
//------------------------------------------------------------------------
