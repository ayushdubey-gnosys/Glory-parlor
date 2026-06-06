const Product = require("../models/product.model");
const ProductUsage = require("../models/productUsage.model");

// Auto-deduct inventory when products are used in a service
exports.deductInventory = async (productId, quantity, appointmentId, customerId, staffId, parlorId) => {
  try {
    // Check stock before deduction
    const product = await Product.findOne({ _id: productId, parlor: parlorId });
    if (!product || product.stock < quantity) {
      throw new Error("Insufficient stock for product: " + (product ? product.name : productId));
    }

    // Deduct stock
    product.stock -= quantity;
    
    // Check for low stock alert
    if (product.stock <= product.lowStockThreshold) {
      // In a real app, trigger a notification to the parlor admin
      console.log(`LOW STOCK ALERT: Product ${product.name} is at ${product.stock}`);
    }
    
    await product.save();

    // Log the usage
    const usage = new ProductUsage({
      product: productId,
      appointment: appointmentId,
      customer: customerId,
      staff: staffId,
      quantityUsed: quantity,
      parlor: parlorId
    });
    await usage.save();

    return { success: true, message: "Inventory deducted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
