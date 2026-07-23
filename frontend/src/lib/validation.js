export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validateSignupForm(form) {
  if (!form.name || form.name.trim().length < 2) {
    return 'Full Name must be at least 2 characters long.';
  }
  if (!validateEmail(form.email)) {
    return 'Please enter a valid email address.';
  }
  if (!form.password || form.password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  if (form.password !== form.confirmPassword) {
    return 'Passwords do not match.';
  }
  return null;
}

export function validateBusForm(form) {
  if (!form.busNumber || form.busNumber.trim().length === 0) {
    return 'Bus Number is required.';
  }
  if (!form.driverName || form.driverName.trim().length === 0) {
    return 'Driver Name is required.';
  }
  if (!form.route || form.route.trim().length === 0) {
    return 'Route details are required.';
  }
  return null;
}
