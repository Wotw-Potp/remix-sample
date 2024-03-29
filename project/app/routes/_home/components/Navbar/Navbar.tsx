import { Link } from "@remix-run/react";
import { useEffect, useRef, useCallback } from "react";
import { routes } from "~/libs/routes";

export default function Navbar() {
	const ref = useRef<HTMLElement>(null);

	const handleScroll = useCallback(() => {
		if (!ref.current) return;
		if (scrollY / document.documentElement.scrollHeight > 0.1) {
			ref.current.classList.remove("absolute");
			ref.current.classList.add("bg-white", "fixed", "shadow-md");
		} else {
			ref.current.classList.remove("bg-white", "fixed", "shadow-md");
			ref.current.classList.add("absolute");
		}
	}, []);

	useEffect(() => {
		if (!ref.current) return;
		document.addEventListener("scroll", handleScroll);
		return () => document.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	return (
		<nav
			className="absolute z-30 top-0 right-0 left-0 transition duration-300"
			ref={ref}
		>
			<div className="px-10 py-4 flex justify-between">
				<h1>header</h1>
				<ul className="flex gap-4">
					<li>
						<Link to={routes.HOME}>Home</Link>
					</li>
					<li>
						<Link to={routes.SIGNIN}>Signin</Link>
					</li>
					<li>
						<Link to={routes.SIGNUP}>Signup</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
