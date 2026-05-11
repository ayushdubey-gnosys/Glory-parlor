// controllers/appointment/appointmentController.js
const appointmentModel = require("../../models/appointment.model");
const serviceModel = require("../../models/service.model");
const customerModel = require("../../models/customer.model");

// exports.createAppointment = async (req, res) => {
//   try {
//     const appointment = await appointmentModel.create(req.body);
//     res.status(201).json(appointment);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



const findOrCreateCustomerForUser = async (user) => {
  if (!user) return null;

  let cust = null;
  if (user.email) cust = await customerModel.findOne({ email: user.email });
  if (!cust && user.mobile) cust = await customerModel.findOne({ phone: user.mobile });

  if (!cust) {
    cust = await customerModel.create({
      name: user.name || "",
      email: user.email || "",
      phone: user.mobile || "",
      role: "customer",
    });
  }

  return cust;
};

exports.createAppointment = async (req, res) => {
  try {
    // Ensure appointment.customer references a Customer document (not User)
    const customerModel = require("../../models/customer.model");

    let customerId = req.body.customer;

    if (req.user && req.user.role === "customer") {
      const cust = await findOrCreateCustomerForUser(req.user);
      customerId = cust._id;
    }

    // Prevent customers from setting status to booked directly
    const payload = { ...req.body, customer: customerId };
    if (req.user && req.user.role === "customer") {
      payload.status = "unbooked";
    }

    const appointment = await appointmentModel.create(payload);

    const populatedAppointment = await appointment.populate([
      { path: "customer" },
      { path: "service" },
      { path: "staff" },
    ]);

    // normalize date to ISO string so client can safely split
    const out = populatedAppointment.toObject();
    if (out.date instanceof Date) out.date = out.date.toISOString();

    res.status(201).json(out);
  } catch (err) {
    console.error("Error in createAppointment:", err);
    res.status(500).json({ error: "Failed to create appointment" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    let query = {};

    if (req.user && req.user.role === "customer") {
      // resolve Customer record from authenticated user
      const cust = await customerModel.findOne({ $or: [{ email: req.user.email }, { phone: req.user.mobile }] });

      if (!cust) {
        // no customer record -> no appointments
        return res.json([]);
      }

      query = { customer: cust._id };
    }

    // Pagination & sorting (latest first by createdAt)
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      appointmentModel.countDocuments(query),
      appointmentModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("customer")
        .populate("service")
        .populate("staff")
        .lean()
        .exec(),
    ]);

    // normalize dates to ISO strings
    const normalized = data.map((a) => {
      if (a.date && a.date instanceof Date) a.date = a.date.toISOString();
      return a;
    });

    const totalPages = Math.ceil(total / limit) || 1;

    return res.json({ data: normalized, page, limit, totalPages, total });
  } catch (err) {
    console.error("Error in getAppointments:", err);
    return res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await appointmentModel
      .findById(req.params.id)
      .populate(["customer", "service", "staff"]);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // If user is customer, ensure they own the appointment
    if (req.user && req.user.role === "customer") {
      const cust = await customerModel.findOne({ $or: [{ email: req.user.email }, { phone: req.user.mobile }] });
      const ownerId = appointment.customer?._id || appointment.customer;

      if (!cust || ownerId.toString() !== cust._id.toString()) {
        return res.status(403).json({ error: "Not authorized" });
      }
      // customers are not allowed to change appointment status
      if (req.body && Object.prototype.hasOwnProperty.call(req.body, "status")) {
        return res.status(403).json({ error: "Not authorized to change status" });
      }
    }

    // Perform update
    const updated = await appointmentModel
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate(["customer", "service", "staff"]);

    const out = updated.toObject();
    if (out.date instanceof Date) out.date = out.date.toISOString();

    res.json(out);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await appointmentModel
      .findById(req.params.id)
      .populate("customer");

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (req.user && req.user.role === "customer") {
      const cust = await customerModel.findOne({ $or: [{ email: req.user.email }, { phone: req.user.mobile }] });
      const ownerId = appointment.customer?._id || appointment.customer;

      if (!cust || ownerId.toString() !== cust._id.toString()) {
        return res.status(403).json({ error: "Not authorized" });
      }
    }

    await appointmentModel.findByIdAndDelete(req.params.id);

    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};