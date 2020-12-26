import { PrismaClient } from '../prisma/@client';
import { ExecutionParams } from 'subscriptions-transport-ws';
import { Request, Response } from 'express';
import { getUser } from './utils/authorization';

interface ExpressContext {
	req: Request;
	res: Response;
	connection?: ExecutionParams;
}

export enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export interface UserAuth {
	id?: number;
	role: UserRole;
}

export interface Context {
	prisma: PrismaClient;
	user: UserAuth;
}

export function createContext(expressContext: ExpressContext): Context {
	const prisma = new PrismaClient();
	const token = expressContext.req.headers.authorization || '';
	const user = getUser(token);
	return { prisma, user };
}
