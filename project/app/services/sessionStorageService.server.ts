import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
	cookie: {
		secure: process.env.NODE_ENV === "production",
		secrets: ["secret"],
		sameSite: "lax",
		maxAge: 60 * 60,
		httpOnly: true,
	},
});

export const { getSession, commitSession, destroySession } = sessionStorage;

export async function createUserCredencialSession(
	userId: number,
	redirectTo: string,
) {
	const session = await getSession();
	session.set("userId", userId);
	return redirect(redirectTo, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}

export async function getUserIdFromSession(request: Request) {
	const session = await getSession(request.headers.get("Cookie"));
	const userId: number | undefined = session.get("userId");

	if (!userId) {
		return null;
	}

	return userId;
}

export async function destroyUserSession(request: Request) {
	const session = await getSession(request.headers.get("Cookie"));

	return await destroySession(session);
}
