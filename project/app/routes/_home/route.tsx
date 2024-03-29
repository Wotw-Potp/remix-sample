import { Outlet } from "@remix-run/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function HomeLayout() {
	return (
		<>
			<Navbar />
			<main className="min-h-screen">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
