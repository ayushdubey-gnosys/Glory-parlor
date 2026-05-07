export function renderValue(v) {
	if (v === null || v === undefined) return "";

	if (typeof v === "object") {
		// common mongoose populated shapes: { _id, name, ... } or nested option like { value, type }
		if (v.value !== undefined) return String(v.value);
		if (v.name !== undefined) return String(v.name);
		if (v.phone !== undefined) return String(v.phone);
		// fallback to JSON string so React doesn't try to render an object
		try {
			return JSON.stringify(v);
		} catch (err) {
			return String(v);
		}
	}

	return String(v);
}
