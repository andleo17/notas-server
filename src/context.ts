import { PrismaClient } from '@prisma/client';
import { ExecutionParams } from 'subscriptions-transport-ws';

const prisma = new PrismaClient();

interface ExpressContext {
	req: Express.Request
	res: Express.Response
	connection? : ExecutionParams
}

export interface Context extends ExpressContext {
	prisma: PrismaClient;
}

export function createContext(expressContext : ExpressContext): Context {
	return { prisma, ...expressContext };
}
