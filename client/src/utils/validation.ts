import type { FormValues } from "../types/form";
import type { FormErrors } from "../types/formError";

export const validateData = (
  formData: Partial<FormValues>,
): Partial<FormErrors> => {
  const errors: Partial<FormErrors> = {};

  const name = formData.name?.trim() || "";
  const email = formData.email?.trim() || "";


  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    errors.name = "Name can only contain letters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Enter a valid email address";
  }

  return errors;
};
