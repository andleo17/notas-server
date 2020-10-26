import { AuthenticationError } from 'apollo-server';
import { verify } from 'jsonwebtoken';

export const APP_SECRET = process.env.APP_SECRET;

export function getUser(authorization: string) {
	if (!authorization) throw new AuthenticationError('No Logged');

	const token = authorization.replace('Bearer ', '');
	const id = verify(token, APP_SECRET);
	return id;
}
