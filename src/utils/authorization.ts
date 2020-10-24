import { AuthenticationError } from "apollo-server";
import { verify } from "jsonwebtoken";

export function getUser(authorization: string) {
	if (!authorization) throw new AuthenticationError("No Logged");

	const token = authorization.replace('Bearer ', '')
	const id = verify(token, process.env.APP_SECRET);
	return id;
}