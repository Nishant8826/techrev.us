const express = require("express");
const router = express.Router();
const {
  createUser,
  fetchUser,
  fetchUserById,
  deleteCustomer,
  updateCustomer
} = require("../controllers/user");

router.post("/insertCustomer", createUser);
router.get("/selectCustomers", fetchUser); //All Customer
router.post("/selectCustomerById", fetchUserById); //by customer Email ID
router.post("/updateCustomer",updateCustomer)
router.post("/deleteCustomer", deleteCustomer);

module.exports = router;
