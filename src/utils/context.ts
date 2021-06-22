import { ExecutionParams } from 'subscriptions-transport-ws';
import { Request, Response } from 'express';
import { getUser } from './authorization';
import { PrismaClient } from '@prisma/client';

export interface UserAuth {
	id?: number;
	schoolId?: number;
}

export interface APIContext {
	prisma: PrismaClient;
	user: UserAuth;
	express: ExpressContext;
}

export interface ExpressContext {
	req: Request;
	res: Response;
	connection?: ExecutionParams;
}

export const createContext = (ctx: ExpressContext): APIContext => {
	const prisma = new PrismaClient();
	const user = getUser(ctx.req.cookies?.token);
	return { prisma, user, express: ctx };
};
