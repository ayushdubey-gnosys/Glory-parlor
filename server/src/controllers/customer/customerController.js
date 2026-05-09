const customerModel = require(
  "../../models/customer.model"
);

// CREATE CUSTOMER

exports.createCustomer = async (
  req,
  res
) => {
  try {
    const customer =
      await customerModel.create({
        ...req.body,

        profilePic:
          req.file?.path,
      });

    res.status(201).json({
      success: true,

      customer,
    });
  } catch (err) {
    res.status(500).json({
      success: false,

      error: err.message,
    });
  }
};

// GET ALL CUSTOMERS

exports.getCustomers = async (
  req,
  res
) => {
  try {
    const customers =
      await customerModel.find();

    res.json({
      success: true,

      customers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,

      error: err.message,
    });
  }
};

// GET SINGLE CUSTOMER

exports.getCustomerById =
  async (req, res) => {
    try {
      const customer =
        await customerModel.findById(
          req.params.id
        );

      if (!customer) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Customer not found",
          });
      }

      res.json({
        success: true,

        customer,
      });
    } catch (err) {
      res.status(500).json({
        success: false,

        error: err.message,
      });
    }
  };

// UPDATE CUSTOMER

exports.updateCustomer =
  async (req, res) => {
    try {
      const updateData = {
        ...req.body,
      };

      if (req.file) {
        updateData.profilePic =
          req.file.path;
      }

      const updated =
        await customerModel.findByIdAndUpdate(
          req.params.id,

          updateData,

          {
            new: true,
          }
        );

      res.json({
        success: true,

        customer: updated,
      });
    } catch (err) {
      res.status(500).json({
        success: false,

        error: err.message,
      });
    }
  };

// DELETE CUSTOMER

exports.deleteCustomer =
  async (req, res) => {
    try {
      await customerModel.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,

        message:
          "Customer deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,

        error: err.message,
      });
    }
  };