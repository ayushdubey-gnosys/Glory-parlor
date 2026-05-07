// controllers/appointment/appointmentController.js
const appointmentModel = require("../../models/appointment.model");
const serviceModel = require("../../models/service.model");

// exports.createAppointment = async (req, res) => {
//   try {
//     const appointment = await appointmentModel.create(req.body);
//     res.status(201).json(appointment);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



exports.createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentModel.create(req.body);

    const populatedAppointment = await appointment.populate([
      {
        path: "customer",
      },
      {
        path: "service",
      },
      {
        path: "staff",
      },
    ]);

    res.status(201).json(populatedAppointment);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAppointments = async (req, res) => {
  const data = await appointmentModel.find()
    .populate("customer")
    .populate("staff");
  res.json(data);
};

exports.updateAppointment = async (req, res) => {
  try {
    const updated = await appointmentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).populate([
      "customer",
      "service",
      "staff",
    ]);

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  await appointmentModel.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};