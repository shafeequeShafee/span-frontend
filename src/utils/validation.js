export const validateLogin = (email, password) => {
  const errors = { email: "", password: "" };
  let isValid = true;

  if (!email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email";
    isValid = false;
  }

  if (!password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (password.length < 8) {
    errors.password = "Password should contain a minimum of 8 characters";
    isValid = false;
  }

  return { isValid, errors };
};


export const validateRegistration = (companyName, logoUrl, email, password) => {
  const errors = { companyName: "", logoUrl: "", email: "", password: "" };
  let isValid = true;

  if (!companyName) {
    errors.companyName = "Company Name is required";
    isValid = false;
  }

  if (!logoUrl) {
    errors.logoUrl = "Logo is required";
    isValid = false;
  }

  if (!email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email";
    isValid = false;
  }

  if (!password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (password.length < 8) {
    errors.password = "Password should contain a minimum of 8 characters";
    isValid = false;
  }

  return { isValid, errors };
};
