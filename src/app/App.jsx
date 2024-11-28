import { Route, Routes } from "react-router";
import HomePage from "../pages/home-page/HomePage";
import SharedLayout from "../components/sharedLayout/SharedLayout";
import css from "./App.module.css";
import SignInPage from "../pages/signInPage/SignInPage";

const App = () => {
  return (
		<div className={css.container}>
			<Routes>
				<Route
					path='/'
					element={<SharedLayout />}
				>
					<Route
						path='/'
						element={<HomePage />}
					/>
					<Route
						path='/signin'
						element={<SignInPage />}
					/>
				</Route>
			</Routes>
		</div>
	);
};

export default App;
