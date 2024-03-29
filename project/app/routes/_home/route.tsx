import { Outlet } from "@remix-run/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function HomeLayout() {
	return (
		<>
			<Navbar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
