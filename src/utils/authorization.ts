import { ExpressContext, UserAuth } from './context';
import * as jwt from 'jsonwebtoken';
import { APP_SECRET } from './env';

export const getUser = (cookieToken: string): UserAuth | null => {
	if (!cookieToken) return null;

	const token = cookieToken.replace('Bearer ', '');
	return <UserAuth>jwt.verify(token, APP_SECRET);
};

export namespace JWTToken {
	export const _getPayload = (token: string): UserAuth => {
		return <UserAuth>jwt.verify(token, APP_SECRET);
	};

	export const _create = (user: UserAuth): string => {
		return jwt.sign(
			<UserAuth>{ id: user.id, schoolId: user.schoolId },
			APP_SECRET,
			{ expiresIn: '1d' }
		);
	};

	export const _send = ({ res }: ExpressContext, token: string): void => {
		res.cookie('token', token, { httpOnly: true });
	};

	export const _delete = ({ res }: ExpressContext): void => {
		res.clearCookie('token');
	};
}
