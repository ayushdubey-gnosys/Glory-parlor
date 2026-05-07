// controllers/customer/customerController.js
const customerModel = require("../../models/customer.model");

exports.createCustomer = async (req, res) => {
  try {
    const customer = await customerModel.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCustomerById = async (req, res) => {
  const customer = await customerModel.findById(req.params.id);
  res.json(customer);
};

exports.updateCustomer = async (req, res) => {
  const updated = await customerModel.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
  res.json(updated);
};

exports.deleteCustomer = async (req, res) => {
  await customerModel.findByIdAndDelete(req.params.id);
  res.json({ msg: "Customer deleted" });
};