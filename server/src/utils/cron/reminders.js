const Customer = require("../../models/customer.model");
const Appointment = require("../../models/appointment.model");
// Assuming twilio or nodemailer is imported here

// A mock function simulating a cron job runner
const runDailyReminders = async () => {
  try {
    console.log("[CRON] Starting Daily Reminders...");

    // 1. Birthday Reminders
    const today = new Date();
    const todayMonthDay = `-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    // 2. Find customers with birthday today
    // Note: in a real db query, we use $expr and $dateToString to match month/day.
    const customers = await Customer.find({}); 
    
    customers.forEach(customer => {
      if (customer.dob && customer.dob.toISOString().includes(todayMonthDay)) {
        console.log(`[CRON] Sending Birthday SMS to ${customer.name} at ${customer.phone}`);
        // twilio.messages.create({ body: 'Happy Birthday!', to: customer.phone ...})
      }
      if (customer.anniversary && customer.anniversary.toISOString().includes(todayMonthDay)) {
        console.log(`[CRON] Sending Anniversary SMS to ${customer.name} at ${customer.phone}`);
      }
    });

    // 3. Tomorrow's Appointments
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const upcomingAppointments = await Appointment.find({ 
      date: { $gte: new Date(tomorrowStr), $lt: new Date(tomorrow.setHours(23,59,59,999)) } 
    }).populate("customer");

    upcomingAppointments.forEach(appt => {
      console.log(`[CRON] Sending Appointment Reminder to ${appt.customer.name} for tomorrow at ${appt.time}`);
    });

  } catch (error) {
    console.error("[CRON] Error running reminders:", error);
  }
};

module.exports = runDailyReminders;
