export const validateForm = (email, name) => {
  const isEmailValid = /^[A-Za-z0-9+_.-]+@(.+)$/.test(email);
  if (name) {
    const isNameValid = /^[A-Z][a-zA-Z' -]+$/.test(name);
    if (!isNameValid) return "Full Name is invalid";
  }

  if (!isEmailValid) return "Email is invalid";

  return null;
};
