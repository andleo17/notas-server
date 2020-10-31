import { UserAuth, UserRole } from '../context';
import { AuthenticationError } from 'apollo-server';
import { verify } from 'jsonwebtoken';
import { APP_SECRET } from './env';

export function getUser(authorization: string): UserAuth {
	if (!authorization) throw new AuthenticationError('No Logged');

	const token = authorization.replace('Bearer ', '');
	const user = <UserAuth>verify(token, APP_SECRET);
	if (!(user.role in UserRole)) throw new AuthenticationError('No user role');
	return user;
}
