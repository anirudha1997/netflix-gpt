export const validateForm = (email, password, name) => {
  const isEmailValid = /^[A-Za-z0-9+_.-]+@(.+)$/.test(email);
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
    password
  );
  if (name) {
    const isNameValid = /^[A-Z][a-zA-Z' -]+$/.test(name);
    if (!isNameValid) return "Full Name is invalid";
  }

  if (!isEmailValid) return "Email is invalid";
  if (!isPasswordValid) return "Password is invalid";

  return null;
};
