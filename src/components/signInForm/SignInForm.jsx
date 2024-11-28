import styles from "./SignInForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectAuthError } from "../../redux/auth/selectors";
import { apiLogin } from "../../redux/auth/operations";
import Logo from "../Logo/Logo";

const LoginValidationSchema = Yup.object().shape({
	password: Yup.string()
		.required("Please enter your password")
		.min(8, "Password should have min 8 symbols")
		.max(100, "Password should have max 100 symbols"),

	email: Yup.string()
		.email("Incorrect email")
		.required("Please enter your email"),
});

const INITIAL_VALUES = {
	email: "Enter your email",
	password: "Enter your password",
};

const SignInForm = () => {
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);

	const handleSubmit = (values) => {
		dispatch(apiLogin(values));
	};

  return (
		<section className={styles.signInForm}>
			<header className={styles.header}>
				<Logo />
			</header>
			<h2 className={styles.title}>Sign in</h2>
			<Formik
				initialValues={INITIAL_VALUES}
				onSubmit={handleSubmit}
				validationSchema={LoginValidationSchema}
			>
				{({ errors }) => (
					<Form className={styles.form}>
						<label className={styles.label}>
							<span>Email:</span>
							<Field
								type='text'
								name='email'
								placeholder='kirilo.example@gmail.com'
							/>
							<ErrorMessage
								className={styles.errorText}
								name='email'
								component='span'
							/>
						</label>
						<label className={styles.label}>
							<span>Password:</span>
							<Field
								type='password'
								name='password'
								placeholder='Enter your password'
							/>
							<ErrorMessage
								className={styles.errorText}
								name='password'
								component='span'
							/>
						</label>

						<button
							disabled={Object.keys(errors).length > 0}
							className={styles.submitBtn}
							type='submit'
						>
							Sign in
						</button>
						{error && (
							<p className={styles.errorText}>
								Oops, some error occured... {error}
							</p>
						)}
					</Form>
				)}
			</Formik>
		</section>
	);
};

export default SignInForm;
