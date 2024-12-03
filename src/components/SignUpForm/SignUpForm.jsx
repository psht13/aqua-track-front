import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { apiRegister } from "../../redux/operations";
import sprite from "../../assets/sprite.svg";
import css from "./SignUpForm.module.css";
import Logo from "../Logo/Logo";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password"),
});

function SignUpForm() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepPassword, setShowRepPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repPassword: "",
    },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      setMessage(null);
      setLoading(true);
      try {
        const result = await dispatch(
          apiRegister({ email, password })
        ).unwrap();
        if (result.token) {
          setMessage({ type: "success", text: "Register successful!" });
          navigate("/tracker");
        }
      } catch (error) {
        setMessage({
          type: "error",
          text: error || "Register failed. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleRepPasswordVisibility = () => {
    setShowRepPassword((prev) => !prev);
  };

  return (
    <div className={css.formContainer}>
      <Logo />
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <h1 className={css.header}>Sign Up</h1>

        {message && (
          <div className={message.type === "error" ? css.error : css.success}>
            {message.text}
          </div>
        )}

        {/* Email */}
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter your email"
            className={
              formik.touched.email && formik.errors.email ? css.errorInput : ""
            }
          />
          {formik.touched.email && formik.errors.email && (
            <div className={css.error}>{formik.errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={css.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter your password"
              className={
                formik.touched.password && formik.errors.password
                  ? css.errorInput
                  : ""
              }
            />
            <button
              type="button"
              className={css.togglePasswordButton}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <svg className={css.icon}>
                <use
                  href={`${sprite}#icon-${showPassword ? "eye-off" : "eye"}`}
                />
              </svg>
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className={css.error}>{formik.errors.password}</div>
          )}
        </div>

        {/* Repeat Password */}
        <div className={css.formGroup}>
          <label htmlFor="repPassword">Repeat Password</label>
          <div className={css.passwordWrapper}>
            <input
              id="repPassword"
              type={showRepPassword ? "text" : "password"}
              name="repPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repPassword}
              placeholder="Repeat password"
              className={
                formik.touched.repPassword && formik.errors.repPassword
                  ? css.errorInput
                  : ""
              }
            />
            <button
              type="button"
              className={css.togglePasswordButton}
              onClick={toggleRepPasswordVisibility}
              aria-label={showRepPassword ? "Hide password" : "Show password"}
            >
              <svg className={css.icon}>
                <use
                  href={`${sprite}#icon-${showRepPassword ? "eye-off" : "eye"}`}
                />
              </svg>
            </button>
          </div>
          {formik.touched.repPassword && formik.errors.repPassword && (
            <div className={css.error}>{formik.errors.repPassword}</div>
          )}
        </div>

        <button
          type="submit"
          className={css.submitButton}
          disabled={loading || !formik.isValid || !formik.dirty}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className={css.signupLink}>
          Already have account?{" "}
          <Link to="/signin" className={css.link}>
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
