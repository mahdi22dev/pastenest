import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email addresss")
    .required("Required field"),
  password: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required field"),
});
export const pasteSchema = (password: boolean) => {
  return Yup.object({
    title: Yup.string().max(20, "Must be 20 characters or less"),
    password: password
      ? Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required field")
      : Yup.string().max(20, "Must be 20 characters or less"),
  });
};

export const signUpSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required field"),
  username: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required field"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Must be 20 characters or less")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, and one special character"
    )
    .required("Required field"),
});
