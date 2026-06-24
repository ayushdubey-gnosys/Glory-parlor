const customerModel = require(
  "../../models/customer.model"
);
const userModel = require("../../models/user.model");

// CREATE CUSTOMER

// CREATE CUSTOMER

exports.createCustomer = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      notes,
    } = req.body;

    // VALIDATION

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message:
          "Name and phone are required",
      });
    }

    // CHECK PHONE

    const existingPhone =
      await customerModel.findOne({
        phone,
      });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message:
          "Customer already exists with this phone",
      });
    }

    // CHECK EMAIL ONLY IF PROVIDED

    if (
      email &&
      email.trim() !== ""
    ) {
      const existingEmail =
        await customerModel.findOne({
          email,
        });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message:
            "Customer already exists with this email",
        });
      }
    }

    // CREATE DATA

    const customerData = {
      name,

      phone,

      address:
        address || "",

      notes:
        notes || "",

      createdBy:
        req.user?._id,

      category:
        "middle",

      status:
        "active",

      profilePic:
        req.file?.path ||
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    };

    // ONLY ADD EMAIL IF EXISTS

    if (
      email &&
      email.trim() !== ""
    ) {
      customerData.email =
        email;
    }

    // CREATE CUSTOMER

    const customer =
      await customerModel.create(
        customerData
      );

    res.status(201).json({
      success: true,
      customer,
    });
  } catch (err) {
    console.log(
      "CREATE CUSTOMER ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message:
        err.message,
      error: err,
    });
  }
};
// GET ALL CUSTOMERS

exports.getCustomers = async (
  req,
  res
) => {
  try {
   
    // support pagination and category filtering
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const category = req.query.category;
    const status = req.query.status;
    const source = req.query.source;
    const search = req.query.search;

    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const andConditions = [];

    if (search) {
      andConditions.push({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ]
      });
    }

    if (source) {
      if (source === 'online') {
        const onlineUsers = await userModel.find({ role: 'customer' }).select('_id');
        filter.createdBy = { $in: onlineUsers.map((u) => u._id) };
      } else if (source === 'offline') {
        const offlineUsers = await userModel.find({ role: { $ne: 'customer' } }).select('_id');
        andConditions.push({
          $or: [
            { createdBy: { $in: offlineUsers.map((u) => u._id) } },
            { createdBy: { $exists: false } },
            { createdBy: null }
          ]
        });
      }
    }

    if (andConditions.length > 0) {
      filter.$and = andConditions;
    }

    const total = await customerModel.countDocuments(filter);
    const pages = Math.ceil(total / limit) || 1;

    const customers = await customerModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      customers,
      total,
      page,
      pages,
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
        await customerModel
          .findById(req.params.id)
          .populate("createdBy", "name email role");

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

// GET CURRENT USER'S CUSTOMER PROFILE
exports.getMyCustomer = async (
  req,
  res
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    let customer =
      await customerModel
        .findOne({
          createdBy: req.user._id,
        })
        .populate(
          "createdBy",
          "name email role profilePic"
        );

    // AUTO CREATE PROFILE IF NOT EXISTS

    if (!customer) {
      customer =
        await customerModel.create({
          name: req.user.name,

          email: req.user.email,

          phone: req.user.mobile,

          profilePic:
            req.user.profilePic ||
            "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",

          createdBy: req.user._id,

          category: "middle",

          status: "active",
        });

      customer =
        await customerModel
          .findById(customer._id)
          .populate(
            "createdBy",
            "name email role profilePic"
          );
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

// CREATE OR LINK A CUSTOMER FOR CURRENT USER
exports.createMyCustomer = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
    // prevent creating multiple customer records for same user
    const existing = await customerModel.findOne({ createdBy: req.user._id });
    if (existing) return res.status(400).json({ success: false, message: "Profile already exists" });

    // Customers should not be able to set `status` on their own profile.
    const createData = { ...req.body };
    if (req.user.role === "customer") {
      delete createData.status;
    }

    const customer = await customerModel.create({
      ...createData,
      profilePic: req.file?.path,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, customer });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE CURRENT USER'S CUSTOMER PROFILE
exports.updateMyCustomer =
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const customer =
        await customerModel.findOne({
          createdBy: req.user._id,
        });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message:
            "Customer profile not found",
        });
      }

      const updateData = {
        ...req.body,
      };

      // CUSTOMER CANNOT CHANGE THESE

      delete updateData.status;
      delete updateData.category;
      delete updateData.createdBy;

      // IMAGE

      if (req.file) {
        updateData.profilePic =
          req.file.path;
      }

      // UPDATE CUSTOMER

      const updatedCustomer =
        await customerModel.findByIdAndUpdate(
          customer._id,
          updateData,
          {
            new: true,
          }
        );

      // UPDATE USER MODEL ALSO

      const userUpdateData = {};

      if (updateData.name) {
        userUpdateData.name =
          updateData.name;
      }

      if (updateData.email) {
        userUpdateData.email =
          updateData.email;
      }

      if (updateData.phone) {
        userUpdateData.mobile =
          updateData.phone;
      }

      if (updateData.profilePic) {
        userUpdateData.profilePic =
          updateData.profilePic;
      }

      const updatedUser =
        await userModel.findByIdAndUpdate(
          req.user._id,
          userUpdateData,
          {
            new: true,
          }
        );

      res.json({
        success: true,

        customer: updatedCustomer,

        user: updatedUser,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };