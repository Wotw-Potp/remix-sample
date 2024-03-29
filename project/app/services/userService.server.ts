import type {
	IResisterUserResponse,
	IUserResponse,
	IUsersResponse,
} from "~/interfaces/user.interface";
import { UserModel } from "~/models/user.server";
import bcrypt from "bcryptjs";

const { hash } = bcrypt;

const userModel = UserModel.getInstance();

export async function registerUser(
	formData: FormData,
): Promise<IResisterUserResponse> {
	const name = formData.get("name")?.toString();
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();
	const passwordConfirmation = formData.get("passwordConfirmation")?.toString();

	// @todo validate form data
	if (!name || !email || !password || !passwordConfirmation) {
		return {
			message: "Bad Request",
			status: 400,
			errors: {
				name: !name ? ["Name is required"] : undefined,
				email: !email ? ["Email is required"] : undefined,
				password: !password ? ["Password is required"] : undefined,
			},
		};
	}

	if (password !== passwordConfirmation) {
		return {
			status: 400,
			errors: {
				password: ["Passwords do not match"],
			},
		};
	}

	// Create user
	try {
		const user = await userModel.create({
			email,
			name,
			password: await hash(password, 10),
		});
		if (!user) {
			throw new Error("User already exists");
		}
		return { data: user, status: 200, errors: null };
	} catch (error) {
		console.error(error);
		return { message: "Internal Server Error", status: 500, errors: {} };
	}
}

export async function getUserById(id: number): Promise<IUserResponse> {
	try {
		const user = await userModel.findOne({
			where: { id: id },
		});

		if (!user) {
			throw new Error("User not found");
		}
		return { user, status: 200, errors: null };
	} catch (error) {
		console.error(error);
		return {
			message: "Internal Server Error",
			status: 500,
			errors: {},
		};
	}
}

export async function getUsers(): Promise<IUsersResponse> {
	return {
		users: await userModel.findMany(),
		status: 200,
		errors: null,
	};
}

export async function updateUser(formData: FormData): Promise<IUserResponse> {
	try {
		const id = formData.get("userId")?.toString();
		if (!id) {
			throw new Error("Invalid id");
		}
		const user = await userModel.update({
			where: { id: Number.parseInt(id) },
			data: {
				email: formData.get("email")?.toString(),
				name: formData.get("name")?.toString(),
			},
		});
		if (!user) {
			throw new Error("User not found");
		}
		return { user, status: 200, errors: null };
	} catch (error) {
		console.error(error);
		return {
			message: "Internal Server Error",
			status: 500,
			errors: {},
		};
	}
}

export async function deleteUser(id: number): Promise<IUserResponse> {
	try {
		const deletedUser = await userModel.delete({ where: { id } });

		return { user: deletedUser, status: 200, errors: null };
	} catch (error) {
		console.error(error);
		return {
			message: "Internal Server Error",
			status: 500,
			errors: {},
		};
	}
}
