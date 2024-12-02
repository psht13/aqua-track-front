import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { apiLogin } from "../../redux/operations";
import sprite from "../../assets/sprite.svg";
import css from "./SignInForm.module.css";
import Logo from "../Logo/Logo";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function SignInForm() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setMessage(null);
      setLoading(true);
      try {
        const result = await dispatch(apiLogin(values)).unwrap();
        console.log("API result:", result);
        console.log("Token:", result?.data?.accessToken);
        console.log(result);
        if (result.data.accessToken) {
          setMessage({ type: "success", text: "Login successful!" });
          navigate("/tracker");
        }
      } catch (error) {
        setMessage({
          type: "error",
          text: error || "Login failed. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={css.formContainer}>
      <Logo className="" />
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <h1 className={css.header}>Sign In</h1>

        {message && (
          <div className={message.type === "error" ? css.error : css.success}>
            {message.text}
          </div>
        )}

        {/* Поле для Email */}
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={
              formik.touched.email && formik.errors.email ? css.errorInput : ""
            }
          />
          {formik.touched.email && formik.errors.email && (
            <div className={css.error}>{formik.errors.email}</div>
          )}
        </div>

        {/* Поле для Password */}
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={css.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
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

        <button type="submit" className={css.submitButton} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className={css.signupLink}>
          Don’t have an account?{" "}
          <Link to="/signup" className={css.link}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignInForm;
