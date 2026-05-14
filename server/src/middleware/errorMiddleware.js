// Global error handling middleware
module.exports = (err, req, res, next) => {
	// Default status
	const status = err.status || err.statusCode || 500;

	// Log full error server-side for debugging
	console.error("API Error:", {
		message: err.message,
		status,
		stack: err.stack,
		name: err.name,
	});

	// Prepare response
	const payload = {
		error: err.message || "Internal Server Error",
	};

	// If validation details exist, include them
	if (err.errors) payload.details = err.errors;

	// In development, include stack
	if (process.env.NODE_ENV !== "production") {
		payload.stack = err.stack;
	}

	res.status(status).json(payload);
};
