import type {
	ILoginResponse,
	ILogoutResponse,
} from "~/interfaces/auth.interface";
import { UserModel } from "~/models/user.server";
import bcrypt from "bcryptjs";
import { destroyUserSession } from "./sessionStorageService.server";

const { compare } = bcrypt;

const userModel = UserModel.getInstance();

export async function login(formData: FormData): Promise<ILoginResponse> {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	// validate form data
	if (!email || !password) {
		return {
			message: "Bad Request",
			status: 400,
			errors: null,
		};
	}

	// Find user
	const user = await userModel.findUnique({ where: { email } });
	if (!user) {
		return {
			message: "User not found",
			status: 404,
			errors: null,
		};
	}

	if (!(await compare(password, user.password))) {
		return {
			message: "Invalid credentials",
			status: 401,
			errors: null,
		};
	}

	userModel.model = user;
	// Update last logged at
	await userModel.updateLastLoggedAt();

	return { status: 200, errors: null, userId: userModel.model.id };
}

export async function logout(request: Request): Promise<ILogoutResponse> {
	const session = await destroyUserSession(request);

	return { status: 200, errors: null, session };
}
